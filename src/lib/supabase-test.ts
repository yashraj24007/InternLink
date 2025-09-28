import { supabase } from '@/lib/supabase';

export const testSupabaseConnection = async () => {
  try {
    console.log('Testing Supabase connection...');
    
    // Test basic connection
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('Supabase connection test failed:', error.message);
      return { success: false, error: error.message };
    }
    
    console.log('Supabase connection successful!');
    return { success: true, data };
    
  } catch (err) {
    console.error('Supabase connection error:', err);
    return { success: false, error: 'Connection failed' };
  }
};

export const initializeSupabaseSchema = async () => {
  try {
    console.log('Checking if tables exist...');
    
    // Check if users table exists
    const { error } = await supabase
      .from('users')
      .select('id')
      .limit(1);
    
    if (error && error.message.includes('relation "users" does not exist')) {
      console.log('Users table does not exist. You need to create the database schema.');
      return { 
        success: false, 
        error: 'Database schema not found. Please run the SQL setup commands in Supabase.',
        needsSetup: true
      };
    }
    
    return { success: true };
    
  } catch (err) {
    console.error('Schema check error:', err);
    return { success: false, error: 'Schema check failed' };
  }
};