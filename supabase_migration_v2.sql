-- Migration to add new shipment fields
ALTER TABLE shipments 
ADD COLUMN IF NOT EXISTS sender_email TEXT,
ADD COLUMN IF NOT EXISTS receiver_email TEXT,
ADD COLUMN IF NOT EXISTS origin TEXT,
ADD COLUMN IF NOT EXISTS destination TEXT,
ADD COLUMN IF NOT EXISTS current_location TEXT,
ADD COLUMN IF NOT EXISTS weight_unit TEXT DEFAULT 'kg',
ADD COLUMN IF NOT EXISTS amount NUMERIC DEFAULT 0;

-- Optional: Update existing records to have a default weight_unit if needed
-- UPDATE shipments SET weight_unit = 'kg' WHERE weight_unit IS NULL;
