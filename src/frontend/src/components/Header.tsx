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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="container flex items-center justify-between h-16 md:h-20">
        <a href="#" className="flex items-center">
          <span className="text-xl font-bold tracking-tight">inkom</span>
        </a>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-sm font-medium hover:underline">Features</a>
          <a href="#how-it-works" className="text-sm font-medium hover:underline">How It Works</a>
          <a href="#testimonials" className="text-sm font-medium hover:underline">Testimonials</a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="hidden md:inline-flex">Log in</Button>
          <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90">Join Waitlist</Button>
        </div>
      </div>
    </header>
  )
}