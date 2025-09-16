import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function CTA() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    
    // Here you would normally send the email to your API
    console.log("Submitting email:", email)
    
    // Show success state
    setSubmitted(true)
    setEmail("")
    
    // Reset success message after 5 seconds
    setTimeout(() => {
      setSubmitted(false)
    }, 5000)
  }
  
  return (
    <section className="bg-secondary/20" id="cta">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center animate-on-scroll">
          <h2 className="mb-6">Ready to Transform Your Content Creation?</h2>
          <p className="text-lg mb-8 opacity-80 max-w-xl mx-auto">
            Join our waitlist to be notified when we launch and get exclusive early access benefits.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-md border border-black/10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              required
            />
            <Button 
              type="submit" 
              className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-md transition-all hover:scale-105"
            >
              Join Waitlist
            </Button>
          </form>
          
          {submitted && (
            <p className="text-sm text-green-600 mb-4 animate-fade-in">
              Thank you! You've been added to our waitlist.
            </p>
          )}
          
          <p className="text-xs opacity-60">
            No spam, only launch updates. You can unsubscribe at any time.
          </p>
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute left-0 bottom-0 w-full h-1/2 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/5 rounded-full"></div>
        <div className="absolute -bottom-5 right-1/4 w-20 h-20 bg-primary/5 rounded-full"></div>
      </div>
    </section>
  )
}