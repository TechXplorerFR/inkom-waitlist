export default function Features() {
  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <path d="M12 17h.01"></path>
        </svg>
      ),
      title: "AI-Powered Content",
      description: "Generate high-quality blog posts, social media content, and marketing copy with cutting-edge AI models."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 14 4-4"></path>
          <path d="M3.34 19a10 10 0 1 1 17.32 0"></path>
          <path d="M12 14v7"></path>
        </svg>
      ),
      title: "Smart Automation",
      description: "Set up workflows that automatically create and distribute content across all your channels."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2H2v10h10V2Z"></path>
          <path d="M22 12h-8v10h8V12Z"></path>
          <path d="M12 12H2v10h10V12Z"></path>
          <path d="M22 2h-8v8h8V2Z"></path>
        </svg>
      ),
      title: "Content Library",
      description: "Organize and manage all your digital assets in one centralized, searchable repository."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3v18h18"></path>
          <path d="m19 9-5 5-4-4-3 3"></path>
        </svg>
      ),
      title: "Analytics Dashboard",
      description: "Track performance metrics and get actionable insights to optimize your content strategy."
    }
  ]
  
  return (
    <section className="bg-secondary/30" id="features">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16 animate-on-scroll">
          <h2 className="mb-4">Powerful Tools for Effortless Content</h2>
          <p className="opacity-80 max-w-lg mx-auto">
            Our platform combines advanced AI with intuitive workflows to help you create, manage, and distribute content with minimal effort.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-sm border border-black/5 hover:shadow-md hover:border-primary/20 transition-all animate-on-scroll"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-md bg-primary/10 text-primary mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm opacity-70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}