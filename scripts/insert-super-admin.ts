import { createClient } from '@supabase/supabase-js';
import * as bcrypt from 'bcrypt';

const supabaseUrl = process.env.SUPABASE_URL || 'https://wuwvxzupvnizrhswpqkw.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1d3Z4enVwdm5penJoc3dwcWt3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTgyNDQ3NCwiZXhwIjoyMDY1NDAwNDc0fQ.U0ekPkWEsgU6D8Q2A-hyjoKNutWsxvGNRdx55Qgv8lo';

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function insertSuperAdmin() {
  try {
    // Define super admin details
    const adminDetails = {
      email: 'stephenbedz@gmail.com',
      password: 'Amblessed6060@@',
      name: 'Super Admin',
      role: 'admin',
    };

    // Check if user already exists in auth.users
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('email')
      .eq('email', adminDetails.email)
      .single();

    if (existingUser) {
      console.log(`User with email ${adminDetails.email} already exists.`);
      return;
    }
    if (checkError && checkError.code !== 'PGRST116') { // PGRST116: No rows found
      throw new Error(`Error checking existing user: ${checkError.message}`);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(adminDetails.password, 10);

    // Create user in auth.users
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email: adminDetails.email,
      password: adminDetails.password,
      email_confirm: true,
      user_metadata: { name: adminDetails.name, role: adminDetails.role },
    });

    if (authError) {
      throw new Error(`Failed to create auth user: ${authError.message}`);
    }

    // The handle_new_user trigger should sync to public.users, but verify
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', authUser.user.id)
      .single();

    if (userError) {
      throw new Error(`Failed to verify user in public.users: ${userError.message}`);
    }

    console.log('Super admin created successfully:', {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });
  } catch (error) {
    console.error('Error inserting super admin:', error.message);
  }
}

insertSuperAdmin();