// supabase/client.js — Supabase JS client wrapper
// Loaded via CDN in index.html: <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

(function () {
  'use strict';

  function initSupabase() {
    const cfg = window.AG_CONFIG;
    if (!cfg || !cfg.USE_SUPABASE) {
      window.supabaseClient = null;
      return;
    }
    if (!cfg.SUPABASE_URL || cfg.SUPABASE_URL.includes('REPLACE_WITH')) {
      console.warn('[Supabase] Not configured — using localStorage fallback');
      window.supabaseClient = null;
      return;
    }
    if (typeof window.supabase === 'undefined') {
      console.warn('[Supabase] SDK not loaded');
      window.supabaseClient = null;
      return;
    }
    window.supabaseClient = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);
    console.log('[Supabase] Client initialized');
  }

  // ── Data helpers (fall back to localStorage if Supabase not ready) ──

  const DB = {

    // Girls
    async getActiveGirls() {
      if (!window.supabaseClient) return null;
      const { data, error } = await window.supabaseClient
        .from('girls').select('*').eq('public_status', 'active');
      if (error) { console.error('[Supabase] getActiveGirls:', error); return null; }
      return data;
    },

    // Pricing
    async getPricing() {
      if (!window.supabaseClient) return null;
      const { data, error } = await window.supabaseClient
        .from('pricing').select('*').eq('id', 1).single();
      if (error) { console.error('[Supabase] getPricing:', error); return null; }
      return {
        services: data.services,
        depositPerAngel: parseFloat(data.deposit_per_angel),
        offStripSurcharge: parseFloat(data.off_strip_surcharge)
      };
    },

    async savePricing(pricing) {
      if (!window.supabaseClient) return false;
      const { error } = await window.supabaseClient
        .from('pricing').upsert({
          id: 1,
          services: pricing.services,
          deposit_per_angel: pricing.depositPerAngel,
          off_strip_surcharge: pricing.offStripSurcharge,
          updated_at: new Date().toISOString()
        });
      if (error) { console.error('[Supabase] savePricing:', error); return false; }
      return true;
    },

    // Bookings
    async saveBooking(booking) {
      if (!window.supabaseClient) return null;
      const { data, error } = await window.supabaseClient
        .from('bookings').insert({
          booking_id:      booking.bookingId,
          client_name:     booking.name,
          client_phone:    booking.phone,
          client_email:    booking.email,
          service_id:      booking.serviceId,
          hours:           booking.hours,
          booking_date:    booking.date,
          start_time:      booking.time,
          location:        booking.location,
          room_number:     booking.roomNumber,
          instructions:    booking.instructions,
          selected_angels: booking.selectedGirlIds,
          total_price:     booking.totalPrice,
          deposit_amount:  booking.depositAmount,
          payment_status:  'pending',
          zone_id:         booking.zoneId || null,
        }).select().single();
      if (error) { console.error('[Supabase] saveBooking:', error); return null; }
      return data;
    },

    // Agreements
    async saveAgreement(agreement) {
      if (!window.supabaseClient) return null;
      const { data, error } = await window.supabaseClient
        .from('agreements').insert({
          agreement_ref:      agreement.id,
          booking_id:         agreement.bookingId,
          version:            agreement.version,
          client_name:        agreement.clientName,
          client_phone:       agreement.phone,
          client_email:       agreement.email,
          booking_date:       agreement.bookingDate,
          typed_legal_name:   agreement.typedLegalName,
          signature_data_url: agreement.signatureDataUrl,
          checkbox_agreed:    agreement.checkboxAgreed,
          ip_address:         agreement.ip,
          payment_status:     'pending',
          booking_data:       agreement.bookingData,
        }).select().single();
      if (error) { console.error('[Supabase] saveAgreement:', error); return null; }
      return data;
    },

    // Mark payment paid
    async markPaid(bookingId, transactionId) {
      if (!window.supabaseClient) return;
      await window.supabaseClient.from('bookings').update({
        payment_status: 'paid', payment_id: transactionId
      }).eq('booking_id', bookingId);
      await window.supabaseClient.from('agreements').update({
        payment_status: 'paid'
      }).eq('booking_id', bookingId);
    },

    // Applications
    async saveApplication(app) {
      if (!window.supabaseClient) return null;
      const { data, error } = await window.supabaseClient
        .from('applications').insert({
          stage_name: app.stageName,
          phone:      app.phone,
          intro:      app.intro,
          source:     app.source,
        }).select().single();
      if (error) { console.error('[Supabase] saveApplication:', error); return null; }
      return data;
    },
  };

  window.SupabaseDB = DB;
  window.initSupabase = initSupabase;

  // Auto-init after config loads
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSupabase);
  } else {
    initSupabase();
  }
})();
