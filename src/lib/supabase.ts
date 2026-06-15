import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://yzreudrlcapyolwsqgaq.supabase.co'
const supabaseAnonKey = 'sb_publishable_0id05fbNZIpqbOhbCzS1-A_zzovDpsQ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)