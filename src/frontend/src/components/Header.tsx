import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  
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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-black text-white shadow-md' 
        : 'bg-black/50 backdrop-blur-md text-white border-b border-white/10'
    }`}>
      <div className="container flex items-center justify-between h-16 md:h-20">
        <div className="flex items-center">
          <a href="#" className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary mr-2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <path d="M7 10h10"></path>
              <path d="M7 14h10"></path>
              <path d="M13 18V6"></path>
            </svg>
            <span className="text-xl font-bold tracking-tight">inkom</span>
          </a>
          
          <div className="border-l border-white/20 h-6 mx-4 hidden lg:block"></div>
          
          <nav className="hidden lg:flex items-center space-x-6">
            <a href="#features" className="text-sm font-medium hover:text-secondary transition-colors">Features</a>
            <a href="#supported-platforms" className="text-sm font-medium hover:text-secondary transition-colors">Platforms</a>
            <a href="#content-roadmap" className="text-sm font-medium hover:text-secondary transition-colors">Process</a>
            <a href="#how-it-works" className="text-sm font-medium hover:text-secondary transition-colors">How It Works</a>
            <a href="#testimonials" className="text-sm font-medium hover:text-secondary transition-colors">Testimonials</a>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="hidden md:inline-flex text-white hover:bg-white/20 hover:text-white border border-white/20"
          >
            Log in
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            className="bg-[#4361ee] text-white hover:bg-[#4361ee]/90 shadow-md shadow-[#4361ee]/20"
          >
            Join Waitlist
          </Button>
        </div>
      </div>
    </header>
  )
}