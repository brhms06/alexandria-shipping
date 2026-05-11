import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tgvmjkxajjcxvbitsrxi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRndm1qa3hhampjeHZiaXRzcnhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3MTkzMjEsImV4cCI6MjA5MzI5NTMyMX0.bDufsO43RSIX7j6kCkmpymEpBAlSyHgqRkvwYhTvLUg';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkShipment(trackingId: string) {
  console.log(`Checking shipment: ${trackingId}`);
  
  const { data: shipment, error: sError } = await supabase
    .from('shipments')
    .select('*')
    .eq('tracking_id', trackingId)
    .single();

  if (sError) {
    console.error("Error fetching shipment:", sError);
    return;
  }

  console.log("\n--- Shipment Info ---");
  console.log(`ID: ${shipment.id}`);
  console.log(`Status: ${shipment.status}`);
  console.log(`Current Location: ${shipment.current_location} (${shipment.current_lat}, ${shipment.current_lng})`);
  console.log(`Origin: ${shipment.origin} (${shipment.sender_lat}, ${shipment.sender_lng})`);
  console.log(`Destination: ${shipment.destination} (${shipment.receiver_lat}, ${shipment.receiver_lng})`);

  const { data: updates, error: uError } = await supabase
    .from('shipment_updates')
    .select('*')
    .eq('shipment_id', shipment.id)
    .order('created_at', { ascending: true });

  if (uError) {
    console.error("Error fetching updates:", uError);
    return;
  }

  console.log(`\n--- Updates (${updates.length}) ---`);
  updates.forEach((u, i) => {
    console.log(`${i + 1}. [${u.created_at}] Status: ${u.status} | Location: ${u.location} (${u.lat}, ${u.lng})`);
    console.log(`   Message: ${u.message}`);
  });
}

checkShipment('ALX-45044006');
