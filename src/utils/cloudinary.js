// Rewrites a Cloudinary URL to request a resized, auto-compressed version instead
// of the full-resolution original — avoids downloading/decoding huge images just
// to display them as small thumbnails.
export function cloudinaryThumbnail(url, size = 100) {
  if (!url || !url.includes('/upload/')) return url;
  return url.replace('/upload/', `/upload/w_${size},h_${size},c_fill,q_auto,f_auto/`);
}
