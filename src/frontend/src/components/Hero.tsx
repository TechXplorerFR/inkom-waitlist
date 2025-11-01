import { Button } from "@/components/ui/button"
import { useEffect, useRef } from "react"
import { useTranslation } from 'react-i18next';

export default function Hero() {
    const { t } = useTranslation();
    const heroRef = useRef<HTMLDivElement>(null);
    const illustrationRef = useRef<HTMLDivElement>(null);

    // Parallax effect for the illustration
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!illustrationRef.current) return;

            const { clientX, clientY } = e;
            const x = (window.innerWidth / 2 - clientX) / 25;
            const y = (window.innerHeight / 2 - clientY) / 25;

            illustrationRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) rotateX(${y / 10}deg) rotateY(${-x / 10}deg)`;
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section
            className="relative pt-28 pb-24 md:pt-32 lg:pt-36 overflow-hidden bg-[#f8f9ff]"
            id="hero"
            ref={heroRef}
        >
            {/* Abstract shapes background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#e2e6ff] opacity-50 blur-[80px]"></div>
                <div className="absolute top-[60%] -right-[5%] w-[40%] h-[40%] rounded-full bg-[#d5dfff] opacity-40 blur-[60px]"></div>
                <div className="absolute top-[20%] left-[60%] w-[25%] h-[25%] rounded-full bg-[#e9ecff] opacity-60 blur-[50px]"></div>
            </div>

            <div className="container relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                    <div className="animate-on-scroll z-10 mt-6 md:mt-8 2xl:mt-0">
                        <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-white/80 backdrop-blur-md border border-[#e0e4ff] shadow-sm">
                            <span className="text-sm font-medium text-[#4361ee]">✨ {t('badge_ai_powered')}</span>
                        </span>
                        
                        <div className="inline-block mb-6">
                            <div className="px-4 py-2 rounded-full bg-gradient-to-r from-[#4361ee] to-[#7048e8] text-white shadow-lg shadow-[#4361ee]/25">
                                <span className="text-sm font-semibold">🚀 {t('launching_soon')}</span>
                            </div>
                        </div>

                        <h1 className="mb-6 font-extrabold text-4xl md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-br from-[#1a1a2e] to-[#4361ee]">
                            {t('hero_title')}
                        </h1>

                        <p className="text-lg md:text-xl mb-8 max-w-lg text-[#4a5568]">
                            {t('hero_subtitle')}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <Button
                                onClick={() => { window.location.href = '/#cta' }}
                                size="lg"
                                className="bg-[#4361ee] text-white hover:bg-[#3a56e6] hover:scale-105 hover:cursor-pointer transition-all shadow-lg shadow-[#4361ee]/20"
                            >
                                {t('cta_button')}
                            </Button>
                            <Button
                                onClick={() => { window.location.href = '/#how-it-works' }}
                                size="lg"
                                variant="outline"
                                className="border-[#4361ee] text-[#4361ee] hover:bg-[#4361ee]/5 transition-all hover:cursor-pointer"
                            >
                                {t('how_it_works_button')}
                            </Button>
                        </div>
                    </div>

                    {/* 3D Illustration area inspired by Notion/Affine */}
                    <div ref={illustrationRef} className="relative animate-on-scroll z-10 transition-transform duration-300 ease-out perspective-1000 hover:scale-105 hidden lg:block">
                        <div className="relative z-20">
                            {/* Main 3D illustration */}
                            <div className="relative w-full aspect-square max-w-md mx-auto">
                                {/* 3D Document/Page Stack */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    {/* Document Stack - layered for 3D effect */}
                                    <div className="relative w-3/4 h-4/5">
                                        {/* Base layer documents */}
                                        <div className="absolute top-0 left-0 w-full h-full bg-white rounded-lg shadow-xl transform rotate-6 translate-y-1 translate-x-2"></div>
                                        <div className="absolute top-0 left-0 w-full h-full bg-white rounded-lg shadow-xl transform rotate-3 translate-y-0.5 translate-x-1"></div>

                                        {/* Main document with content */}
                                        <div className="absolute top-0 left-0 w-full h-full bg-white rounded-lg shadow-xl p-4 flex flex-col">
                                            {/* Document UI elements */}
                                            <div className="flex items-center space-x-1 mb-2">
                                                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                            </div>

                                            {/* Content area with text and "image" */}
                                            <div className="flex-1 flex flex-col">
                                                <div className="w-3/4 h-3 bg-gray-300 rounded mb-2"></div>
                                                <div className="w-full h-3 bg-gray-300 rounded mb-2"></div>
                                                <div className="w-2/3 h-3 bg-gray-300 rounded mb-4"></div>

                                                <div className="w-full h-24 bg-[#e9ecff] rounded-md mb-3"></div>

                                                <div className="w-full h-3 bg-gray-300 rounded mb-2"></div>
                                                <div className="w-4/5 h-3 bg-gray-300 rounded mb-4"></div>

                                                {/* AI elements */}
                                                <div className="flex items-center space-x-2 mb-2">
                                                    <div className="w-6 h-6 rounded-full bg-[#4361ee] flex items-center justify-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                                                        </svg>
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="w-full h-2 bg-[#d5dfff] rounded"></div>
                                                        <div className="w-4/5 h-2 bg-[#d5dfff] rounded mt-1"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Floating elements */}
                                        <div className="absolute -top-6 -right-6 w-16 h-16 bg-[#4361ee] rounded-lg shadow-lg transform rotate-12 flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M9.504 1.132a1 1 0 01.992 0l1.75 1a1 1 0 11-.992 1.736L10 3.152l-1.254.716a1 1 0 11-.992-1.736l1.75-1zM5.618 4.504a1 1 0 01-.372 1.364L5.016 6l.23.132a1 1 0 11-.992 1.736L4 7.723V8a1 1 0 01-2 0V6a.996.996 0 01.52-.878l1.734-.99a1 1 0 011.364.372zm8.764 0a1 1 0 011.364-.372l1.733.99A1.002 1.002 0 0118 6v2a1 1 0 11-2 0v-.277l-.254.145a1 1 0 11-.992-1.736l.23-.132-.23-.132a1 1 0 01-.372-1.364zm-7 4a1 1 0 011.364-.372L10 8.848l1.254-.716a1 1 0 11.992 1.736L11 10.58V12a1 1 0 11-2 0v-1.42l-1.246-.712a1 1 0 01-.372-1.364zM3 11a1 1 0 011 1v1.42l1.246.712a1 1 0 11-.992 1.736l-1.75-1A1 1 0 012 14v-2a1 1 0 011-1zm14 0a1 1 0 011 1v2a1 1 0 01-.504.868l-1.75 1a1 1 0 11-.992-1.736L16 13.42V12a1 1 0 011-1zm-9.618 5.504a1 1 0 011.364-.372l.254.145V16a1 1 0 112 0v.277l.254-.145a1 1 0 11.992 1.736l-1.735.992a.995.995 0 01-1.022 0l-1.735-.992a1 1 0 01-.372-1.364z" clipRule="evenodd" />
                                            </svg>
                                        </div>

                                        <div className="absolute -bottom-8 -left-4 w-12 h-12 bg-[#e9ecff] rounded-full shadow-lg flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#4361ee]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                            </svg>
                                        </div>

                                        <div className="absolute top-1/2 -right-10 w-8 h-8 bg-[#ffefd5] rounded-full shadow-lg flex items-center justify-center animate-pulse-slow">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#ff9500]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Wave divider to next section */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 text-white">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,140.83,141.14,213.34,139.9Z" fill="currentColor"></path>
                </svg>
            </div>
        </section>
    )
}