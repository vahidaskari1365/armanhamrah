
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Ensure credentials are available
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Error: Supabase URL or Anon Key is not defined in your .env.local file.');
  console.error('Please make sure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function grantAdminPrivileges() {
  const emailToUpdate = 'vahid.askari1986@gmail.com';
  console.log(`Attempting to grant admin role to: ${emailToUpdate}`);

  try {
    const { data, error } = await supabase
      .from('users')
      .update({ role: 'admin' })
      .eq('email', emailToUpdate)
      .select();

    if (error) {
      console.error('Error updating user role:', error.message);
      return;
    }

    if (data && data.length > 0) {
      console.log(`Successfully granted admin role to ${emailToUpdate}.`);
      console.log('User details:', data[0]);
    } else {
      console.log(`User with email ${emailToUpdate} not found. No changes were made.`);
    }
  } catch (err) {
    console.error('An unexpected error occurred:', err);
  }
}

grantAdminPrivileges();
