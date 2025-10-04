import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  locale?: string;
  noindex?: boolean;
}

export default function SEO({
  title = 'Inkom - AI-Powered Content Automation for Small Businesses',
  description = 'Delegate and automate content creation using AI and automation tools for small businesses and entrepreneurs worldwide. Join our waitlist for early access.',
  keywords = 'AI content automation, small business, entrepreneurs, content creation, social media automation, marketing automation, AI tools',
  image = 'https://inkom.ai/assets/images/inkom-og-image.png',
  url,
  type = 'website',
  author = 'Inkom',
  publishedTime,
  modifiedTime,
  locale = 'en_US',
  noindex = false,
}: SEOProps) {
  const location = useLocation();
  const currentUrl = url || `https://inkom.ai${location.pathname}`;

  useEffect(() => {
    // Update document title
    document.title = title;

    // Function to update or create meta tag
    const updateMetaTag = (name: string, content: string, property = false) => {
      const attribute = property ? 'property' : 'name';
      let tag = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, name);
        document.head.appendChild(tag);
      }
      
      tag.setAttribute('content', content);
    };

    // Update basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', author);
    updateMetaTag('robots', noindex ? 'noindex, nofollow' : 'index, follow');

    // Update Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', currentUrl, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:locale', locale, true);
    updateMetaTag('og:site_name', 'Inkom', true);

    // Update Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image', true);
    updateMetaTag('twitter:title', title, true);
    updateMetaTag('twitter:description', description, true);
    updateMetaTag('twitter:image', image, true);
    updateMetaTag('twitter:url', currentUrl, true);

    // Update canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', currentUrl);

    // Update article meta tags if provided
    if (publishedTime) {
      updateMetaTag('article:published_time', publishedTime, true);
    }
    if (modifiedTime) {
      updateMetaTag('article:modified_time', modifiedTime, true);
    }

    // Update structured data for current page
    const updateStructuredData = () => {
      const existingScript = document.querySelector('script[type="application/ld+json"]#page-schema');
      if (existingScript) {
        existingScript.remove();
      }

      const structuredData = {
        '@context': 'https://schema.org',
        '@type': type === 'article' ? 'Article' : 'WebPage',
        name: title,
        description: description,
        url: currentUrl,
        image: image,
        author: {
          '@type': 'Organization',
          name: author,
          url: 'https://inkom.ai'
        },
        publisher: {
          '@type': 'Organization',
          name: 'Inkom',
          url: 'https://inkom.ai',
          logo: {
            '@type': 'ImageObject',
            url: 'https://inkom.ai/assets/images/inkom256.png'
          }
        },
        ...(publishedTime && { datePublished: publishedTime }),
        ...(modifiedTime && { dateModified: modifiedTime }),
      };

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'page-schema';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    };

    updateStructuredData();

  }, [title, description, keywords, image, currentUrl, type, author, publishedTime, modifiedTime, locale, noindex]);

  return null; // This component doesn't render anything
}

// Pre-configured SEO components for different page types
export const HomeSEO = () => (
  <SEO
    title="Inkom - AI-Powered Content Automation for Small Businesses"
    description="Delegate and automate content creation using AI and automation tools for small businesses and entrepreneurs worldwide. Join our waitlist for early access."
    keywords="AI content automation, small business, entrepreneurs, content creation, social media automation, marketing automation, AI tools, waitlist"
  />
);

export const PrivacySEO = () => (
  <SEO
    title="Privacy Policy - Inkom"
    description="Learn how Inkom protects your privacy and handles your personal data. Read our comprehensive privacy policy for AI-powered content automation."
    keywords="privacy policy, data protection, GDPR, personal information, Inkom"
    type="article"
  />
);

export const TermsSEO = () => (
  <SEO
    title="Terms of Service - Inkom"
    description="Read Inkom's terms of service for our AI-powered content automation platform. Understand your rights and responsibilities."
    keywords="terms of service, user agreement, legal terms, Inkom"
    type="article"
  />
);

export const LegalSEO = () => (
  <SEO
    title="Legal Mentions - Inkom"
    description="Legal information and company details for Inkom, the AI-powered content automation platform."
    keywords="legal mentions, company information, legal notices, Inkom"
    type="article"
  />
);