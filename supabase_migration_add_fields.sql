-- ============================================================
-- Alexandria Freight Tracking - COMPLETE Migration Script
-- Run this ONCE in your Supabase SQL Editor (Dashboard > SQL Editor)
-- This adds ALL missing columns so the app works without errors
-- ============================================================

-- ─── SENDER EXTENDED CONTACT ─────────────────────────────────
ALTER TABLE shipments ADD COLUMN IF NOT EXISTS sender_phone TEXT;
ALTER TABLE shipments ADD COLUMN IF NOT EXISTS sender_country TEXT;
ALTER TABLE shipments ADD COLUMN IF NOT EXISTS sender_email TEXT;

-- ─── RECEIVER EXTENDED CONTACT ───────────────────────────────
ALTER TABLE shipments ADD COLUMN IF NOT EXISTS receiver_phone TEXT;
ALTER TABLE shipments ADD COLUMN IF NOT EXISTS receiver_country TEXT;
ALTER TABLE shipments ADD COLUMN IF NOT EXISTS receiver_email TEXT;

-- ─── REFERENCE & FINANCIAL ───────────────────────────────────
ALTER TABLE shipments ADD COLUMN IF NOT EXISTS po_number TEXT;
ALTER TABLE shipments ADD COLUMN IF NOT EXISTS pending_fees NUMERIC(12,2) DEFAULT 0;
ALTER TABLE shipments ADD COLUMN IF NOT EXISTS dispatch_date TIMESTAMP WITH TIME ZONE;

-- ─── LOGISTICS FIELDS (may already exist, safe to re-run) ───
ALTER TABLE shipments ADD COLUMN IF NOT EXISTS origin TEXT;
ALTER TABLE shipments ADD COLUMN IF NOT EXISTS destination TEXT;
ALTER TABLE shipments ADD COLUMN IF NOT EXISTS current_location TEXT;
ALTER TABLE shipments ADD COLUMN IF NOT EXISTS weight_unit TEXT DEFAULT 'kg';
ALTER TABLE shipments ADD COLUMN IF NOT EXISTS amount NUMERIC(12,2) DEFAULT 0;

-- ============================================================
-- DONE! You can now close this tab.
-- ============================================================
