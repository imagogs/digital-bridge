import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ejzcwrunlbnhjqggeivu.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_ifgqbezbfYzz-7dph9d3Ng_uQORi9sI';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
