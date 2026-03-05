require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in your .env file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const listAllUsers = async () => {
  console.log('Fetching all users from Supabase...');

  try {
    const { data: { users }, error } = await supabase.auth.admin.listUsers();

    if (error) {
      throw error;
    }

    if (users && users.length > 0) {
      console.log('--- ✅ Registered Users ---');
      users.forEach(user => {
        console.log(`- ID: ${user.id}, Email: ${user.email}, Created_at: ${user.created_at}`);
      });
      console.log('--------------------------');
    } else {
      console.log('No users found in the database.');
    }

  } catch (error) {
    console.error('\n--- ❌ An error occurred ---');
    console.error(`Error Message: ${error.message}`);
    console.error('---------------------------\n');
  }
};

listAllUsers();