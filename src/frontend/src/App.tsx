import { useEffect } from "react"
// Import components 
import Header from "./components/Header"
import Hero from "./components/Hero"
import Features from "./components/Features"
import HowItWorks from "./components/HowItWorks"
import LogoCloud from "./components/LogoCloud"
import Testimonials from "./components/Testimonials"
import UseCases from "./components/UseCases"
import CTA from "./components/CTA"
import Footer from "./components/Footer"

function App() {
  // Observer for fade-in and slide-up animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          (entry.target as HTMLElement).style.opacity = '1';
          observer.unobserve(entry.target);
        }
      })
    }, observerOptions)

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => {
      (el as HTMLElement).style.opacity = '0';
      observer.observe(el);
    })

    return () => {
      animatedElements.forEach(el => observer.unobserve(el));
    }
  }, [])

  return (
    <div className="min-h-svh">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <LogoCloud />
        <Testimonials />
        <UseCases />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

export default App
