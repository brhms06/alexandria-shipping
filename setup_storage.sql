-- Alexandria Freight Tracking: Storage Setup Script
-- Run this in your Supabase SQL Editor to initialize the storage bucket and CORS.

-- 1. Create the bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('shipment-images', 'shipment-images', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Allow public access to read files
CREATE POLICY "Public Access" ON storage.objects
  FOR SELECT USING (bucket_id = 'shipment-images');

-- 3. Allow authenticated users to upload files
CREATE POLICY "Authenticated Upload" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'shipment-images');

-- 4. Allow authenticated users to update/delete their own files
CREATE POLICY "Authenticated Update" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'shipment-images');

CREATE POLICY "Authenticated Delete" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'shipment-images');

-- 5. Set up CORS (Note: This is usually done via the UI or API, 
-- but this SQL demonstrates how it's stored internally)
-- To allow ANY domain (fully dynamic):
-- Go to Storage -> Settings -> CORS in the Supabase Dashboard and add:
-- [
--   {
--     "allowedOrigins": ["*"],
--     "allowedMethods": ["GET", "POST", "PUT", "DELETE"],
--     "allowedHeaders": ["*"],
--     "maxAgeSeconds": 3600
--   }
-- ]
