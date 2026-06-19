import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://pygdtwzbtfdzjznjznbn.supabase.co"
const supabaseAnonKey = "sb_publishable_OraMzTEsQ3XwfsIGdjUWYA_stoQSfnn"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)