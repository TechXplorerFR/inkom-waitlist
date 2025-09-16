import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="relative pt-28 md:pt-32 lg:pt-36" id="hero">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="animate-on-scroll">
            <h1 className="mb-6">
              Automate Content Creation With&nbsp;AI
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-lg opacity-80">
              Delegate and automate your content creation using AI and powerful automation tools. Save time and scale your business effortlessly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 hover:scale-105 transition-all">
                Join the Waitlist
              </Button>
              <Button variant="outline" size="lg" className="hover:scale-105 transition-all">
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="relative animate-on-scroll">
            {/* Abstract illustration */}
            <div className="relative aspect-square max-w-lg mx-auto">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path fill="#2E6BF5" d="M40.9,-68.5C52.3,-62.3,60.5,-50.5,65.9,-37.9C71.2,-25.3,73.7,-12.6,73.3,-0.2C72.9,12.2,69.7,24.5,63.4,35.8C57.2,47.1,47.9,57.5,36.6,64.3C25.3,71,12.6,74,0.4,73.2C-11.8,72.4,-23.7,67.9,-35.1,61.8C-46.5,55.6,-57.4,47.9,-65.5,37.5C-73.5,27.1,-78.7,13.6,-80,0.7C-81.4,-12.1,-79,-24.2,-71.8,-32.5C-64.6,-40.9,-52.7,-45.4,-41.1,-51.4C-29.6,-57.3,-14.8,-64.7,-0.2,-64.3C14.3,-63.9,29.5,-74.7,40.9,-68.5Z" transform="translate(100 100)" />
              </svg>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <path d="M7 10h10"></path>
                  <path d="M7 14h10"></path>
                  <path d="M13 18V6"></path>
                </svg>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-10 -left-10 w-20 h-20 border-2 border-primary/20 rounded-full"></div>
            <div className="absolute -bottom-5 right-20 w-12 h-12 bg-black/5 rounded-lg rotate-12"></div>
            <div className="absolute top-1/2 -right-5 w-8 h-8 bg-primary/10 rounded-full"></div>
          </div>
        </div>
      </div>
      
      {/* Subtle background shape */}
      <div className="absolute top-0 right-0 w-1/3 h-full max-w-md opacity-5 -z-10">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path fill="#000000" d="M44.3,-76.8C58.3,-71,71.4,-60.3,79.8,-46.5C88.1,-32.7,91.7,-16.3,89.1,-1.5C86.6,13.4,77.9,26.8,69,39.9C60.1,53,51.1,65.8,38.9,70.2C26.8,74.5,13.4,70.4,0.2,70C-13,69.7,-26,73.1,-37.4,69.3C-48.8,65.6,-58.5,54.7,-65.6,42.3C-72.7,29.9,-77.2,14.9,-77.7,-0.3C-78.2,-15.5,-74.7,-31.1,-66.3,-42.7C-57.9,-54.3,-44.5,-62.1,-31.2,-68.2C-17.8,-74.4,-8.9,-79,3.3,-84.7C15.5,-90.3,31.1,-97.1,44.3,-76.8Z" transform="translate(100 100)" />
        </svg>
      </div>
    </section>
  )
}