// api/process-payment.js — Vercel Serverless Function
// Handles PayKings payment processing server-side (keeps API key secret)
// Deploy: this file is auto-detected by Vercel as an API route at /api/process-payment

const { createClient } = require('@supabase/supabase-js');

// ── Environment variables (set in Vercel dashboard) ───────────
const PAYKINGS_API_KEY     = process.env.PAYKINGS_API_KEY     || '';
const PAYKINGS_MERCHANT_ID = process.env.PAYKINGS_MERCHANT_ID || '';
const SUPABASE_URL         = process.env.SUPABASE_URL         || '';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// ─────────────────────────────────────────────────────────────
// PayKings API — update endpoint & payload structure once you
// receive your API docs from your account manager.
// Reference: https://paykings.com/partners/
// ─────────────────────────────────────────────────────────────
const PAYKINGS_ENDPOINT = 'https://secure.paykings.com/api/v1/transaction/sale';

async function chargePayKings({ amount, cardNumber, expiry, cvv, billingZip, customerName, customerEmail, orderId }) {
  if (!PAYKINGS_API_KEY) {
    // ── Mock success for development / pre-API-key phase ──
    return {
      success: true,
      transactionId: 'MOCK_TXN_' + Date.now(),
      message: 'Mock approval — PayKings API key not yet configured',
      mock: true,
    };
  }

  // ── Real PayKings charge ──────────────────────────────────
  // ⚠️  Update the payload structure to match PayKings API docs
  // once you receive them from your account manager.
  const [expMonth, expYear] = expiry.replace(/\s/g, '').split('/');

  const payload = {
    merchant_id:    PAYKINGS_MERCHANT_ID,
    api_key:        PAYKINGS_API_KEY,
    type:           'sale',
    amount:         parseFloat(amount).toFixed(2),
    currency:       'USD',
    order_id:       orderId,
    description:    'Angel Girls Entertainment Booking Deposit',
    card: {
      number:     cardNumber.replace(/\s/g, ''),
      exp_month:  expMonth,
      exp_year:   expYear.length === 2 ? '20' + expYear : expYear,
      cvv:        cvv,
    },
    billing: {
      name:       customerName,
      email:      customerEmail,
      zip:        billingZip,
      country:    'US',
    },
  };

  const response = await fetch(PAYKINGS_ENDPOINT, {
    method:  'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${PAYKINGS_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  // ⚠️  Update response parsing to match PayKings actual response format
  if (data.status === 'approved' || data.success === true) {
    return {
      success:       true,
      transactionId: data.transaction_id || data.txn_id || data.id,
      message:       data.message || 'Payment approved',
      cardLast4:     cardNumber.replace(/\s/g, '').slice(-4),
      cardBrand:     detectCardBrand(cardNumber),
    };
  } else {
    return {
      success: false,
      message: data.message || data.error || 'Payment declined',
    };
  }
}

function detectCardBrand(number) {
  const n = number.replace(/\s/g, '');
  if (/^4/.test(n))           return 'Visa';
  if (/^5[1-5]/.test(n))      return 'Mastercard';
  if (/^3[47]/.test(n))       return 'Amex';
  if (/^6(?:011|5)/.test(n))  return 'Discover';
  return 'Card';
}

// ── Supabase helper ───────────────────────────────────────────
function getSupabase() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) return null;
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
}

// ── Main handler ──────────────────────────────────────────────
module.exports = async function handler(req, res) {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin',  '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      amount, cardNumber, expiry, cvv, billingZip,
      customerName, customerEmail, orderId,
      bookingId, agreementId,
    } = req.body;

    // Basic validation
    if (!amount || !cardNumber || !expiry || !cvv) {
      return res.status(400).json({ success: false, message: 'Missing required payment fields' });
    }
    if (parseFloat(amount) < 1) {
      return res.status(400).json({ success: false, message: 'Invalid amount' });
    }

    // Process payment via PayKings
    const result = await chargePayKings({ amount, cardNumber, expiry, cvv, billingZip, customerName, customerEmail, orderId });

    if (result.success) {
      // Record transaction in Supabase
      const sb = getSupabase();
      if (sb) {
        await sb.from('transactions').insert({
          booking_ref:      orderId,
          client_name:      customerName,
          client_email:     customerEmail,
          amount:           parseFloat(amount),
          processor:        'paykings',
          processor_txn_id: result.transactionId,
          status:           'approved',
          card_last4:       result.cardLast4,
          card_brand:       result.cardBrand,
        });

        // Update booking + agreement payment status
        if (bookingId) {
          await sb.from('bookings').update({ payment_status: 'paid', payment_id: result.transactionId })
            .eq('booking_id', bookingId);
          await sb.from('agreements').update({ payment_status: 'paid' })
            .eq('booking_id', bookingId);
        }
      }

      return res.status(200).json({
        success:       true,
        transactionId: result.transactionId,
        cardLast4:     result.cardLast4,
        cardBrand:     result.cardBrand,
        message:       result.message,
        mock:          result.mock || false,
      });

    } else {
      // Record failed transaction
      const sb = getSupabase();
      if (sb) {
        await sb.from('transactions').insert({
          booking_ref:   orderId,
          client_name:   customerName,
          client_email:  customerEmail,
          amount:        parseFloat(amount),
          processor:     'paykings',
          status:        'declined',
          error_message: result.message,
        });
      }
      return res.status(402).json({ success: false, message: result.message });
    }

  } catch (err) {
    console.error('[PayKings] Error:', err);
    return res.status(500).json({ success: false, message: 'Payment processor error. Please try again.' });
  }
};
