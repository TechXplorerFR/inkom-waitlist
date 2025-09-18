import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"

export default function Header() {
    const [scrolled, setScrolled] = useState(false)
    const { t } = useTranslation()

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [scrolled])

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
            ? 'bg-white text-gray-800 shadow-lg'
            : 'bg-white text-gray-800 shadow-md'
            }`}>
            <div className="container flex items-center justify-between h-16 md:h-20">
                <div className="flex items-center">
                    <a href="#" className="flex items-center">
                        <img src="/assets/images/inkom.svg" alt="inkom" className="h-12" />
                    </a>

                    <div className="border-l border-gray-200 h-6 mx-4 hidden lg:block"></div>

                    <nav className="hidden lg:flex items-center space-x-6">
                        <a href="#features" className="text-sm font-medium text-gray-700 hover:text-[#4361ee] transition-colors">{t('nav_features')}</a>
                        <a href="#supported-platforms" className="text-sm font-medium text-gray-700 hover:text-[#4361ee] transition-colors">{t('nav_platforms')}</a>
                        <a href="#content-roadmap" className="text-sm font-medium text-gray-700 hover:text-[#4361ee] transition-colors">{t('nav_process')}</a>
                        <a href="#how-it-works" className="text-sm font-medium text-gray-700 hover:text-[#4361ee] transition-colors">{t('nav_how_it_works')}</a>
                        <a href="#testimonials" className="text-sm font-medium text-gray-700 hover:text-[#4361ee] transition-colors">{t('nav_testimonials')}</a>
                    </nav>
                </div>

                <div className="flex items-center space-x-4">
                    {/* <Button 
            variant="ghost" 
            size="sm" 
            className="hidden md:inline-flex text-gray-700 hover:bg-gray-100 hover:text-gray-900 border border-gray-200"
          >
            Log in
          </Button> */}
                    <Button
                        variant="default"
                        size="sm"
                        className="bg-[#4361ee] text-white hover:bg-[#4361ee]/90 shadow-md shadow-[#4361ee]/20"
                    >
                        {t('cta_button')}
                    </Button>
                </div>
            </div>
        </header>
    )
}