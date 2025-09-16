export default function UseCases() {
  const cases = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
      title: "Small Businesses",
      description: "Create consistent, high-quality content without hiring a full marketing team. Ideal for businesses with limited resources but big ambitions."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="m4.93 4.93 4.24 4.24"></path>
          <path d="m14.83 9.17 4.24-4.24"></path>
          <path d="m14.83 14.83 4.24 4.24"></path>
          <path d="m9.17 14.83-4.24 4.24"></path>
          <circle cx="12" cy="12" r="4"></circle>
        </svg>
      ),
      title: "Solopreneurs",
      description: "Multiply your output and focus on business growth while our AI handles your content creation across all channels."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
        </svg>
      ),
      title: "Startups",
      description: "Scale your content marketing efforts without scaling your team. Perfect for fast-growing companies that need to maintain consistent brand messaging."
    }
  ];
  
  return (
    <section className="bg-white" id="use-cases">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16 animate-on-scroll">
          <h2 className="mb-4">Who Benefits Most</h2>
          <p className="opacity-80 max-w-lg mx-auto">
            Our platform is designed to help these key users achieve more with less effort
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cases.map((useCase, index) => (
            <div 
              key={index} 
              className="border border-black/5 rounded-xl p-6 text-center hover:border-primary/20 hover:shadow-sm transition-all animate-on-scroll"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/5 text-primary mb-6">
                {useCase.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{useCase.title}</h3>
              <p className="text-sm opacity-70">{useCase.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}