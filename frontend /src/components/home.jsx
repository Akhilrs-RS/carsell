import React from 'react'
import hpImg from '../assets/hp.png'
import iVideo from '../assets/i.mp4'

export default function Home() {
  return (
    <div className="bg-slate-950 text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full min-h-[92vh] flex flex-col justify-between pt-28 pb-12 px-6 overflow-hidden">
        {/* Background Video / Image */}
        <div className="absolute inset-0 w-full h-full z-0">
          <video
            src={iVideo}
            poster={hpImg}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center pointer-events-none"
          />
          {/* Gradients to blend video and ensure content legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/20 z-10" />
        </div>

        {/* Content Area */}
        <div className="max-w-7xl mx-auto w-full relative z-20 flex-grow flex flex-col justify-center">
          <div className="max-w-2xl text-left">
            {/* Pill badge */}
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-6">
              India's Premium Pre-Owned Car Marketplace
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6">
              Find Your
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
                Dream Car.
              </span>
            </h1>

            {/* Description */}
            <p className="text-slate-300 max-w-lg text-sm md:text-base leading-relaxed mb-8">
              Discover certified pre-owned luxury vehicles with transparent pricing, 200-point inspections, and hassle-free financing.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <a
                href="#inventory"
                className="bg-white hover:bg-slate-100 text-slate-950 font-bold px-6 py-3.5 rounded flex items-center space-x-2 transition-all text-sm"
              >
                <span>Explore Inventory</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
              <a
                href="#sell"
                className="border border-slate-600 hover:border-white text-white font-bold px-6 py-3.5 rounded transition-all text-sm"
              >
                Sell Your Car
              </a>
            </div>
          </div>
        </div>

        {/* Filter Widget (Centered overlay at bottom of Hero) */}
        <div className="max-w-7xl mx-auto w-full relative z-20 mt-4">
          <div className="bg-slate-950/40 backdrop-blur-md border border-slate-800/80 rounded-xl p-6 shadow-2xl">
            {/* Search Input Row */}
            <div className="relative mb-5 max-w-md">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-slate-900/60 border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
            </div>

            {/* Grid of Dropdowns */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {/* Brand */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Brand</label>
                <div className="relative">
                  <select className="appearance-none w-full bg-slate-900/80 border border-slate-850 rounded-lg px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500 cursor-pointer">
                    <option>Any Brand</option>
                    <option>Mercedes-Benz</option>
                    <option>BMW</option>
                    <option>Audi</option>
                    <option>Toyota</option>
                    <option>Honda</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none text-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Model */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Model</label>
                <div className="relative">
                  <select className="appearance-none w-full bg-slate-900/80 border border-slate-850 rounded-lg px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500 cursor-pointer">
                    <option>Any Model</option>
                    <option>Sedan</option>
                    <option>SUV</option>
                    <option>Hatchback</option>
                    <option>Coupe</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none text-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Budget */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Budget</label>
                <div className="relative">
                  <select className="appearance-none w-full bg-slate-900/80 border border-slate-850 rounded-lg px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500 cursor-pointer">
                    <option>Any Budget</option>
                    <option>Under 10L</option>
                    <option>10L - 25L</option>
                    <option>25L - 50L</option>
                    <option>Above 50L</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none text-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Fuel Type */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Fuel Type</label>
                <div className="relative">
                  <select className="appearance-none w-full bg-slate-900/80 border border-slate-850 rounded-lg px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500 cursor-pointer">
                    <option>Any Fuel</option>
                    <option>Petrol</option>
                    <option>Diesel</option>
                    <option>Electric</option>
                    <option>Hybrid</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none text-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Transmission */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Transmission</label>
                <div className="relative">
                  <select className="appearance-none w-full bg-slate-900/80 border border-slate-850 rounded-lg px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500 cursor-pointer">
                    <option>Any Type</option>
                    <option>Automatic</option>
                    <option>Manual</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none text-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Location</label>
                <div className="relative">
                  <select className="appearance-none w-full bg-slate-900/80 border border-slate-850 rounded-lg px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500 cursor-pointer">
                    <option>Any City</option>
                    <option>Mumbai</option>
                    <option>Delhi NCR</option>
                    <option>Bangalore</option>
                    <option>Hyderabad</option>
                    <option>Chennai</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none text-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brands / Popular Marques Section */}
      <section className="bg-slate-950 py-24 px-6 border-t border-slate-900">
        <div className="max-w-7xl mx-auto">
          {/* Header row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="text-left">
              <span className="text-amber-500 text-xs font-bold uppercase tracking-widest block mb-2">Brands</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white">Popular Marques</h2>
              <p className="text-slate-400 mt-2 text-sm">Browse our collection by your favorite luxury automotive brand.</p>
            </div>
            <a 
              href="#all-brands" 
              className="inline-flex items-center text-slate-300 hover:text-amber-400 font-semibold text-sm transition-colors mt-4 md:mt-0"
            >
              <span>View All</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

          {/* Brands Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {/* Mercedes-Benz */}
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-6 flex flex-col items-center justify-center hover:border-slate-700 hover:bg-slate-900/60 transition-all duration-300 group cursor-pointer">
              <svg className="w-12 h-12 text-slate-400 group-hover:text-white transition-colors mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2v20M12 12l-8.66 5M12 12l8.66 5" />
              </svg>
              <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors uppercase tracking-wider">Mercedes-Benz</span>
            </div>

            {/* BMW */}
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-6 flex flex-col items-center justify-center hover:border-slate-700 hover:bg-slate-900/60 transition-all duration-300 group cursor-pointer">
              <svg className="w-12 h-12 text-slate-400 group-hover:text-white transition-colors mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" strokeDasharray="2 2" />
                <path d="M12 2v20M2 12h20" />
              </svg>
              <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors uppercase tracking-wider">BMW</span>
            </div>

            {/* Audi */}
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-6 flex flex-col items-center justify-center hover:border-slate-700 hover:bg-slate-900/60 transition-all duration-300 group cursor-pointer">
              <svg className="w-14 h-12 text-slate-400 group-hover:text-white transition-colors mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="6" cy="12" r="3" />
                <circle cx="10" cy="12" r="3" />
                <circle cx="14" cy="12" r="3" />
                <circle cx="18" cy="12" r="3" />
              </svg>
              <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors uppercase tracking-wider">Audi</span>
            </div>

            {/* Toyota */}
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-6 flex flex-col items-center justify-center hover:border-slate-700 hover:bg-slate-900/60 transition-all duration-300 group cursor-pointer">
              <svg className="w-12 h-12 text-slate-400 group-hover:text-white transition-colors mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <ellipse cx="12" cy="12" rx="10" ry="7" />
                <ellipse cx="12" cy="10" rx="6" ry="4" />
                <ellipse cx="12" cy="12" rx="2" ry="7" />
              </svg>
              <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors uppercase tracking-wider">Toyota</span>
            </div>

            {/* Honda */}
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-6 flex flex-col items-center justify-center hover:border-slate-700 hover:bg-slate-900/60 transition-all duration-300 group cursor-pointer">
              <svg className="w-12 h-12 text-slate-400 group-hover:text-white transition-colors mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="4" y="4" width="16" height="16" rx="3" />
                <path d="M7 6v12h2v-5h6v5h2V6h-2v5H9V6H7z" />
              </svg>
              <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors uppercase tracking-wider">Honda</span>
            </div>

            {/* Hyundai */}
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-6 flex flex-col items-center justify-center hover:border-slate-700 hover:bg-slate-900/60 transition-all duration-300 group cursor-pointer">
              <svg className="w-12 h-12 text-slate-400 group-hover:text-white transition-colors mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <ellipse cx="12" cy="12" rx="10" ry="7" transform="rotate(-10 12 12)" />
                <path d="M8 8.5l2 7h2v-4.5h2v4.5h2l-2-7" strokeLinecap="round" />
              </svg>
              <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors uppercase tracking-wider">Hyundai</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
