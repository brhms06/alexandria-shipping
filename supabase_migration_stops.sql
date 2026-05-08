-- Migration to support Multi-Stop Routing and Tactical Movement
ALTER TABLE shipments 
ADD COLUMN IF NOT EXISTS stops JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS current_stop_index INTEGER DEFAULT -1;

-- Explanation:
-- stops: A JSONB array of stop objects { name: string, lat: number, lng: number, status: 'pending' | 'completed' }
-- current_stop_index: The current position in the stops array.
--   -1: Origin
--    0 to N-1: Currently at/between stops
--    N: Arrived at Destination
