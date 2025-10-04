// Email icon URLs configuration
// These should be hosted on a reliable CDN or your domain

export const emailIconUrls = {
  // Social media icons
  twitter: 'https://inkom.ai/assets/images/socials/twitter.svg',
  linkedin: 'https://inkom.ai/assets/images/socials/linkedin.svg',
  instagram: 'https://inkom.ai/assets/images/socials/instagram.svg',

  // Feature icons
  coaching: 'https://inkom.ai/assets/images/mails/coaching.svg',
  access: 'https://inkom.ai/assets/images/mails/access.svg',
  discount: 'https://inkom.ai/assets/images/mails/discount.svg',
  guide: 'https://inkom.ai/assets/images/mails/guide.svg',
  vip: 'https://inkom.ai/assets/images/mails/vip.svg',
  community: 'https://inkom.ai/assets/images/mails/community.svg',
  
  // Main logo
  logo: 'https://inkom.ai/assets/images/inkom.svg',
  
  // Fallback: transparent 1x1 pixel for when images don't load
  fallback: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
};

// Utility function to create email-safe image tags
export const createEmailImage = (
  src: string, 
  alt: string, 
  width: number = 24, 
  height: number = 24,
  style: string = ''
): string => {
  return `<img src="${src}" alt="${alt}" width="${width}" height="${height}" style="display: block; border: 0; ${style}" />`;
};

// Pre-built icon components for emails
// export const emailIcons = {
//   coaching: createEmailImage(emailIconUrls.coaching, 'Personal Coaching', 36, 36, 'margin-bottom: 8px;'),
//   access: createEmailImage(emailIconUrls.access, 'Beta Access', 36, 36, 'margin-bottom: 8px;'),
//   discount: createEmailImage(emailIconUrls.discount, 'Discount', 36, 36, 'margin-bottom: 8px;'),
//   guide: createEmailImage(emailIconUrls.guide, 'Exclusive Guide', 36, 36, 'margin-bottom: 8px;'),
//   vip: createEmailImage(emailIconUrls.vip, 'VIP Access', 36, 36, 'margin-bottom: 8px;'),
//   community: createEmailImage(emailIconUrls.community, 'Elite Community', 36, 36, 'margin-bottom: 8px;'),
  
//   // Social media icons (smaller)
//   twitter: createEmailImage(emailIconUrls.twitter, 'Twitter', 24, 24, 'fill: #2e6bf5;'),
//   linkedin: createEmailImage(emailIconUrls.linkedin, 'LinkedIn', 24, 24, 'fill: #2e6bf5;'),
//   instagram: createEmailImage(emailIconUrls.instagram, 'Instagram', 24, 24, 'fill: #2e6bf5;'),
// };