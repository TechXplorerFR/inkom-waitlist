import { useTranslation } from 'react-i18next';
import { trackEvent } from '../lib/analytics';

export default function WaitlistBenefits() {
    const { t } = useTranslation();

    const benefits = [
        {
            icon: "🎓",
            title: t('benefit_coaching_title', '3 Hours of Free Personal 1:1 Coaching'),
            description: t('benefit_coaching_desc', 'Individual training session with our experts to optimize your communication strategy and maximize Inkom\'s efficiency for your business.'),
            value: "€300",
            gradient: "from-[#4361ee] to-[#7048e8]"
        },
        {
            icon: "✅",
            title: t('benefit_beta_title', 'Complete Free Access During Beta'),
            description: t('benefit_beta_desc', 'Test all premium Inkom features for free during the entire beta period. No limitations, full access to the platform.'),
            value: "€200/mois",
            gradient: "from-[#2ECC71] to-[#27AE60]"
        },
        {
            icon: "💰",
            title: t('benefit_discount_title', '60% Discount on Subscription for 6 Months'),
            description: t('benefit_discount_desc', 'Save significantly with our exclusive preferential rate for early adopters. Savings of several hundred euros.'),
            value: "€600",
            gradient: "from-[#F39C12] to-[#E67E22]"
        },
        {
            icon: "📚",
            title: t('benefit_guide_title', 'Exclusive Practical Guide of All Features'),
            description: t('benefit_guide_desc', 'Complete manual and exclusive resources to quickly master all Inkom capabilities and optimize your ROI from day one.'),
            value: "€150",
            gradient: "from-[#9B59B6] to-[#8E44AD]"
        },
        {
            icon: "⚡",
            title: t('benefit_vip_title', 'VIP Priority Access to New Features'),
            description: t('benefit_vip_desc', 'Be the first to test and use each new feature before public release. Your feedback shapes Inkom\'s future.'),
            value: "Invaluable",
            gradient: "from-[#E74C3C] to-[#C0392B]"
        },
        {
            icon: "👥",
            title: t('benefit_community_title', 'Exclusive Early Adopters Community'),
            description: t('benefit_community_desc', 'Join a private group of visionary entrepreneurs, exchange strategies and benefit from privileged support from our team.'),
            value: "Invaluable",
            gradient: "from-[#3498DB] to-[#2980B9]"
        }
    ];

    const handleBenefitClick = (benefitTitle: string) => {
        trackEvent('benefit_click', { 
            event_category: 'waitlist', 
            event_label: benefitTitle.toLowerCase().replace(/\s+/g, '_') 
        });
    };

    return (
        <section className="py-20 bg-gradient-to-br from-[#f8f9ff] to-[#e9ecff] relative overflow-hidden" id="waitlist-benefits">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden -z-10">
                <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] bg-[#4361ee]/5 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[30%] right-[15%] w-[250px] h-[250px] bg-[#7048e8]/5 rounded-full blur-[80px]"></div>
            </div>

            <div className="container relative">
                <div className="max-w-4xl mx-auto text-center mb-16 animate-on-scroll">
                    <span className="inline-block px-4 py-1.5 mb-5 rounded-full bg-white/80 backdrop-blur-md border border-[#e0e4ff] shadow-sm">
                        <span className="text-sm font-medium text-[#2E6BF5]">🎁 {t('badge_join_waitlist')}</span>
                    </span>

                    <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#2e6bf5] to-[#7048e8]">
                        {t('waitlist_benefits_title', 'Why Join the Waitlist Now?')}
                    </h2>

                    <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                        {t('waitlist_benefits_subtitle', 'Don\'t miss these exclusive benefits reserved for early adopters')}
                    </p>

                    {/* Total Value Badge */}
                    <div className="inline-flex items-center bg-gradient-to-r from-[#4361ee] to-[#7048e8] text-white px-6 py-3 rounded-full font-semibold text-lg shadow-lg shadow-[#4361ee]/25 mb-12">
                        <span className="mr-2">💎</span>
                        Total value: €1,250+ + Invaluable perks
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="group bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/40 hover:shadow-2xl hover:transform hover:-translate-y-2 transition-all duration-500 animate-on-scroll cursor-pointer relative overflow-hidden"
                            style={{ animationDelay: `${index * 100}ms` }}
                            onClick={() => handleBenefitClick(benefit.title)}
                        >
                            {/* Gradient overlay on hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}></div>
                            
                            {/* Value badge */}
                            <div className="absolute top-4 right-4 bg-gradient-to-r from-[#F39C12] to-[#E67E22] text-white px-3 py-1 rounded-full text-xs font-bold">
                                {benefit.value}
                            </div>

                            <div className="relative z-10">
                                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 text-white bg-gradient-to-br ${benefit.gradient} group-hover:scale-110 transition-transform duration-300`}>
                                    <span className="text-2xl">{benefit.icon}</span>
                                </div>

                                <h3 className="text-xl font-bold mb-4 text-[#1a1a2e] group-hover:text-[#4361ee] transition-colors">
                                    {benefit.title}
                                </h3>

                                <p className="text-gray-600 leading-relaxed text-sm">
                                    {benefit.description}
                                </p>

                                {/* Subtle highlight line on hover */}
                                <div className={`absolute bottom-0 left-0 w-0 h-1 group-hover:w-full transition-all duration-500 rounded-b-2xl bg-gradient-to-r ${benefit.gradient}`}></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Urgency and CTA section */}
                <div className="max-w-2xl mx-auto text-center animate-on-scroll">
                    <div className="bg-gradient-to-r from-[#FFF3CD] to-[#FFE5B3] border border-[#FFE5B3] rounded-2xl p-6 mb-8">
                        <div className="flex items-center justify-center mb-4">
                            <span className="text-2xl mr-3">⚠️</span>
                            <h3 className="text-xl font-bold text-[#856404]">
                                {t('waitlist_urgency', 'Limited spots available for private beta')}
                            </h3>
                        </div>
                        <p className="text-[#856404] text-sm">
                            Seules les 500 premières inscriptions bénéficieront de tous ces avantages exclusifs. Ne laissez pas passer cette opportunité unique !
                        </p>
                    </div>

                    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/50">
                        <h3 className="text-2xl font-bold mb-4 text-[#1a1a2e]">
                            Prêt à sécuriser votre place ?
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Rejoignez dès maintenant notre liste d'attente exclusive et débloquez tous ces avantages incroyables.
                        </p>
                        <button
                            onClick={() => {
                                trackEvent('scroll_to_cta', { event_category: 'waitlist', event_label: 'benefits_section' });
                                document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="bg-gradient-to-r from-[#4361ee] to-[#7048e8] hover:from-[#3a56e6] hover:to-[#6441e2] text-white font-bold py-4 px-8 rounded-xl transition-all hover:scale-105 shadow-lg shadow-[#4361ee]/25"
                        >
                            🚀 Rejoindre la liste d'attente maintenant
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}