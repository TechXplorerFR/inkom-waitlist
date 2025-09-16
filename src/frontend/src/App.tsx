import { useEffect } from "react"
// Import components 
import Header from "./components/Header"
import Hero from "./components/Hero"
import VideoFeatures from "./components/VideoFeatures"
import Features from "./components/Features"
import HowItWorks from "./components/HowItWorks"
import LogoCloud from "./components/LogoCloud"
import Testimonials from "./components/Testimonials"
import UseCases from "./components/UseCases"
import CTA from "./components/CTA"
import Footer from "./components/Footer"
import SupportedPlatforms from "./components/SupportedPlatforms"
import ContentRoadmap from "./components/ContentRoadmap"

function App() {
  // Observer for fade-in and slide-up animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1
    }

    // Enhanced animation observer with different animation types
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Apply different animations based on data attributes
          const el = entry.target as HTMLElement;
          
          if (el.dataset.animationType === 'fade-up') {
            el.classList.add('animate-fade-up');
          } else if (el.dataset.animationType === 'fade-right') {
            el.classList.add('animate-fade-right');
          } else if (el.dataset.animationType === 'scale-in') {
            el.classList.add('animate-scale-in');
          } else {
            el.classList.add('animate-fade-in');
          }
          
          el.style.opacity = '1';
          observer.unobserve(entry.target);
        }
      })
    }, observerOptions)

    // Apply different animation types based on position in the page
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el, index) => {
      const element = el as HTMLElement;
      element.style.opacity = '0';
      
      // Add varied animation timings for staggered effect
      element.style.transitionDelay = `${index % 3 * 0.1}s`;
      
      // Assign animation types to create visual variety
      if (index % 3 === 0) {
        element.dataset.animationType = 'fade-up';
      } else if (index % 3 === 1) {
        element.dataset.animationType = 'fade-right';
      } else {
        element.dataset.animationType = 'scale-in';
      }
      
      observer.observe(element);
    })
    
    // Add parallax scroll effect to elements with parallax class
    const handleParallaxScroll = () => {
      const parallaxElements = document.querySelectorAll('.parallax-scroll');
      const scrollPosition = window.scrollY;
      
      parallaxElements.forEach((element) => {
        const speed = Number((element as HTMLElement).dataset.speed || 0.15);
        const yPos = -(scrollPosition * speed);
        (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    };
    
    window.addEventListener('scroll', handleParallaxScroll);

    return () => {
      animatedElements.forEach(el => observer.unobserve(el));
      window.removeEventListener('scroll', handleParallaxScroll);
    }
  }, [])

  return (
    <div className="min-h-svh">
      <Header />
      <main>
        <Hero />
        <VideoFeatures />
        <Features />
        <SupportedPlatforms />
        <ContentRoadmap />
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
