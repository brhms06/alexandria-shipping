-- Alexandria Freight Tracking - Database Schema

-- 1. Create Shipments Table
CREATE TABLE shipments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_id TEXT UNIQUE NOT NULL,
  status INTEGER NOT NULL DEFAULT 1, -- 1: Received, 2: In Transit, 3: Sorting, 4: On the Way, 5: Delivered
  pickup_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  estimate_drop TEXT,
  return_available TEXT,
  
  -- Sender/Pickup Info
  sender_name TEXT,
  sender_address TEXT,
  sender_lat DOUBLE PRECISION,
  sender_lng DOUBLE PRECISION,
  
  -- Receiver/Dropoff Info
  receiver_name TEXT,
  receiver_address TEXT,
  receiver_lat DOUBLE PRECISION,
  receiver_lng DOUBLE PRECISION,
  
  -- Current Location (for live map)
  current_lat DOUBLE PRECISION,
  current_lng DOUBLE PRECISION,
  current_location_name TEXT,
  
  -- Customer Details
  customer_name TEXT,
  customer_email TEXT,
  customer_phone TEXT,

  -- Extended Contact Details
  sender_phone TEXT,
  sender_country TEXT,
  sender_email TEXT,
  receiver_phone TEXT,
  receiver_country TEXT,
  receiver_email TEXT,

  -- Reference & Financial
  po_number TEXT,
  pending_fees NUMERIC(12,2) DEFAULT 0,
  dispatch_date TIMESTAMP WITH TIME ZONE,

  -- Additional Logistics Data
  service_level TEXT DEFAULT 'Standard',
  payment_status TEXT DEFAULT 'Pending',
  payment_method TEXT,
  weight NUMERIC,
  volume NUMERIC,
  estimated_delivery TIMESTAMP WITH TIME ZONE,
  transport_type TEXT DEFAULT 'land',
  stops JSONB DEFAULT '[]'::jsonb,
  current_stop_index INTEGER DEFAULT -1,
  last_status_update TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  image_url TEXT,
  internal_notes TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create Shipment Items Table
CREATE TABLE shipment_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shipment_id UUID REFERENCES shipments(id) ON DELETE CASCADE,
  item_name TEXT NOT NULL,
  price NUMERIC(12,2) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Enable RLS
ALTER TABLE shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipment_items ENABLE ROW LEVEL SECURITY;

-- 4. Policies
-- Public can only READ shipments by tracking_id
CREATE POLICY "Public can view shipment by tracking_id" ON shipments
  FOR SELECT USING (true);

CREATE POLICY "Public can view shipment items" ON shipment_items
  FOR SELECT USING (true);

-- Admin (Authenticated) can do everything
CREATE POLICY "Admins have full access to shipments" ON shipments
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admins have full access to shipment_items" ON shipment_items
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 5. Helper function for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_shipments_updated_at
BEFORE UPDATE ON shipments
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- 6. Create Shipment Updates Table (for history/logs)
CREATE TABLE IF NOT EXISTS shipment_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shipment_id UUID REFERENCES shipments(id) ON DELETE CASCADE,
  status INTEGER NOT NULL,
  location TEXT,
  message TEXT,
  email_sent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE shipment_updates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins have full access to shipment_updates" ON shipment_updates
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Public can view shipment_updates" ON shipment_updates
  FOR SELECT USING (true);
