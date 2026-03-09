import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bifqnpklhcszqeulauoh.supabase.co';
const supabaseKey = 'sb_publishable_gtTEkg9c1vzFjCP-hkWhMQ_-_mEs9hf';

export const supabase = createClient(supabaseUrl, supabaseKey);