import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

/**
 * Extracts bucket name and file path from a Supabase public storage URL.
 * Format: https://[ref].supabase.co/storage/v1/object/public/[bucket]/[path]
 */
export function getStoragePathFromUrl(url: string) {
  if (!url || !url.includes('/storage/v1/object/public/')) return null;
  
  try {
    const parts = url.split('/storage/v1/object/public/');
    if (parts.length < 2) return null;
    
    const storagePart = parts[1];
    const firstSlashIndex = storagePart.indexOf('/');
    
    if (firstSlashIndex === -1) return null;
    
    const bucket = storagePart.substring(0, firstSlashIndex);
    const path = storagePart.substring(firstSlashIndex + 1);
    
    return { bucket, path };
  } catch (e) {
    console.error("Error parsing storage URL:", e);
    return null;
  }
}
