import { useTranslation } from "react-i18next"

export default function ContentRoadmap() {
  const { t } = useTranslation()
  const steps = [
    {
      id: "01",
      title: t('roadmap_define_goals'),
      description: t('roadmap_define_goals_desc'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <path d="M12 18v-6"></path>
          <path d="M9 15h6"></path>
        </svg>
      )
    },
    {
      id: "02",
      title: t('roadmap_generate_content'),
      description: t('roadmap_generate_content_desc'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path>
          <path d="M12 8v8"></path>
          <path d="M8 12h8"></path>
          <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"></path>
        </svg>
      )
    },
    {
      id: "03",
      title: t('roadmap_review_refine'),
      description: t('roadmap_review_refine_desc'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z"></path>
          <path d="M17 2v6"></path>
        </svg>
      )
    },
    {
      id: "04",
      title: t('roadmap_schedule_publish'),
      description: t('roadmap_schedule_publish_desc'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
          <path d="m9 16 2 2 4-4"></path>
        </svg>
      )
    }
  ];

  return (
    <section className="py-16 bg-white" id="content-roadmap">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t('roadmap_title')}</h2>
          <p className="text-lg text-gray-600">
            {t('roadmap_subtitle')}
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line connecting the steps */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-secondary transform md:-translate-x-1/2 hidden md:block"></div>

          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col md:flex-row items-center gap-4 mb-12 last:mb-0">
              {/* Only one content box on mobile, both on desktop */}
              <div className={`bg-white border border-gray-100 rounded-lg p-6 shadow-sm w-full md:w-[calc(50%-2rem)]
                ${index % 2 === 0 ? 'md:pr-8 md:text-right md:order-1 md:mr-auto' : 'md:pl-8 md:text-left md:order-3 md:ml-auto'}
                ${index % 2 === 0 ? '' : 'md:hidden'}
                ${index % 2 !== 0 ? '' : 'block md:hidden'}`}> 
                <div className={`flex items-center mb-4 ${index % 2 === 0 ? 'justify-end' : ''}`}>
                  <div className="p-2 bg-secondary/30 rounded-md mr-4">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold">{step.title}</h3>
                </div>
                <p className="text-gray-600">{step.description}</p>
                <div className={`mt-4 flex items-center text-green-600 ${index % 2 === 0 ? 'justify-end' : ''}`}> 
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span className="ml-1 text-sm font-medium">{t('roadmap_automated')}</span>
                </div>
              </div>

              {/* Number circle always centered */}
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-black font-bold z-10 md:absolute md:left-1/2 md:-translate-x-1/2">
                {step.id}
              </div>

              {/* Second content box only on desktop for odd steps */}
              {index % 2 !== 0 && (
                <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm w-full md:w-[calc(50%-2rem)] md:pl-8 md:text-left md:order-3 md:ml-auto hidden md:block">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-secondary/30 rounded-md mr-4">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-bold">{step.title}</h3>
                  </div>
                  <p className="text-gray-600">{step.description}</p>
                  <div className="mt-4 flex items-center text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <span className="ml-1 text-sm font-medium">{t('roadmap_automated')}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}