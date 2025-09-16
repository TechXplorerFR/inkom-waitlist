import { useState, useEffect, useRef } from 'react';

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3;
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  
  const testimonials = [
    {
      quote: "Inkom has completely transformed our content creation process. What used to take weeks now happens in hours. It's like having an entire marketing team at your fingertips.",
      author: "Alex Morgan",
      title: "Marketing Director, TechFlow",
      avatar: "AM"
    },
    {
      quote: "As a solopreneur, I was struggling to keep up with content demands. Inkom's AI tools and automation have allowed me to scale my content while focusing on what truly matters - growing my business.",
      author: "Samantha Lee",
      title: "Founder, GrowthMinded",
      avatar: "SL"
    },
    {
      quote: "The quality of AI-generated content from Inkom is remarkable. It captures our brand voice perfectly and has dramatically increased our engagement metrics across all channels.",
      author: "Michael Chen",
      title: "CEO, Nexus Startups",
      avatar: "MC"
    }
  ];
  
  // Auto-slide functionality
  useEffect(() => {
    const play = () => {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      }, 5000);
    };
    
    play();
    
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [totalSlides]);
  
  const nextSlide = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };
  
  const prevSlide = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };
  
  const goToSlide = (index: number) => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    setCurrentSlide(index);
  };
  
  return (
    <section className="bg-secondary/20" id="testimonials">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-12 animate-on-scroll">
          <h2 className="mb-4">What Our Users Say</h2>
          <p className="opacity-80 max-w-lg mx-auto">
            Join hundreds of satisfied customers who have transformed their content creation process
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white rounded-xl p-8 md:p-10 shadow-sm border border-black/5">
                    <svg width="45" height="36" className="mb-6 text-primary/40" viewBox="0 0 45 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.4 36C9.86667 36 6.9 34.9667 4.5 32.9C2.1 30.7667 0.9 28.0333 0.9 24.7C0.9 21.5 1.93333 18.0333 4 14.3C6.13333 10.5 9.53333 6.7 14.2 2.9L19.7 7.7C17.4333 10.0333 15.5333 12.3 14 14.5C12.4667 16.7 11.7 18.8333 11.7 20.9C11.7 21.6333 11.8667 22.3 12.2 22.9C12.5333 23.4333 13.1333 24.0333 14 24.7C14.8667 23.8333 16.0667 23.4 17.6 23.4C19.6 23.4 21.3333 24.1333 22.8 25.6C24.2667 27.0667 25 28.9333 25 31.2C25 33.4 24.2 35.1667 22.6 36.5C21.0667 37.8333 19.2 38.5 17 38.5C15.9333 38.5 14.7333 38.3333 13.4 38V36ZM34.3 36C30.7667 36 27.8 34.9667 25.4 32.9C23 30.7667 21.8 28.0333 21.8 24.7C21.8 21.5 22.8333 18.0333 24.9 14.3C27.0333 10.5 30.4333 6.7 35.1 2.9L40.6 7.7C38.3333 10.0333 36.4333 12.3 34.9 14.5C33.3667 16.7 32.6 18.8333 32.6 20.9C32.6 21.6333 32.7667 22.3 33.1 22.9C33.4333 23.4333 34.0333 24.0333 34.9 24.7C35.7667 23.8333 36.9667 23.4 38.5 23.4C40.5 23.4 42.2333 24.1333 43.7 25.6C45.1667 27.0667 45.9 28.9333 45.9 31.2C45.9 33.4 45.1 35.1667 43.5 36.5C41.9667 37.8333 40.1 38.5 37.9 38.5C36.8333 38.5 35.6333 38.3333 34.3 38V36Z" fill="currentColor"/>
                    </svg>
                    
                    <p className="text-lg md:text-xl mb-8">"{testimonial.quote}"</p>
                    
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-full mr-4 font-medium">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <p className="font-semibold">{testimonial.author}</p>
                        <p className="text-sm opacity-60">{testimonial.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation buttons */}
          <button 
            onClick={prevSlide}
            className="absolute top-1/2 -left-4 md:-left-8 transform -translate-y-1/2 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md border border-black/10 hover:bg-secondary transition-colors"
            aria-label="Previous testimonial"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 3L5 7.5L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute top-1/2 -right-4 md:-right-8 transform -translate-y-1/2 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md border border-black/10 hover:bg-secondary transition-colors"
            aria-label="Next testimonial"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 3L10 7.5L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          {/* Pagination dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 rounded-full ${
                  currentSlide === index ? 'bg-primary' : 'bg-black/20'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}