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
                    <div className="max-w-3xl mx-auto text-center animate-on-scroll">
                        <span className="inline-block px-4 py-1.5 mb-5 rounded-full bg-white/80 backdrop-blur-md border border-[#e0e4ff] shadow-sm">
                            <span className="text-sm font-medium text-[#2E6BF5]">🎯 {t('badge_join_waitlist')}</span>
                        </span>
                        <h2 className="mb-6">{t('cta_title', 'Ready to Transform Your Content Creation?')}</h2>
                        <p className="text-lg mb-8 opacity-80 max-w-xl mx-auto">
                            {t('cta_subtitle', 'Join our waitlist to be notified when we launch and get exclusive early access benefits.')}
                        </p>

                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4 justify-center"
                        >
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={t('cta_email_placeholder', 'Enter your email')}
                                className="flex-1 px-6 py-2 rounded-md border border-black/10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary min-w-[320px] sm:min-w-[380px] disabled:opacity-50 disabled:cursor-not-allowed"
                                required
                                disabled={loading}
                            />
                            <Button
                                type="submit"
                                disabled={loading || !email.trim()}
                                className="bg-primary hover:bg-primary/90 text-white font-medium py-5 px-6 rounded-md transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {loading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        {t('cta_submitting', 'Joining...')}
                                    </div>
                                ) : (
                                    t('cta_button')
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
