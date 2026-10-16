import { createClient } from '@supabase/supabase-js';

// These two values are PUBLIC credentials. Never put a service-role or secret key here.
const url = import.meta.env.VITE_SUPABASE_URL?.trim();
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim();

export const supabase = url && key ? createClient(url, key) : null;
export const cloudConfigured = Boolean(supabase);
