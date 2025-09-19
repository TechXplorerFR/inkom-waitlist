import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export default function LogoCloud() {
    const { t } = useTranslation();
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Companies logos - normally these would be images, using SVGs for the example
    const logos = [
        {
            name: t('logo_company_one', 'Company One'),
            svg: (
                <svg xmlns="http://www.w3.org/2000/svg" width="120" height="40" viewBox="0 0 120 40" fill="none">
                    <path d="M20 10H10C6.68629 10 4 12.6863 4 16V24C4 27.3137 6.68629 30 10 30H20C23.3137 30 26 27.3137 26 24V16C26 12.6863 23.3137 10 20 10Z" stroke="currentColor" strokeWidth="2" />
                    <path d="M36 10H46C49.3137 10 52 12.6863 52 16V24C52 27.3137 49.3137 30 46 30H36C32.6863 30 30 27.3137 30 24V16C30 12.6863 32.6863 10 36 10Z" stroke="currentColor" strokeWidth="2" />
                    <path d="M62 10H72C75.3137 10 78 12.6863 78 16V24C78 27.3137 75.3137 30 72 30H62C58.6863 30 56 27.3137 56 24V16C56 12.6863 58.6863 10 62 10Z" stroke="currentColor" strokeWidth="2" />
                    <path d="M88 10H98C101.314 10 104 12.6863 104 16V24C104 27.3137 101.314 30 98 30H88C84.6863 30 82 27.3137 82 24V16C82 12.6863 84.6863 10 88 10Z" stroke="currentColor" strokeWidth="2" />
                    <path d="M15 20H20" stroke="currentColor" strokeWidth="2" />
                    <path d="M41 20H41.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M67 15V25" stroke="currentColor" strokeWidth="2" />
                    <path d="M93 15L93 25" stroke="currentColor" strokeWidth="2" />
                    <path d="M88 20H98" stroke="currentColor" strokeWidth="2" />
                </svg>
            )
        },
        {
            name: t('logo_company_two', 'Company Two'),
            svg: (
                <svg xmlns="http://www.w3.org/2000/svg" width="120" height="40" viewBox="0 0 120 40" fill="none">
                    <circle cx="20" cy="20" r="10" stroke="currentColor" strokeWidth="2" />
                    <rect x="35" y="10" width="20" height="20" stroke="currentColor" strokeWidth="2" />
                    <path d="M80 10L65 30" stroke="currentColor" strokeWidth="2" />
                    <path d="M65 10L80 30" stroke="currentColor" strokeWidth="2" />
                    <path d="M85 20H105" stroke="currentColor" strokeWidth="2" />
                    <path d="M95 10V30" stroke="currentColor" strokeWidth="2" />
                </svg>
            )
        },
        {
            name: t('logo_company_three', 'Company Three'),
            svg: (
                <svg xmlns="http://www.w3.org/2000/svg" width="120" height="40" viewBox="0 0 120 40" fill="none">
                    <path d="M10 20C10 14.4772 14.4772 10 20 10C25.5228 10 30 14.4772 30 20C30 25.5228 25.5228 30 20 30C14.4772 30 10 25.5228 10 20Z" stroke="currentColor" strokeWidth="2" />
                    <path d="M40 30L60 10" stroke="currentColor" strokeWidth="2" />
                    <path d="M60 30L40 10" stroke="currentColor" strokeWidth="2" />
                    <rect x="70" y="10" width="20" height="20" rx="10" stroke="currentColor" strokeWidth="2" />
                    <path d="M95 10V30" stroke="currentColor" strokeWidth="2" />
                    <path d="M105 10V30" stroke="currentColor" strokeWidth="2" />
                    <path d="M95 20H105" stroke="currentColor" strokeWidth="2" />
                </svg>
            )
        },
        {
            name: t('logo_company_four', 'Company Four'),
            svg: (
                <svg xmlns="http://www.w3.org/2000/svg" width="120" height="40" viewBox="0 0 120 40" fill="none">
                    <rect x="10" y="10" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="2" />
                    <circle cx="50" cy="20" r="10" stroke="currentColor" strokeWidth="2" />
                    <path d="M70 30V10L90 20L70 30Z" stroke="currentColor" strokeWidth="2" />
                    <path d="M100 10H110C110 10 110 15 110 20C110 25 110 30 110 30H100" stroke="currentColor" strokeWidth="2" />
                </svg>
            )
        },
        {
            name: "Company Five",
            svg: (
                <svg xmlns="http://www.w3.org/2000/svg" width="120" height="40" viewBox="0 0 120 40" fill="none">
                    <circle cx="20" cy="20" r="10" stroke="currentColor" strokeWidth="2" />
                    <path d="M40 10H60V30H40V10Z" stroke="currentColor" strokeWidth="2" />
                    <path d="M70 10H90V30" stroke="currentColor" strokeWidth="2" />
                    <path d="M70 20H90" stroke="currentColor" strokeWidth="2" />
                    <path d="M100 10V30" stroke="currentColor" strokeWidth="2" />
                    <path d="M100 10H110" stroke="currentColor" strokeWidth="2" />
                    <path d="M100 20H108" stroke="currentColor" strokeWidth="2" />
                    <path d="M100 30H110" stroke="currentColor" strokeWidth="2" />
                </svg>
            )
        },
        {
            name: "Company Six",
            svg: (
                <svg xmlns="http://www.w3.org/2000/svg" width="120" height="40" viewBox="0 0 120 40" fill="none">
                    <path d="M5 20H25" stroke="currentColor" strokeWidth="2" />
                    <path d="M15 10V30" stroke="currentColor" strokeWidth="2" />
                    <path d="M35 30L55 10" stroke="currentColor" strokeWidth="2" />
                    <path d="M35 10L55 30" stroke="currentColor" strokeWidth="2" />
                    <path d="M65 10H85V30H65V10Z" stroke="currentColor" strokeWidth="2" />
                    <path d="M105 10C105 10 95 10 95 20C95 30 105 30 105 30" stroke="currentColor" strokeWidth="2" />
                </svg>
            )
        }
    ];

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (!scrollContainer) return;

        // Create clone of the first set of logos for smooth infinite scroll
        const firstSet = scrollContainer.querySelector('.logo-set');
        if (!firstSet) return;

        let animationId: number;
        let scrollPosition = 0;
        const scrollSpeed = 0.5; // Adjust speed as needed

        const scroll = () => {
            if (!scrollContainer) return;

            scrollPosition += scrollSpeed;

            // Reset position when the first set is completely scrolled
            if (scrollPosition >= firstSet.clientWidth) {
                scrollPosition = 0;
            }

            scrollContainer.scrollLeft = scrollPosition;
            animationId = requestAnimationFrame(scroll);
        };

        animationId = requestAnimationFrame(scroll);

        return () => {
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <section className="bg-white py-12 md:py-16 overflow-hidden">
            <div className="container">
                <p className="text-center text-sm uppercase tracking-wider text-foreground/50 mb-8">
                    {t('trusted_by', 'Trusted by leading innovative companies')}
                </p>

                <div className="relative w-full overflow-hidden">
                    <div
                        ref={scrollContainerRef}
                        className="flex overflow-x-hidden"
                    >
                        <div className="flex space-x-12 items-center opacity-80 logo-set">
                            {logos.map((logo, index) => (
                                <div key={index} className="flex-shrink-0 text-foreground/70">
                                    {logo.svg}
                                </div>
                            ))}
                        </div>

                        {/* Duplicate logos for seamless infinite scroll */}
                        <div className="flex space-x-12 items-center opacity-80 logo-set">
                            {logos.map((logo, index) => (
                                <div key={`dup-${index}`} className="flex-shrink-0 text-foreground/70">
                                    {logo.svg}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}