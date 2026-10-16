import { supabase } from './supabase';

// Browser demo: public evidence. Never use this for private student photos.
export async function uploadDemoEvidence(file: File): Promise<string | null> {
  if (!supabase) return null;
  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (!allowed.includes(file.type)) throw new Error('Use a JPG, PNG, WebP or GIF image.');
  if (file.size > 5 * 1024 * 1024) throw new Error('Image must be smaller than 5 MB.');
  const extension = file.type === 'image/jpeg' ? 'jpg' : file.type.split('/')[1];
  const path = `${crypto.randomUUID()}.${extension}`;
  const { data, error } = await supabase.storage.from('ecoverse-demo-evidence').upload(path, file, {
    upsert: false,
    cacheControl: '3600',
    contentType: file.type
  });
  if (error) throw error;
  return supabase.storage.from('ecoverse-demo-evidence').getPublicUrl(data.path).data.publicUrl;
}
