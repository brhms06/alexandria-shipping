-- Migration: Add lat/lng to shipment_updates table
ALTER TABLE shipment_updates ADD COLUMN IF NOT EXISTS lat DOUBLE PRECISION;
ALTER TABLE shipment_updates ADD COLUMN IF NOT EXISTS lng DOUBLE PRECISION;
