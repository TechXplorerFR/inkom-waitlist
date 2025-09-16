export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-black/5 py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <a href="#" className="inline-block">
              <span className="text-xl font-bold tracking-tight">inkom</span>
            </a>
            <p className="mt-4 text-sm opacity-70 max-w-xs">
              AI-powered content creation and automation for small businesses and entrepreneurs. Save time and scale your reach.
            </p>
            
            {/* Social links */}
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-foreground/70 hover:text-primary transition-colors" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="#" className="text-foreground/70 hover:text-primary transition-colors" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="#" className="text-foreground/70 hover:text-primary transition-colors" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="text-sm opacity-70 hover:opacity-100 hover:text-primary transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="text-sm opacity-70 hover:opacity-100 hover:text-primary transition-colors">How It Works</a></li>
              <li><a href="#testimonials" className="text-sm opacity-70 hover:opacity-100 hover:text-primary transition-colors">Testimonials</a></li>
              <li><a href="#cta" className="text-sm opacity-70 hover:opacity-100 hover:text-primary transition-colors">Pricing</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm opacity-70 hover:opacity-100 hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="text-sm opacity-70 hover:opacity-100 hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="text-sm opacity-70 hover:opacity-100 hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm opacity-70 hover:opacity-100 hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-black/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm opacity-60 mb-4 md:mb-0">
            © {currentYear} Inkom. All rights reserved.
          </p>
          
          <div className="flex space-x-6">
            <a href="#" className="text-sm opacity-60 hover:opacity-100 hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="text-sm opacity-60 hover:opacity-100 hover:text-primary transition-colors">Terms</a>
            <a href="#" className="text-sm opacity-60 hover:opacity-100 hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}