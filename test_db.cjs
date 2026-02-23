
require('dotenv').config({ path: '.env' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Supabase credentials are not defined in .env file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const testConnection = async () => {
  console.log('Attempting to connect to Supabase and fetch from \'products\' table...');

  const { data, error } = await supabase
    .from('products')
    .select('id')
    .limit(1);

  if (error) {
    console.error('\nTest failed. An error occurred:');
    console.error('Error Code:', error.code);
    console.error('Error Message:', error.message);
    
    if (error.code === '42P01') {
        console.log('\n[SUCCESSFUL DIAGNOSIS] The connection is working, but the \'products\' table does not exist.');
    } else {
        console.log('\n[DIAGNOSIS] There seems to be a connection issue.', error.details);
    }
    return;
  }

  console.log('\nTest successful! Connection to Supabase is working.');
  console.log('A \'products\' table already exists. Found at least one row:', data);
};

testConnection();
