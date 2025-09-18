import { useTranslation } from 'react-i18next';

export default function HowItWorks() {
  const { t } = useTranslation();
  const steps = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <line x1="10" y1="9" x2="8" y2="9"></line>
        </svg>
      ),
  number: "01",
  title: t('howitworks_step1_title', 'Define Your Content Goals'),
  description: t('howitworks_step1_desc', 'Set up your content needs, target audience, and brand guidelines in our simple setup wizard.')
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <path d="M20.4 14.5 16 10 4 20"></path>
        </svg>
      ),
  number: "02",
  title: t('howitworks_step2_title', 'Create Content Templates'),
  description: t('howitworks_step2_desc', 'Choose from pre-built templates or customize your own for different content types and channels.')
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"></path>
          <path d="M10 2c1 .5 2 2 2 5"></path>
        </svg>
      ),
  number: "03",
  title: t('howitworks_step3_title', 'Automate & Publish'),
  description: t('howitworks_step3_desc', 'Schedule content generation and publication across your marketing channels with a few clicks.')
    }
  ]
  
  return (
    <section className="bg-white" id="how-it-works">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16 animate-on-scroll">
          <h2 className="mb-4">{t('howitworks_title', 'How It Works')}</h2>
          <p className="opacity-80 max-w-lg mx-auto">
            {t('howitworks_subtitle', 'Get started in minutes with our simple three-step process')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative flex flex-col items-center text-center animate-on-scroll"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="absolute -top-4 right-0 font-mono text-7xl font-bold opacity-5">
                {step.number}
              </div>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/5 text-primary mb-6">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-sm opacity-70">{step.description}</p>
              {index < steps.length - 1 && (
                <svg 
                  className="hidden md:block absolute top-8 right-0 translate-x-1/2 text-primary/30" 
                  width="40" 
                  height="8" 
                  viewBox="0 0 40 8" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 4H30" stroke="currentColor" strokeWidth="2"/>
                  <path d="M30 0L38 4L30 8" stroke="currentColor" strokeWidth="2"/>
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}