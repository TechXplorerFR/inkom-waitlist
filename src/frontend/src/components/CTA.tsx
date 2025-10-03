import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, X } from "lucide-react";
import { useState, useEffect } from "react"
import { useTranslation } from 'react-i18next';
import { trackWaitlistSignup, trackError } from '../lib/analytics';

interface ApiResponse {
    success: boolean;
    message: string;
    data?: unknown;
}

export default function CTA() {
    const { t } = useTranslation();
    const [email, setEmail] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [showSuccess, setShowSuccess] = useState(false)
    const [showError, setShowError] = useState(false)

    // Fade in/out and auto-dismiss for alerts
    // Success
    useEffect(() => {
        if (submitted) {
            setShowSuccess(true);
            const timer = setTimeout(() => {
                setShowSuccess(false);
                setSubmitted(false);
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [submitted]);

    // Error
    useEffect(() => {
        if (error) {
            setShowError(true);
            const timer = setTimeout(() => {
                setShowError(false);
                setError(null);
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email || loading) return

        setLoading(true)
        setError(null)

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
            const response = await fetch(`${apiUrl}/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email.trim() }),
            });

            const data: ApiResponse = await response.json();

            if (data.success) {
                // Track successful waitlist signup
                trackWaitlistSignup(email.trim())
                
                // Show success state
                setSubmitted(true)
                setEmail("")
                
                // Reset success message after 5 seconds
                setTimeout(() => {
                    setSubmitted(false)
                }, 5000)
            } else {
                // Track error
                trackError(`Waitlist signup failed: ${data.message}`, 'warning')
                // Show error message
                setError(data.message || 'Something went wrong. Please try again.')
            }
        } catch (err) {
            console.error('Registration error:', err)
            // Track network error
            trackError(`Waitlist signup network error: ${err}`, 'error')
            setError('Network error. Please check your connection and try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
         <>
            {/* ✅ Alerts are now rendered outside the CTA section so they're fixed to the viewport */}
            {showSuccess && (
                <div className="fixed top-24 right-4 z-[9999] max-w-sm transition-opacity duration-500" style={{ opacity: showSuccess ? 1 : 0 }}>
                    <Alert className="bg-green-50 border-green-200 shadow-lg relative">
                        <CheckCircle className="h-4 w-4" />
                        <AlertDescription className="pr-8">
                            <p className="font-medium" style={{ fontSize: '13px', color: '#14532d' }}>
                                {t('cta_success', "Thank you! You've been added to our waitlist.")}
                            </p>
                            <p className="mt-1 opacity-80" style={{ fontSize: '12px', color: '#14532d' }}>
                                {t('cta_success_details', 'Check your email for a welcome message with more details.')}
                            </p>
                        </AlertDescription>
                        <button
                            onClick={() => { setShowSuccess(false); setSubmitted(false); }}
                            className="absolute top-2 right-2 p-1 text-[#14532d] hover:text-green-900 transition-colors"
                            aria-label="Close"
                        >
                            <X className="h-3 w-3" />
                        </button>
                    </Alert>
                </div>
            )}

            {showError && (
                <div className="fixed top-24 right-4 z-[9999] max-w-sm transition-opacity duration-500" style={{ opacity: showError ? 1 : 0 }}>
                    <Alert className="bg-red-50 border-red-200 shadow-lg relative">
                        <AlertDescription className="pr-8">
                            <p className="font-medium" style={{ fontSize: '13px', color: '#7f1d1d' }}>{error}</p>
                        </AlertDescription>
                        <button
                            onClick={() => { setShowError(false); setError(null); }}
                            className="absolute top-2 right-2 p-1 text-[#7f1d1d] hover:text-red-900 transition-colors"
                            aria-label="Close"
                        >
                            <X className="h-3 w-3" />
                        </button>
                    </Alert>
                </div>
            )}

            {/* CTA Section */}
            <section className="bg-white relative" id="cta">
                <div className="container">
                    <div className="max-w-4xl mx-auto text-center animate-on-scroll">
                        <span className="inline-block px-4 py-1.5 mb-5 rounded-full bg-white/80 backdrop-blur-md border border-[#e0e4ff] shadow-sm">
                            <span className="text-sm font-medium text-[#2E6BF5]">🎯 {t('badge_join_waitlist')}</span>
                        </span>
                        <h2 className="mb-6">{t('cta_title', 'Ready to Transform Your Content Creation?')}</h2>
                        <p className="text-lg mb-8 opacity-80 max-w-xl mx-auto">
                            {t('cta_subtitle', 'Join our waitlist to be notified when we launch and get exclusive early access benefits.')}
                        </p>
{/* 
                        <div className="mb-12">
                            <h3 className="text-xl font-semibold mb-6 text-[#1a1a2e]">
                                {t('waitlist_benefits_title', 'Why Join the Waitlist Now?')}
                            </h3>
                            <p className="text-sm text-gray-600 mb-8">
                                {t('waitlist_benefits_subtitle', 'Don\'t miss these exclusive benefits reserved for early adopters')}
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                               
                                <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/40 hover:shadow-xl transition-all duration-300 group">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[#4361ee] to-[#7048e8] rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                    <h4 className="font-semibold text-sm mb-2 text-[#1a1a2e]">
                                        {t('benefit_coaching_title', '3 Hours of Free Personal 1:1 Coaching')}
                                    </h4>
                                    <p className="text-xs text-gray-600 leading-relaxed">
                                        {t('benefit_coaching_desc', 'Individual training session with our experts to optimize your communication strategy.')}
                                    </p>
                                </div>

                                <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/40 hover:shadow-xl transition-all duration-300 group">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[#2ECC71] to-[#27AE60] rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h4 className="font-semibold text-sm mb-2 text-[#1a1a2e]">
                                        {t('benefit_beta_title', 'Complete Free Access During Beta')}
                                    </h4>
                                    <p className="text-xs text-gray-600 leading-relaxed">
                                        {t('benefit_beta_desc', 'Test all premium features for free during the entire beta period.')}
                                    </p>
                                </div>

                                <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/40 hover:shadow-xl transition-all duration-300 group">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[#F39C12] to-[#E67E22] rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                        </svg>
                                    </div>
                                    <h4 className="font-semibold text-sm mb-2 text-[#1a1a2e]">
                                        {t('benefit_discount_title', '60% Discount for 6 Months')}
                                    </h4>
                                    <p className="text-xs text-gray-600 leading-relaxed">
                                        {t('benefit_discount_desc', 'Save significantly with our exclusive early adopter rate.')}
                                    </p>
                                </div>

                                <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/40 hover:shadow-xl transition-all duration-300 group">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[#9B59B6] to-[#8E44AD] rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                    <h4 className="font-semibold text-sm mb-2 text-[#1a1a2e]">
                                        {t('benefit_guide_title', 'Exclusive Features Guide')}
                                    </h4>
                                    <p className="text-xs text-gray-600 leading-relaxed">
                                        {t('benefit_guide_desc', 'Complete manual to master all capabilities and optimize ROI.')}
                                    </p>
                                </div>

                                <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/40 hover:shadow-xl transition-all duration-300 group">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[#E74C3C] to-[#C0392B] rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <h4 className="font-semibold text-sm mb-2 text-[#1a1a2e]">
                                        {t('benefit_vip_title', 'VIP Priority Access')}
                                    </h4>
                                    <p className="text-xs text-gray-600 leading-relaxed">
                                        {t('benefit_vip_desc', 'First to test new features before public release.')}
                                    </p>
                                </div>

                                <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/40 hover:shadow-xl transition-all duration-300 group">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[#3498DB] to-[#2980B9] rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <h4 className="font-semibold text-sm mb-2 text-[#1a1a2e]">
                                        {t('benefit_community_title', 'Exclusive Community')}
                                    </h4>
                                    <p className="text-xs text-gray-600 leading-relaxed">
                                        {t('benefit_community_desc', 'Join visionary entrepreneurs and get privileged support.')}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-[#4361ee]/10 to-[#7048e8]/10 border border-[#4361ee]/20 rounded-lg p-4 mb-8">
                                <p className="text-sm font-medium text-[#4361ee]">
                                    ⚡ {t('waitlist_urgency', 'Limited spots available for private beta')}
                                </p>
                            </div>
                        </div> */}

                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4 justify-center"
                        >
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={t('cta_email_placeholder', 'Enter your email')}
                                className="flex-1 px-6 py-3 rounded-lg border border-black/10 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 min-w-[320px] sm:min-w-[380px] disabled:opacity-50 disabled:cursor-not-allowed text-base"
                                required
                                disabled={loading}
                            />
                            <Button
                                type="submit"
                                disabled={loading || !email.trim()}
                                className="bg-gradient-to-r from-[#4361ee] to-[#7048e8] hover:from-[#3a56e6] hover:to-[#6441e2] text-white font-semibold py-3 px-8 rounded-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-[#4361ee]/25"
                            >
                                {loading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        {t('cta_submitting', 'Joining...')}
                                    </div>
                                ) : (
                                    t('waitlist_cta_enhanced', 'Secure My Beta Spot')
                                )}
                            </Button>
                        </form>

                        <p className="text-xs opacity-60">
                            {t('cta_disclaimer', 'No spam, only launch updates. You can unsubscribe at any time.')}
                        </p>
                    </div>
                </div>

                {/* Background decorative elements */}
                <div className="absolute left-0 bottom-0 w-full h-1/2 overflow-hidden pointer-events-none -z-10">
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/5 rounded-full"></div>
                    <div className="absolute -bottom-5 right-1/4 w-20 h-20 bg-primary/5 rounded-full"></div>
                </div>
            </section>
        </>
    )
}
