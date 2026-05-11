const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://tgvmjkxajjcxvbitsrxi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRndm1qa3hhampjeHZiaXRzcnhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3MTkzMjEsImV4cCI6MjA5MzI5NTMyMX0.bDufsO43RSIX7j6kCkmpymEpBAlSyHgqRkvwYhTvLUg';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkShipment() {
  const { data, error } = await supabase
    .from('shipments')
    .select(`*, shipment_updates (*)`)
    .eq('tracking_id', 'ALX-45044006')
    .single();

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('Shipment Details:');
  console.log(JSON.stringify(data, null, 2));
}

checkShipment();
