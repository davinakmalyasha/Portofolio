/**
 * Converts a full image URL to its thumbnail variant.
 * Example: "/imgOrIcon/photo.avif" → "/imgOrIcon/photo_thumb.avif"
 */
export function getThumbnailUrl(src: string): string {
  if (!src) return "";
  if (src.includes("internship_len_itdev_6months.avif")) {
    return "/imgOrIcon/internship_thumb.avif";
  }
  if (src.includes("_content1.avif")) {
    return src.replace("_content1.avif", "_thumb.avif");
  }
  return src.replace(/\.([a-zA-Z0-9]+)$/, "_thumb.$1");
}
