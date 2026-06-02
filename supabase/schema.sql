-- ============================================================
-- Angel Girls Entertainment — Supabase Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── Girls / Performers ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS girls (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  username        TEXT UNIQUE NOT NULL,
  password_hash   TEXT NOT NULL,
  stage_name      TEXT NOT NULL,
  bio             TEXT DEFAULT '',
  photos          JSONB DEFAULT '[]',
  public_status   TEXT DEFAULT 'hidden' CHECK (public_status IN ('active','hidden','suspended')),
  work_hours      JSONB DEFAULT '{"days":[],"startHour":21,"endHour":4}',
  pending         JSONB,
  reset_code      JSONB,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── Bookings ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS bookings (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  booking_ref     TEXT UNIQUE NOT NULL DEFAULT ('BK-' || UPPER(SUBSTR(MD5(RANDOM()::TEXT), 1, 8))),
  client_name     TEXT NOT NULL,
  client_phone    TEXT NOT NULL,
  client_email    TEXT NOT NULL,
  service_id      TEXT NOT NULL,
  service_name    TEXT,
  hours           INTEGER NOT NULL DEFAULT 2,
  booking_date    DATE,
  start_time      TEXT,
  location        TEXT,
  room_number     TEXT,
  instructions    TEXT,
  selected_angels JSONB DEFAULT '[]',
  total_price     DECIMAL(10,2),
  deposit_amount  DECIMAL(10,2),
  payment_status  TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending','paid','refunded','failed')),
  payment_id      TEXT,
  zone_id         TEXT,
  booking_id      TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── Agreements (E-Sign) ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS agreements (
  id                  UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  agreement_ref       TEXT UNIQUE NOT NULL,
  booking_id          TEXT,
  booking_ref         TEXT,
  version             TEXT DEFAULT '1.0',
  client_name         TEXT NOT NULL,
  client_phone        TEXT NOT NULL,
  client_email        TEXT NOT NULL,
  booking_date        DATE,
  typed_legal_name    TEXT NOT NULL,
  signature_data_url  TEXT NOT NULL,
  checkbox_agreed     BOOLEAN DEFAULT TRUE,
  ip_address          TEXT,
  payment_status      TEXT DEFAULT 'pending',
  booking_data        JSONB,
  signed_at           TIMESTAMPTZ DEFAULT NOW()
);

-- ── Job Applications ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS applications (
  id           UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  stage_name   TEXT NOT NULL,
  phone        TEXT NOT NULL,
  intro        TEXT,
  source       TEXT,
  status       TEXT DEFAULT 'pending' CHECK (status IN ('pending','approved','denied')),
  notes        TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at  TIMESTAMPTZ
);

-- ── Pricing (single admin-controlled row) ─────────────────────
CREATE TABLE IF NOT EXISTS pricing (
  id                  INTEGER PRIMARY KEY DEFAULT 1,
  services            JSONB NOT NULL DEFAULT '[
    {"id":"nude","name":"Full Nude Private Dancing","hourlyRate":800},
    {"id":"topless","name":"Topless Private Dancing","hourlyRate":650},
    {"id":"pool","name":"Pool Party / VIP Club Events","hourlyRate":550},
    {"id":"companion","name":"Arm Candy / VIP Dinner Date","hourlyRate":550}
  ]',
  deposit_per_angel   DECIMAL(10,2) DEFAULT 200,
  off_strip_surcharge DECIMAL(10,2) DEFAULT 50,
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default pricing row
INSERT INTO pricing (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- ── Payment Transactions ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS transactions (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  booking_ref     TEXT,
  agreement_ref   TEXT,
  client_name     TEXT,
  client_email    TEXT,
  amount          DECIMAL(10,2) NOT NULL,
  currency        TEXT DEFAULT 'USD',
  payment_method  TEXT DEFAULT 'card',
  processor       TEXT DEFAULT 'paykings',
  processor_txn_id TEXT,
  status          TEXT DEFAULT 'pending' CHECK (status IN ('pending','approved','declined','refunded')),
  error_message   TEXT,
  card_last4      TEXT,
  card_brand      TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ════════════════════════════════════════
-- Row Level Security (RLS)
-- ════════════════════════════════════════

ALTER TABLE girls        ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings     ENABLE ROW LEVEL SECURITY;
ALTER TABLE agreements   ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing      ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Public: read active girls only
CREATE POLICY "public_read_active_girls" ON girls
  FOR SELECT USING (public_status = 'active');

-- Public: insert bookings
CREATE POLICY "public_insert_bookings" ON bookings
  FOR INSERT WITH CHECK (true);

-- Public: insert agreements
CREATE POLICY "public_insert_agreements" ON agreements
  FOR INSERT WITH CHECK (true);

-- Public: insert applications
CREATE POLICY "public_insert_applications" ON applications
  FOR INSERT WITH CHECK (true);

-- Public: read pricing
CREATE POLICY "public_read_pricing" ON pricing
  FOR SELECT USING (true);

-- Public: insert transactions
CREATE POLICY "public_insert_transactions" ON transactions
  FOR INSERT WITH CHECK (true);

-- Service role (admin): full access to all tables
-- (service role bypasses RLS automatically in Supabase)

-- ════════════════════════════════════════
-- Indexes for performance
-- ════════════════════════════════════════
CREATE INDEX IF NOT EXISTS idx_bookings_email    ON bookings(client_email);
CREATE INDEX IF NOT EXISTS idx_bookings_status   ON bookings(payment_status);
CREATE INDEX IF NOT EXISTS idx_agreements_booking ON agreements(booking_id);
CREATE INDEX IF NOT EXISTS idx_transactions_booking ON transactions(booking_ref);
CREATE INDEX IF NOT EXISTS idx_girls_status      ON girls(public_status);
