/**
 * Image configuration for thumbnail and full-size images
 * Cloudinary uses transformation parameters in the URL format:
 * https://res.cloudinary.com/{cloud_name}/image/upload/c_fill,h_{height},w_{width},q_{quality}/{public_id}
 */

export const IMAGE_SIZES = {
  // Thumbnail for book grid cards
  thumbnail: {
    width: 300,
    height: 450,
    quality: 75, // 0-100, lower = smaller file size
  },
  // Full-size for detail page and gallery
  fullSize: {
    width: 600,
    height: 900,
    quality: 85,
  },
  // Small thumbnail for image gallery thumbnails
  galleryThumbnail: {
    width: 150,
    height: 225,
    quality: 70,
  },
};

/**
 * Transform a Cloudinary URL to add image optimization parameters
 * @param url - Original image URL
 * @param size - Size preset from IMAGE_SIZES
 * @returns Transformed URL with optimization parameters
 */
export function getOptimizedImageUrl(
  url: string,
  size: 'thumbnail' | 'fullSize' | 'galleryThumbnail' = 'thumbnail'
): string {
  // Only transform Cloudinary URLs
  if (!url.includes('res.cloudinary.com')) {
    return url;
  }

  const config = IMAGE_SIZES[size];
  
  // Cloudinary transformation format:
  // https://res.cloudinary.com/cloud_name/image/upload/[transformations]/public_id.jpg
  // We need to insert the transformations after "/upload/"
  
  const cloudinaryRegex = /^(https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload)\/(.*)/;
  const match = url.match(cloudinaryRegex);
  
  if (!match) {
    return url; // Return original if not a standard Cloudinary URL
  }

  const [, baseUrl, publicId] = match;
  
  // Build transformation string
  // c_fill = crop to fill, h_X = height, w_X = width, q_X = quality, f_auto = auto format
  const transformation = `c_fill,h_${config.height},w_${config.width},q_${config.quality},f_auto`;
  
  return `${baseUrl}/${transformation}/${publicId}`;
}
