import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white border-t border-slate-900 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 text-left">
        {/* Column 1: Logo and Brand Summary */}
        <div className="lg:col-span-1">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center font-black text-slate-950">
              A
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-white text-base font-bold tracking-wider">AUTOFLOW</span>
              <span className="text-slate-400 text-[9px] uppercase tracking-widest mt-0.5">Integrated Ecosystem</span>
            </div>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed max-w-xs">
            A curated marketplace for pre-owned luxury automobiles. Inspected, certified, and delivered with the rigor of a flagship dealership.
          </p>
        </div>

        {/* Column 2: Marketplace Links */}
        <div>
          <h4 className="text-sm font-bold text-white mb-6 tracking-wide">Marketplace</h4>
          <ul className="space-y-3.5 text-xs">
            <li>
              <a href="#buy" className="text-slate-400 hover:text-white transition-colors">
                Buy a Car
              </a>
            </li>
            <li>
              <a href="#sell" className="text-slate-400 hover:text-white transition-colors">
                Sell a Car
              </a>
            </li>
            <li>
              <a href="#listings" className="text-slate-400 hover:text-white transition-colors">
                Car Listings
              </a>
            </li>
            <li>
              <a href="#compare" className="text-slate-400 hover:text-white transition-colors">
                Compare Cars
              </a>
            </li>
            <li>
              <a href="#calculator" className="text-slate-400 hover:text-white transition-colors">
                EMI Calculator
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Company Links */}
        <div>
          <h4 className="text-sm font-bold text-white mb-6 tracking-wide">Company</h4>
          <ul className="space-y-3.5 text-xs">
            <li>
              <a href="#about" className="text-slate-400 hover:text-white transition-colors">
                About Us
              </a>
            </li>
            <li>
              <a href="#blog" className="text-slate-400 hover:text-white transition-colors">
                Blog
              </a>
            </li>
            <li>
              <a href="#careers" className="text-slate-400 hover:text-white transition-colors">
                Careers
              </a>
            </li>
            <li>
              <a href="#contact" className="text-slate-400 hover:text-white transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Services Links */}
        <div>
          <h4 className="text-sm font-bold text-white mb-6 tracking-wide uppercase">SERVICES</h4>
          <ul className="space-y-3.5 text-xs">
            <li>
              <a href="#sell-car" className="text-slate-400 hover:text-white transition-colors">
                Sell your Car
              </a>
            </li>
            <li>
              <a href="#dealer" className="text-slate-400 hover:text-white transition-colors">
                Dealer Registration
              </a>
            </li>
            <li>
              <a href="#finance" className="text-slate-400 hover:text-white transition-colors">
                Finance
              </a>
            </li>
            <li>
              <a href="#insurance" className="text-slate-400 hover:text-white transition-colors">
                Insurance
              </a>
            </li>
          </ul>
        </div>

        {/* Column 5: Contact Information */}
        <div className="space-y-4">
          {/* Phone */}
          <div className="flex items-center space-x-3 text-xs md:text-sm font-medium text-slate-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>+00000 00000</span>
          </div>

          {/* Email */}
          <div className="flex items-center space-x-3 text-xs md:text-sm font-medium text-slate-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>hello@aotoflow</span>
          </div>

          {/* Location */}
          <div className="flex items-center space-x-3 text-xs md:text-sm font-medium text-slate-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Kochi, Kerala</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
