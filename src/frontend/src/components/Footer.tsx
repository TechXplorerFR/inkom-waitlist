import { useTranslation } from 'react-i18next';
import { trackSocialClick } from '../lib/analytics';

export default function Footer() {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();

    // Social media platforms
    const socialPlatforms = [
        {
            name: t('platform_x', 'x'),
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
            )
        },
        {
            name: t('platform_linkedin', 'LinkedIn'),
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                </svg>
            )
        },
        {
            name: t('platform_instagram', 'Instagram'),
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
            )
        },
        {
            name: t('platform_facebook', 'Facebook'),
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
            )
        },
        // {
        //   name: "GitHub",
        //   icon: (
        //     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        //       <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
        //       <path d="M9 18c-4.51 2-5-2-7-2"></path>
        //     </svg>
        //   )
        // }
    ];

    return (
        <footer className="bg-black text-white border-t border-white/10 py-12">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-2">
                        <a href="/" className="inline-block">
                            <img src="/assets/images/inkom-dark-theme.svg" alt="inkom" className="h-14" />
                        </a>
                        <p className="mt-4 text-sm text-gray-300 max-w-md">
                            {t('footer_desc', 'AI-powered content creation and automation for small businesses and entrepreneurs. Save time and scale your reach.')}
                        </p>

                        {/* Social links */}
                        <div className="flex flex-wrap gap-4 mt-6">
                            {socialPlatforms.map((platform, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="text-gray-400 hover:text-secondary transition-colors w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
                                    aria-label={platform.name}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        trackSocialClick(platform.name);
                                        // If these become real links, also use:
                                        // trackOutboundLink(href, platform.name);
                                    }}
                                >
                                    {platform.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wide mb-4 text-gray-300">{t('footer_brand', 'INKOM')}</h3>
                        <ul className="space-y-2">
                            <li><a href="#features" className="text-sm text-gray-400 hover:text-secondary transition-colors">{t('nav_features')}</a></li>
                            <li><a href="#how-it-works" className="text-sm text-gray-400 hover:text-secondary transition-colors">{t('nav_how_it_works')}</a></li>
                            <li><a href="#testimonials" className="text-sm text-gray-400 hover:text-secondary transition-colors">{t('nav_testimonials')}</a></li>
                            <li><a href="#supported-platforms" className="text-sm text-gray-400 hover:text-secondary transition-colors">{t('nav_platforms')}</a></li>
                            {/* <li><a href="#cta" className="text-sm text-gray-400 hover:text-secondary transition-colors">Pricing</a></li> */}
                        </ul>
                    </div>

                        {/* <div>
                            <h3 className="text-sm font-semibold uppercase tracking-wide mb-4 text-gray-300">{t('footer_company', 'Company')}</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-sm text-gray-400 hover:text-secondary transition-colors">{t('footer_about_us', 'About Us')}</a></li>
                                <li><a href="#" className="text-sm text-gray-400 hover:text-secondary transition-colors">{t('footer_blog', 'Blog')}</a></li>
                                <li><a href="#" className="text-sm text-gray-400 hover:text-secondary transition-colors">{t('footer_privacy_policy', 'Privacy Policy')}</a></li>
                                <li><a href="#" className="text-sm text-gray-400 hover:text-secondary transition-colors">{t('footer_terms_of_service', 'Terms of Service')}</a></li>
                            </ul>
                        </div> */}
                </div>

                <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-gray-500 mb-4 md:mb-0">
                        © {currentYear} Inkom. {t('footer_text')}
                    </p>

                    <div className="flex space-x-6">
                        <a href="/privacy" className="text-sm text-gray-400 hover:text-secondary transition-colors">{t('privacy.title')}</a>
                        <a href="/terms" className="text-sm text-gray-400 hover:text-secondary transition-colors">{t('terms.title')}</a>
                        <a href="/legal" className="text-sm text-gray-400 hover:text-secondary transition-colors">{t('legal.title')}</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}