import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hosbvejfkfxuyxbtoshp.supabase.co';
const supabaseAnonKey = 'sb_publishable_ms3CHVD6KY3oZxaqGFL27Q_O6PvNvq8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);