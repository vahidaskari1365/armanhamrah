
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Read .env file manually since we are in a script
const envPath = path.join(__dirname, '.env');
const envConfig = fs.readFileSync(envPath, 'utf8').split('\n').reduce((acc, line) => {
  const [key, value] = line.split('=');
  if (key && value) acc[key.trim()] = value.trim().replace(/"/g, '');
  return acc;
}, {});

const supabaseUrl = envConfig.NEXT_PUBLIC_SUPABASE_URL || envConfig.VITE_SUPABASE_URL;
const supabaseServiceKey = envConfig.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: Supabase URL or Service Key not found in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function grantAdminPrivileges() {
  const emailToUpdate = 'vahid.askari1986@gmail.com';
  console.log(`Attempting to grant admin role to: ${emailToUpdate}`);

  try {
    // 1. Find the user by email
    const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
    
    if (listError) {
      console.error('Error listing users:', listError.message);
      return;
    }

    const user = users.find(u => u.email === emailToUpdate);

    if (!user) {
      console.log(`User with email ${emailToUpdate} not found in auth.users.`);
      return;
    }

    console.log(`Found user ID: ${user.id}`);

    // 2. Insert or update the user_roles table
    const { error: roleError } = await supabase
      .from('user_roles')
      .upsert({ user_id: user.id, role: 'admin' }, { onConflict: 'user_id' });

    if (roleError) {
      console.error('Error updating user_roles:', roleError.message);
      return;
    }

    console.log(`Successfully granted admin role to ${emailToUpdate} (ID: ${user.id}).`);
  } catch (err) {
    console.error('An unexpected error occurred:', err);
  }
}

grantAdminPrivileges();
