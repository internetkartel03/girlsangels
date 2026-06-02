// config/env.js — Client-side public configuration
// ⚠️  NEVER put secret keys here. Only public/anon keys.
// Secret keys (PAYKINGS_API_KEY, SERVICE_ROLE_KEY) live in Vercel env vars only.

window.AG_CONFIG = {
  // ── Supabase (public anon key — safe for client) ──────────────
  SUPABASE_URL:      'REPLACE_WITH_YOUR_SUPABASE_URL',
  SUPABASE_ANON_KEY: 'REPLACE_WITH_YOUR_SUPABASE_ANON_KEY',

  // ── Payment (calls your own Vercel serverless function) ───────
  PAYMENT_API_URL: '/api/process-payment',

  // ── App ───────────────────────────────────────────────────────
  SITE_URL:        'https://angelgirls.com',
  SUPPORT_PHONE:   '702-556-3772',
  AGREEMENT_VER:   '1.0',

  // ── Feature flags (flip to true when ready) ──────────────────
  USE_SUPABASE:    false,   // true = live DB, false = localStorage
  USE_PAYMENTS:    false,   // true = live PayKings, false = mock success
};
