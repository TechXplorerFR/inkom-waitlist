export default function SupportedPlatforms() {
  const platforms = [
    {
      name: "Twitter",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
        </svg>
      )
    },
    {
      name: "Instagram",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      )
    },
    {
      name: "LinkedIn",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect x="2" y="9" width="4" height="12"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      )
    },
    {
      name: "Facebook",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
      )
    },
    {
      name: "TikTok",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"></path>
          <path d="M15 8a4 4 0 0 0 0 8"></path>
          <path d="M15 12h-2"></path>
          <path d="M22 8v8"></path>
          <path d="M17 16V8h-2"></path>
          <path d="M17 12h-2"></path>
        </svg>
      )
    },
    {
      name: "YouTube",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 12v8"></path>
          <path d="M14 4v4"></path>
          <path d="M4 12h10"></path>
          <path d="M14 12h6"></path>
        </svg>
      )
    },
    {
      name: "Medium",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <path d="M20.4 14.5 16 10 4 20"></path>
        </svg>
      )
    },
    {
      name: "Pinterest",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      )
    },
    {
      name: "Wordpress",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 7h16"></path>
          <path d="M4 12h16"></path>
          <path d="M4 17h16"></path>
        </svg>
      )
    }
  ];

  return (
    <section className="py-16 bg-white" id="supported-platforms">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Create Content For Any Platform</h2>
          <p className="max-w-xl mx-auto text-lg text-gray-600">
            Our AI tools generate tailored content for all major social media platforms, blogs, and more.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 justify-items-center">
          {platforms.map((platform, index) => (
            <div key={index} className="flex flex-col items-center justify-center p-4 transition-all hover:scale-105">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-3">
                <div className="text-black">
                  {platform.icon}
                </div>
              </div>
              <span className="text-sm font-medium">{platform.name}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 max-w-xl mx-auto">
            Easily create, schedule, and publish content to all your favorite platforms with our unified dashboard.
            No more switching between multiple tools!
          </p>
        </div>
      </div>
    </section>
  );
}