import { createClient as createSupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

/** Public client — for public form submissions (newsletter, survey) */
export function createClient() {
  return createSupabaseClient(supabaseUrl, supabaseAnonKey)
}

/** Admin client — for admin CRUD operations (service role, bypasses RLS) */
export function createAdminClient() {
  return createSupabaseClient(supabaseUrl, supabaseServiceRoleKey)
}
