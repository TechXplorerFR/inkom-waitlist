import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { trackFeatureClick } from '../lib/analytics';

export default function Features() {

    const { t } = useTranslation();
    // Refs for parallax effect elements
    const featuresBgRef = useRef<HTMLDivElement>(null);

    // Parallax effect on section background
    useEffect(() => {
        const handleScroll = () => {
            if (!featuresBgRef.current) return;

            const scrollY = window.scrollY;
            const sectionTop = featuresBgRef.current.offsetTop;
            const distance = scrollY - sectionTop;

            // Only apply effect when section is in view
            if (distance > -window.innerHeight && distance < window.innerHeight) {
                const blobs = featuresBgRef.current.querySelectorAll('.blob');
                blobs.forEach((blob, index) => {
                    // Different speed for each blob
                    const speed = 0.05 + (index * 0.02);
                    const yPos = distance * speed;
                    (blob as HTMLElement).style.transform = `translateY(${yPos}px)`;
                });
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const features = [
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <path d="M12 17h.01"></path>
                </svg>
            ),
            title: t('features_1_title', 'AI-Powered Content'),
            description: t('features_1_desc', 'Generate high-quality blog posts, social media content, and marketing copy with cutting-edge AI models.'),
            color: "#2E6BF5"
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m12 14 4-4"></path>
                    <path d="M3.34 19a10 10 0 1 1 17.32 0"></path>
                    <path d="M12 14v7"></path>
                </svg>
            ),
            title: t('features_2_title', 'Smart Automation'),
            description: t('features_2_desc', 'Set up workflows that automatically create and distribute content across all your channels.'),
            color: "#2E6BF5"
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
            ),
            title: t('features_3_title', 'Ad Campaign Manager'),
            description: t('features_3_desc', 'Create, optimize, and monitor your advertising campaigns across multiple platforms from a single dashboard.'),
            color: "#2e6bf5"
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3v18h18"></path>
                    <path d="m19 9-5 5-4-4-3 3"></path>
                </svg>
            ),
            title: t('features_4_title', 'Analytics Dashboard'),
            description: t('features_4_desc', 'Track performance metrics and get actionable insights to optimize your content strategy.'),
            color: "#2E6BF5"
        }
    ]

    return (
        <section className="relative py-20 overflow-hidden" id="features" ref={featuresBgRef}>
            {/* Blob background decorations */}
            <div className="absolute inset-0 overflow-hidden -z-10">
                <div className="blob absolute top-[10%] left-[5%] w-[300px] h-[300px] bg-[#e2e6ff]/30 rounded-full blur-[80px] animate-blob"></div>
                <div className="blob absolute bottom-[20%] right-[10%] w-[350px] h-[350px] bg-[#d5dfff]/20 rounded-full blur-[100px] animate-blob" style={{ animationDelay: "2s" }}></div>
                <div className="blob absolute top-[50%] right-[25%] w-[200px] h-[200px] bg-[#e9ecff]/25 rounded-full blur-[60px] animate-blob" style={{ animationDelay: "4s" }}></div>
            </div>

            <div className="container relative">
                <div className="max-w-2xl mx-auto text-center mb-16 md:mb-20 animate-on-scroll">
                    <span className="inline-block px-4 py-1.5 mb-5 rounded-full bg-white/80 backdrop-blur-md border border-[#e0e4ff] shadow-sm">
                        <span className="text-sm font-medium text-[#2E6BF5]">⚙️ Feature-rich Platform</span>
                    </span>

                    <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#2e6bf5] to-[#7048e8] animate-gradient">
                        {t('features_title')}
                    </h2>

                    <p className="text-lg text-gray-600 max-w-lg mx-auto">
                        Our platform combines advanced AI with intuitive workflows to help you create, manage, and distribute content with minimal effort.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="relative bg-white/80 backdrop-blur-md p-7 rounded-xl shadow-lg border border-white/40 hover:shadow-xl hover:transform hover:-translate-y-1 transition-all duration-300 animate-on-scroll group cursor-pointer"
                            style={{ animationDelay: `${index * 100}ms` }}
                            onClick={() => trackFeatureClick(feature.title)}
                        >
                            <div
                                className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-xl"
                                style={{ backgroundImage: `linear-gradient(to bottom right, ${feature.color}, #ffffff)` }}
                            ></div>

                            <div
                                className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-5 text-white"
                                style={{ backgroundColor: feature.color }}
                            >
                                {feature.icon}
                            </div>

                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>

                            {/* Subtle highlight line on hover */}
                            <div className="absolute bottom-0 left-0 w-0 h-1 group-hover:w-full transition-all duration-300 rounded-b-xl" style={{ backgroundColor: feature.color }}></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Curved divider to next section */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 text-secondary/10">
                    <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" fill="currentColor"></path>
                </svg>
            </div>
        </section>
    );
}