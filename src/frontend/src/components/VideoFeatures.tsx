import { useRef, useEffect } from 'react';

export default function VideoFeatures() {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            (entry.target as HTMLElement).style.opacity = '1';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    
    if (videoContainerRef.current) {
      observer.observe(videoContainerRef.current);
      (videoContainerRef.current as HTMLElement).style.opacity = '0';
    }
    
    return () => {
      if (videoContainerRef.current) {
        observer.unobserve(videoContainerRef.current);
      }
    };
  }, []);
  
  // Function to handle video play on scroll
  useEffect(() => {
    const handleScroll = () => {
      const video = document.getElementById('feature-video') as HTMLVideoElement;
      if (!video) return;
      
      const rect = video.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isInView) {
        if (video.paused) video.play();
      } else {
        if (!video.paused) video.pause();
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <section className="relative py-20 bg-white">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-br from-[#1a1a2e] to-[#4361ee]">
            See Inkom in Action
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Watch how our AI-powered platform transforms content creation and helps businesses scale their operations.
          </p>
        </div>
        
        <div 
          ref={videoContainerRef}
          className="relative rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-[1.01]"
        >
          {/* Video overlay with play button that shows on mobile/when video is paused */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-10 pointer-events-none opacity-0 transition-opacity group-hover:opacity-100">
            <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#4361ee]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          
          {/* Video element */}
          <video 
            id="feature-video"
            className="w-full aspect-video object-cover"
            muted
            loop
            playsInline
            poster="/assets/video-poster.jpg"
          >
            {/* Replace with your actual video file */}
            <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Gradient overlay at bottom for text clarity */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
          
          {/* Feature highlights that appear over video */}
          <div className="absolute bottom-8 left-0 right-0 px-8 text-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 transform transition-transform hover:scale-105">
                <div className="flex items-center space-x-3">
                  <div className="bg-[#4361ee] rounded-lg p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">AI-Powered</h3>
                    <p className="text-sm opacity-80">Advanced content generation</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 transform transition-transform hover:scale-105">
                <div className="flex items-center space-x-3">
                  <div className="bg-[#4361ee] rounded-lg p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Lightning Fast</h3>
                    <p className="text-sm opacity-80">Rapid content delivery</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 transform transition-transform hover:scale-105">
                <div className="flex items-center space-x-3">
                  <div className="bg-[#4361ee] rounded-lg p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Expert Quality</h3>
                    <p className="text-sm opacity-80">Professional content standards</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Curved bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 w-full h-16 rotate-180">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,140.83,141.14,213.34,139.9Z" fill="#f8f9ff"></path>
          </svg>
        </div>
      </div>
    </section>
  );
}