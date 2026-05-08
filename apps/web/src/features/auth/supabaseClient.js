import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mddkcrjafjkhxwscbogj.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_E-zsD6HnQqvwNxJxgpvlmg_jZUTDXxT';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
