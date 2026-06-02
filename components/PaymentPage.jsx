// components/PaymentPage.jsx — PayKings Checkout UI
const { useState, useEffect } = React;

function PaymentPage({ booking, agreement, onSuccess, onBack }) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry,     setExpiry]     = useState('');
  const [cvv,        setCvv]        = useState('');
  const [zip,        setZip]        = useState('');
  const [processing, setProcessing] = useState(false);
  const [error,      setError]      = useState('');
  const [done,       setDone]       = useState(null); // { transactionId, cardLast4 }

  const depositAmount = booking?.depositAmount || booking?.agreement?.bookingData?.depositAmount || 200;
  const clientName    = agreement?.clientName  || booking?.name  || '';
  const clientEmail   = agreement?.email       || booking?.email || '';
  const bookingId     = booking?.bookingId     || booking?.agreement?.bookingId || '';

  // Card number formatting: groups of 4
  const handleCardNumber = e => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    setCardNumber(raw.replace(/(.{4})/g, '$1 ').trim());
  };

  // Expiry formatting: MM/YY
  const handleExpiry = e => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    setExpiry(raw.length > 2 ? raw.slice(0,2) + '/' + raw.slice(2) : raw);
  };

  const cardBrand = () => {
    const n = cardNumber.replace(/\s/g, '');
    if (/^4/.test(n))          return { label:'VISA',       color:'#1a1f71' };
    if (/^5[1-5]/.test(n))     return { label:'MASTERCARD', color:'#eb001b' };
    if (/^3[47]/.test(n))      return { label:'AMEX',       color:'#2e77bc' };
    if (/^6/.test(n))          return { label:'DISCOVER',   color:'#f76f20' };
    return null;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    const digits = cardNumber.replace(/\s/g,'');
    if (digits.length < 15) { setError('Please enter a valid card number.'); return; }
    if (expiry.length < 5)  { setError('Please enter a valid expiry date.'); return; }
    if (cvv.length < 3)     { setError('Please enter your CVV.'); return; }

    setProcessing(true);

    try {
      const cfg    = window.AG_CONFIG || {};
      const apiUrl = cfg.PAYMENT_API_URL || '/api/process-payment';
      const useMock = !cfg.USE_PAYMENTS;

      let result;

      if (useMock) {
        // ── Mock response (pre-API-key phase) ──────────────────
        await new Promise(r => setTimeout(r, 1800)); // simulate network
        result = {
          success:       true,
          transactionId: 'MOCK_' + Date.now(),
          cardLast4:     digits.slice(-4),
          cardBrand:     cardBrand()?.label || 'Card',
          mock:          true,
        };
      } else {
        // ── Live PayKings call via serverless function ──────────
        const res = await fetch(apiUrl, {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount:        depositAmount,
            cardNumber:    digits,
            expiry,
            cvv,
            billingZip:    zip,
            customerName:  clientName,
            customerEmail: clientEmail,
            orderId:       bookingId,
            bookingId,
            agreementId:   agreement?.id,
          }),
        });
        result = await res.json();
      }

      if (result.success) {
        // Optionally sync to Supabase
        if (window.SupabaseDB) {
          await window.SupabaseDB.markPaid(bookingId, result.transactionId);
        }
        setDone(result);
        setTimeout(() => onSuccess(result), 2200);
      } else {
        setError(result.message || 'Payment declined. Please try a different card.');
      }
    } catch (err) {
      setError('Connection error. Please check your network and try again.');
    } finally {
      setProcessing(false);
    }
  };

  const inp = {
    width:'100%', padding:'14px 16px',
    background:'rgba(255,255,255,0.05)',
    border:'1px solid rgba(255,255,255,0.1)',
    borderRadius:12, color:'white', fontSize:16,
    outline:'none', fontFamily:"'Inter',sans-serif",
    boxSizing:'border-box', letterSpacing:'0.04em',
  };
  const lbl = {
    display:'block', fontFamily:"'JetBrains Mono',monospace",
    fontSize:10, letterSpacing:'0.2em', textTransform:'uppercase',
    color:'rgba(255,255,255,0.4)', marginBottom:7,
  };

  /* ── Success screen ─────────────────────────────────────── */
  if (done) return (
    <div style={{ minHeight:'100vh', background:'#07070A', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:24, fontFamily:"'Inter',sans-serif", textAlign:'center' }}>
      <div style={{ fontSize:56, marginBottom:20 }}>✅</div>
      <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:'clamp(24px,6vw,36px)', fontWeight:800, color:'white', margin:'0 0 12px' }}>Payment Confirmed</h1>
      <p style={{ color:'rgba(255,255,255,0.55)', fontSize:16, lineHeight:1.7, maxWidth:420, margin:'0 0 24px' }}>
        Your ${depositAmount} deposit was received.<br />
        Transaction: <span style={{ fontFamily:"'JetBrains Mono',monospace", color:'#FF2E88', fontSize:13 }}>{done.transactionId}</span>
      </p>
      {done.mock && <p style={{ fontSize:11, color:'rgba(255,199,44,0.6)', fontFamily:"'JetBrains Mono',monospace" }}>TEST MODE — no real charge was made</p>}
      <div style={{ width:40, height:40, border:'3px solid rgba(255,46,136,0.4)', borderTopColor:'#FF2E88', borderRadius:'50%', animation:'spin .8s linear infinite' }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <p style={{ marginTop:16, color:'rgba(255,255,255,0.3)', fontSize:13 }}>Redirecting to confirmation…</p>
    </div>
  );

  /* ── Checkout form ──────────────────────────────────────── */
  return (
    <div style={{ minHeight:'100vh', background:'#07070A', paddingTop:80, paddingBottom:100, fontFamily:"'Inter',sans-serif" }}>
      <div style={{ maxWidth:560, margin:'0 auto', padding:'0 16px', display:'flex', flexDirection:'column', gap:20 }}>

        {/* Header */}
        <div style={{ textAlign:'center', paddingTop:12 }}>
          <img src="uploads/ChatGPT Image Jun 1, 2026, 12_50_41 PM.png" alt="Angel Girls" style={{ height:48, width:'auto', marginBottom:12, filter:'drop-shadow(0 0 16px rgba(255,46,136,0.45))' }} />
          <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, letterSpacing:'0.28em', textTransform:'uppercase', color:'rgba(255,46,136,0.7)', margin:'0 0 6px' }}>Secure Checkout</p>
          <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:'clamp(22px,5vw,28px)', fontWeight:800, color:'white', margin:0 }}>Booking Deposit</h1>
        </div>

        {/* Agreement confirmed badge */}
        {agreement && (
          <div style={{ display:'flex', alignItems:'center', gap:10, padding:'12px 16px', background:'rgba(34,197,94,0.08)', border:'1px solid rgba(34,197,94,0.2)', borderRadius:12 }}>
            <span style={{ fontSize:18 }}>✅</span>
            <div>
              <p style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:13, color:'#4ade80', margin:0 }}>Agreement Signed</p>
              <p style={{ fontSize:11, color:'rgba(255,255,255,0.4)', margin:0, fontFamily:"'JetBrains Mono',monospace", letterSpacing:'0.05em' }}>Ref: {agreement.id}</p>
            </div>
          </div>
        )}

        {/* Order summary */}
        <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:16, padding:'18px 20px' }}>
          <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, letterSpacing:'0.22em', textTransform:'uppercase', color:'rgba(255,255,255,0.35)', margin:'0 0 14px' }}>Order Summary</p>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {[
              ['Client',   clientName],
              ['Booking',  bookingId],
              ['Angels',   `${(booking?.selectedGirlIds || []).length || 1}`],
              ['Service',  booking?.serviceId || '—'],
              ['Duration', `${booking?.hours || 2} hours`],
            ].map(([k,v]) => (
              <div key={k} style={{ display:'flex', justifyContent:'space-between' }}>
                <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:'rgba(255,255,255,0.4)' }}>{k}</span>
                <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:'white', fontWeight:600 }}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop:14, paddingTop:14, borderTop:'1px solid rgba(255,255,255,0.07)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:14, color:'rgba(255,255,255,0.7)' }}>Deposit Due Now</span>
            <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:28, color:'#FF2E88' }}>${depositAmount}</span>
          </div>
        </div>

        {/* Card form */}
        <form onSubmit={handleSubmit} style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:16, padding:'22px 20px', display:'flex', flexDirection:'column', gap:16 }}>
          <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, letterSpacing:'0.22em', textTransform:'uppercase', color:'rgba(255,255,255,0.35)', margin:0 }}>Card Details</p>

          {/* Card number */}
          <div>
            <label style={lbl}>Card Number</label>
            <div style={{ position:'relative' }}>
              <input type="text" value={cardNumber} onChange={handleCardNumber} placeholder="1234 5678 9012 3456" inputMode="numeric" style={inp} />
              {cardBrand() && (
                <span style={{ position:'absolute', right:14, top:'50%', transform:'translateY(-50%)', fontFamily:"'JetBrains Mono',monospace", fontSize:10, fontWeight:800, color:cardBrand().color, background:'white', padding:'2px 7px', borderRadius:4, letterSpacing:'0.05em' }}>
                  {cardBrand().label}
                </span>
              )}
            </div>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12 }}>
            <div style={{ gridColumn:'1/3' }}>
              <label style={lbl}>Expiry</label>
              <input type="text" value={expiry} onChange={handleExpiry} placeholder="MM/YY" inputMode="numeric" style={inp} />
            </div>
            <div>
              <label style={lbl}>CVV</label>
              <input type="text" value={cvv} onChange={e => setCvv(e.target.value.replace(/\D/g,'').slice(0,4))} placeholder="•••" inputMode="numeric" style={inp} />
            </div>
          </div>

          <div>
            <label style={lbl}>Billing ZIP</label>
            <input type="text" value={zip} onChange={e => setZip(e.target.value.replace(/\D/g,'').slice(0,5))} placeholder="89109" inputMode="numeric" style={{ ...inp, maxWidth:160 }} />
          </div>

          {error && (
            <div style={{ padding:'11px 14px', background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.25)', borderRadius:10, color:'#fca5a5', fontSize:13 }}>{error}</div>
          )}

          <div style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 14px', background:'rgba(255,255,255,0.02)', borderRadius:9 }}>
            <span style={{ fontSize:16 }}>🔒</span>
            <p style={{ fontSize:11, color:'rgba(255,255,255,0.35)', margin:0, lineHeight:1.5 }}>
              256-bit SSL encrypted · Processed by PayKings · Your card data is never stored on our servers
            </p>
          </div>
        </form>

        <button onClick={onBack} style={{ background:'none', border:'none', color:'rgba(255,255,255,0.25)', fontSize:12, fontFamily:"'JetBrains Mono',monospace", letterSpacing:'0.15em', textTransform:'uppercase', cursor:'pointer', alignSelf:'flex-start' }}>
          ← Back
        </button>
      </div>

      {/* Sticky CTA */}
      <div style={{ position:'fixed', bottom:0, left:0, right:0, padding:'12px 16px 18px', background:'rgba(7,7,10,0.96)', backdropFilter:'blur(20px)', borderTop:'1px solid rgba(255,255,255,0.07)', zIndex:60 }}>
        <div style={{ maxWidth:560, margin:'0 auto' }}>
          {(window.AG_CONFIG && !window.AG_CONFIG.USE_PAYMENTS) && (
            <p style={{ textAlign:'center', fontSize:10, color:'rgba(255,199,44,0.5)', fontFamily:"'JetBrains Mono',monospace", margin:'0 0 8px', letterSpacing:'0.1em' }}>
              ⚠ TEST MODE — PayKings API key not yet configured
            </p>
          )}
          <button
            onClick={handleSubmit}
            disabled={processing || !cardNumber || !expiry || !cvv}
            style={{ width:'100%', padding:'17px', background: (!processing && cardNumber && expiry && cvv) ? 'linear-gradient(135deg,#FF2E88,#FF5EB3)' : 'rgba(255,255,255,0.07)', border:'none', borderRadius:14, color: (!processing && cardNumber && expiry && cvv) ? 'white' : 'rgba(255,255,255,0.25)', fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:'clamp(14px,4vw,16px)', cursor: (!processing && cardNumber && expiry && cvv) ? 'pointer' : 'not-allowed', letterSpacing:'0.04em', transition:'all .2s', boxShadow: (!processing && cardNumber) ? '0 8px 32px rgba(255,46,136,0.4)' : 'none', minHeight:54 }}
          >
            {processing ? '🔒 Processing…' : `Pay $${depositAmount} Deposit →`}
          </button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { PaymentPage });
