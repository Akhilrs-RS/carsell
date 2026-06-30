import React, { useState } from 'react'
import hpImg from '../assets/hp.png'
import iVideo from '../assets/i.mp4'

// Imports of Handpicked images
import a1 from '../assets/a1.png'
import a3 from '../assets/a3.png'
import a4 from '../assets/a4.jpg'
import a5 from '../assets/a5.jpg'
import a6 from '../assets/a6.png'
import a7 from '../assets/a7.jpg'

export default function Home() {
  // State for interactive EMI calculator
  const [loanAmount, setLoanAmount] = useState(50) // in Lakhs
  const [loanTenure, setLoanTenure] = useState(5) // in Years

  // State for interactive FAQ Accordions
  const [expandedFaq, setExpandedFaq] = useState(null)

  // Fixed interest rate at 9% p.a.
  const interestRate = 9 
  const P = loanAmount * 100000 // Convert Lakhs to Rupees
  const r = interestRate / 12 / 100 // Monthly interest rate
  const n = loanTenure * 12 // Tenure in months

  // Calculate EMI
  const emi = Math.round((P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1))
  const formattedEmi = emi.toLocaleString('en-IN')

  // FAQ data
  const faqs = [
    {
      question: "How are vehicles inspected before listing?",
      answer: "Every car listed on AutoVault undergoes a comprehensive 200-point inspection covering the engine, transmission, electricals, suspension, and bodywork. We provide the full inspection report transparently for each vehicle so you can make a fully informed choice."
    },
    {
      question: "Can I return a vehicle after purchase?",
      answer: "Yes, we offer a 5-day money-back guarantee. If you are not completely satisfied with your purchase, you can return it within 5 days or 500 km, whichever comes first, for a full refund (terms and conditions apply)."
    },
    {
      question: "How long does the buying process take?",
      answer: "The entire process is highly streamlined. Once you choose a car and secure financing approval (which takes under 4 hours), the paperwork can be completed within 24-48 hours. Delivery is scheduled immediately after."
    },
    {
      question: "Do you provide warranty on pre-owned vehicles?",
      answer: "Absolutely. All certified AutoVault vehicles come with a complimentary 12-month / 15,000 km comprehensive warranty, covering major mechanical and electrical components, along with roadside assistance."
    }
  ]

  const toggleFaq = (index) => {
    if (expandedFaq === index) {
      setExpandedFaq(null)
    } else {
      setExpandedFaq(index)
    }
  }

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
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
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
      <section className="bg-slate-950 py-20 px-6 border-t border-slate-900">
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

      {/* Featured Vehicles Section */}
      <section className="bg-slate-950 py-20 px-6 border-t border-slate-900">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-left mb-12">
            <span className="inline-flex items-center px-3.5 py-1 rounded-full border border-slate-800 text-xs font-medium text-slate-400 mb-4">
              Handpicked Selection
            </span>
            <h2 className="text-4xl font-extrabold text-white mb-3">Featured Vehicles</h2>
            <p className="text-slate-400 text-sm max-w-xl">
              Premium pre-owned cars selected by our experts for exceptional value and quality.
            </p>
          </div>

          {/* Vehicles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Mercedes-Benz GLC */}
            <div className="bg-black border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all duration-300 flex flex-col justify-between group">
              <div className="relative overflow-hidden aspect-[4/3] bg-slate-900 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800" 
                  alt="Mercedes-Benz GLC" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 text-left flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-xs text-slate-400 uppercase tracking-wider">Mercedes-Benz</span>
                      <h3 className="text-lg font-bold text-white mt-0.5">GLC 220d 4MATIC</h3>
                    </div>
                    <span className="text-lg font-black text-amber-500">₹56,75,000</span>
                  </div>

                  {/* Specs */}
                  <div className="grid grid-cols-3 gap-2 py-4 border-t border-b border-slate-900 text-[11px] text-slate-400 font-medium mb-4">
                    <div className="flex items-center space-x-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      <span>2021</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path d="M12 2a10 10 0 00-7.07 17.07L12 12V4" />
                        <path d="M19.07 19.07A10 10 0 0012 2" strokeDasharray="2 2" />
                      </svg>
                      <span>32,500 km</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path d="M3 22h12M4 2v15h10V2H4zM14 9h3a2 2 0 012 2v6a2 2 0 002 2h1" />
                        <path d="M9 6h2v3H9z" />
                      </svg>
                      <span>Diesel</span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-medium mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Bangalore</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3 w-full mt-auto">
                  <a href="#details" className="flex-1 text-center border border-slate-700 hover:border-slate-500 text-white rounded px-4 py-2.5 text-xs font-semibold transition-all">
                    View Details
                  </a>
                  <a href="#test-drive" className="flex-1 text-center bg-white hover:bg-slate-100 text-slate-950 rounded px-4 py-2.5 text-xs font-bold transition-all">
                    Book Test Drive
                  </a>
                </div>
              </div>
            </div>

            {/* Range Rover Autobiography */}
            <div className="bg-black border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all duration-300 flex flex-col justify-between group">
              <div className="relative overflow-hidden aspect-[4/3] bg-slate-900 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&q=80&w=800" 
                  alt="Range Rover Autobiography" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 text-left flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-xs text-slate-400 uppercase tracking-wider">Range Rover</span>
                      <h3 className="text-lg font-bold text-white mt-0.5">Autobiography LWB</h3>
                    </div>
                    <span className="text-lg font-black text-amber-500">₹81,75,000</span>
                  </div>

                  {/* Specs */}
                  <div className="grid grid-cols-3 gap-2 py-4 border-t border-b border-slate-900 text-[11px] text-slate-400 font-medium mb-4">
                    <div className="flex items-center space-x-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      <span>2022</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path d="M12 2a10 10 0 00-7.07 17.07L12 12V4" />
                        <path d="M19.07 19.07A10 10 0 0012 2" strokeDasharray="2 2" />
                      </svg>
                      <span>28,000 km</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path d="M3 22h12M4 2v15h10V2H4zM14 9h3a2 2 0 012 2v6a2 2 0 002 2h1" />
                        <path d="M9 6h2v3H9z" />
                      </svg>
                      <span>Diesel</span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-medium mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Los Angeles</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3 w-full mt-auto">
                  <a href="#details" className="flex-1 text-center border border-slate-700 hover:border-slate-500 text-white rounded px-4 py-2.5 text-xs font-semibold transition-all">
                    View Details
                  </a>
                  <a href="#test-drive" className="flex-1 text-center bg-white hover:bg-slate-100 text-slate-950 rounded px-4 py-2.5 text-xs font-bold transition-all">
                    Book Test Drive
                  </a>
                </div>
              </div>
            </div>

            {/* Audi A6 */}
            <div className="bg-black border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all duration-300 flex flex-col justify-between group">
              <div className="relative overflow-hidden aspect-[4/3] bg-slate-900 flex items-center justify-center">
                {/* Badges */}
                <div className="absolute top-4 left-4 z-10 flex items-center space-x-2">
                  <span className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded">
                    FEATURED
                  </span>
                  <span className="bg-slate-900/80 text-slate-100 text-[10px] font-bold px-3 py-1 rounded backdrop-blur-sm">
                    PREMIUM
                  </span>
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800" 
                  alt="Audi A6" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 text-left flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-xs text-slate-400 uppercase tracking-wider">Audi</span>
                      <h3 className="text-lg font-bold text-white mt-0.5">A6 Premium Plus 45 TFSI</h3>
                    </div>
                    <span className="text-lg font-black text-amber-500">₹48,90,000</span>
                  </div>

                  {/* Specs */}
                  <div className="grid grid-cols-3 gap-2 py-4 border-t border-b border-slate-900 text-[11px] text-slate-400 font-medium mb-4">
                    <div className="flex items-center space-x-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      <span>2022</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path d="M12 2a10 10 0 00-7.07 17.07L12 12V4" />
                        <path d="M19.07 19.07A10 10 0 0012 2" strokeDasharray="2 2" />
                      </svg>
                      <span>28,000 km</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path d="M3 22h12M4 2v15h10V2H4zM14 9h3a2 2 0 012 2v6a2 2 0 002 2h1" />
                        <path d="M9 6h2v3H9z" />
                      </svg>
                      <span>Petrol</span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-medium mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Bangalore</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3 w-full mt-auto">
                  <a href="#details" className="flex-1 text-center border border-slate-700 hover:border-slate-500 text-white rounded px-4 py-2.5 text-xs font-semibold transition-all">
                    View Details
                  </a>
                  <a href="#test-drive" className="flex-1 text-center bg-white hover:bg-slate-100 text-slate-950 rounded px-4 py-2.5 text-xs font-bold transition-all">
                    Book Test Drive
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Handpicked for You Section */}
      <section className="bg-gradient-to-b from-white to-[#F9F4ED] text-slate-900 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-left mb-8">
            <span className="inline-flex items-center px-3.5 py-1 rounded-full border border-slate-200 text-xs font-medium text-slate-500 mb-4 bg-white/50">
              Our Collection
            </span>
            <h2 className="text-4xl font-extrabold text-slate-950 mb-3">Handpicked for You</h2>
            <p className="text-slate-500 text-sm max-w-xl">
              Every vehicle in our collection undergoes a rigorous 200-point inspection before earning the AutoVault seal.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex space-x-2 bg-slate-100/80 p-1 rounded-full max-w-xs mb-12 border border-slate-200/50 backdrop-blur-sm">
            <button className="bg-slate-950 text-white px-5 py-1.5 rounded-full text-xs font-semibold shadow-sm cursor-pointer">
              Featured
            </button>
            <button className="text-slate-500 hover:text-slate-800 px-5 py-1.5 text-xs font-semibold transition-colors cursor-pointer">
              Latest
            </button>
            <button className="text-slate-500 hover:text-slate-800 px-5 py-1.5 text-xs font-semibold transition-colors cursor-pointer">
              Premium
            </button>
          </div>

          {/* Handpicked Vehicles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1: Tata Harrier */}
            <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between group shadow-sm">
              <div className="relative overflow-hidden aspect-[4/3] bg-slate-50 flex items-center justify-center p-4">
                <img 
                  src={a1} 
                  alt="Tata Harrier" 
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 text-left flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-lg font-bold text-slate-950">Tata Harrier</h3>
                  <span className="text-xs text-slate-500 font-medium">2025 · 1st Owner</span>

                  {/* Specs */}
                  <div className="grid grid-cols-3 gap-2 py-4 border-t border-b border-slate-100 text-[11px] text-slate-500 font-medium my-4">
                    <div className="flex items-center space-x-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      <span>2025</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path d="M12 2a10 10 0 00-7.07 17.07L12 12V4" />
                        <path d="M19.07 19.07A10 10 0 0012 2" strokeDasharray="2 2" />
                      </svg>
                      <span>28,000 km</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path d="M3 22h12M4 2v15h10V2H4zM14 9h3a2 2 0 012 2v6a2 2 0 002 2h1" />
                        <path d="M9 6h2v3H9z" />
                      </svg>
                      <span>Diesel</span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center space-x-1.5 text-xs text-slate-500 font-medium mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Los Angeles</span>
                  </div>
                </div>

                {/* Price and Action Row */}
                <div className="flex justify-between items-center mt-auto border-t border-slate-5 pt-4">
                  <div className="flex flex-col text-left">
                    <span className="text-xl font-extrabold text-slate-950">₹18.50 L</span>
                    <span className="text-[10px] text-slate-400 mt-0.5">EMI ₹30,285/mo</span>
                  </div>
                  <a href="#view-harrier" className="bg-slate-950 hover:bg-slate-800 text-white text-xs font-semibold px-6 py-2.5 rounded-full transition-all">
                    View
                  </a>
                </div>
              </div>
            </div>

            {/* Card 2: BMW X1 sDrive20d */}
            <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between group shadow-sm relative">
              {/* Heart Button Badge */}
              <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow hover:bg-white text-rose-500 transition-colors z-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>

              <div className="relative overflow-hidden aspect-[4/3] bg-slate-50 flex items-center justify-center p-4">
                <img 
                  src={a3} 
                  alt="BMW X1 sDrive20d" 
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 text-left flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-lg font-bold text-slate-950">BMW X1 sDrive20d</h3>
                  <span className="text-xs text-slate-500 font-medium">2022 · 1st Owner</span>

                  {/* Specs */}
                  <div className="grid grid-cols-3 gap-2 py-4 border-t border-b border-slate-100 text-[11px] text-slate-500 font-medium my-4">
                    <div className="flex items-center space-x-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      <span>2022</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path d="M12 2a10 10 0 00-7.07 17.07L12 12V4" />
                        <path d="M19.07 19.07A10 10 0 0012 2" strokeDasharray="2 2" />
                      </svg>
                      <span>38,000 km</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path d="M3 22h12M4 2v15h10V2H4zM14 9h3a2 2 0 012 2v6a2 2 0 002 2h1" />
                        <path d="M9 6h2v3H9z" />
                      </svg>
                      <span>Diesel</span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-medium mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Los Angeles</span>
                  </div>
                </div>

                {/* Price and Action Row */}
                <div className="flex justify-between items-center mt-auto border-t border-slate-5 pt-4">
                  <div className="flex flex-col text-left">
                    <span className="text-xl font-extrabold text-slate-950">₹23.90 L</span>
                    <span className="text-[10px] text-slate-400 mt-0.5">EMI ₹43,200/mo</span>
                  </div>
                  <a href="#view-bmw" className="bg-slate-950 hover:bg-slate-800 text-white text-xs font-semibold px-6 py-2.5 rounded-full transition-all">
                    View
                  </a>
                </div>
              </div>
            </div>

            {/* Card 3: Toyota Fortuner Legender */}
            <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between group shadow-sm">
              <div className="relative overflow-hidden aspect-[4/3] bg-slate-50 flex items-center justify-center p-4">
                <img 
                  src={a4} 
                  alt="Toyota Fortuner Legender" 
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 text-left flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-lg font-bold text-slate-950">2022 Toyota Fortuner Legender</h3>
                  <span className="text-xs text-slate-500 font-medium">Toyota · Fortuner Legender · 2022</span>

                  {/* Specs */}
                  <div className="grid grid-cols-3 gap-2 py-4 border-t border-b border-slate-100 text-[11px] text-slate-500 font-medium my-4">
                    <div className="flex items-center space-x-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      <span>2022</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path d="M12 2a10 10 0 00-7.07 17.07L12 12V4" />
                        <path d="M19.07 19.07A10 10 0 0012 2" strokeDasharray="2 2" />
                      </svg>
                      <span>28,000 km</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path d="M3 22h12M4 2v15h10V2H4zM14 9h3a2 2 0 012 2v6a2 2 0 002 2h1" />
                        <path d="M9 6h2v3H9z" />
                      </svg>
                      <span>Diesel</span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center space-x-1.5 text-xs text-slate-500 font-medium mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Los Angeles</span>
                  </div>
                </div>

                {/* Price and Action Row */}
                <div className="flex justify-between items-center mt-auto border-t border-slate-5 pt-4">
                  <div className="flex flex-col text-left">
                    <span className="text-xl font-extrabold text-slate-950">₹39.00 L</span>
                    <span className="text-[10px] text-slate-400 mt-0.5">EMI ₹58,200/mo</span>
                  </div>
                  <a href="#view-fortuner" className="bg-slate-950 hover:bg-slate-800 text-white text-xs font-semibold px-6 py-2.5 rounded-full transition-all">
                    View
                  </a>
                </div>
              </div>
            </div>

            {/* Card 4: Honda Elevate */}
            <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between group shadow-sm">
              <div className="relative overflow-hidden aspect-[4/3] bg-slate-50 flex items-center justify-center p-4">
                <img 
                  src={a5} 
                  alt="Honda Elevate" 
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 text-left flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-lg font-bold text-slate-950">2024 Honda Elevate ZX CVT</h3>
                  <span className="text-xs text-slate-500 font-medium">2024 · 1st Owner</span>

                  {/* Specs */}
                  <div className="grid grid-cols-3 gap-2 py-4 border-t border-b border-slate-100 text-[11px] text-slate-500 font-medium my-4">
                    <div className="flex items-center space-x-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      <span>2024</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path d="M12 2a10 10 0 00-7.07 17.07L12 12V4" />
                        <path d="M19.07 19.07A10 10 0 0012 2" strokeDasharray="2 2" />
                      </svg>
                      <span>15,450 km</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path d="M3 22h12M4 2v15h10V2H4zM14 9h3a2 2 0 012 2v6a2 2 0 002 2h1" />
                        <path d="M9 6h2v3H9z" />
                      </svg>
                      <span>Petrol</span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-medium mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Kochi, Kerala</span>
                  </div>
                </div>

                {/* Price and Action Row */}
                <div className="flex justify-between items-center mt-auto border-t border-slate-5 pt-4">
                  <div className="flex flex-col text-left">
                    <span className="text-xl font-extrabold text-slate-950">₹15.95 L</span>
                    <span className="text-[10px] text-slate-400 mt-0.5">EMI ₹28,950/mo</span>
                  </div>
                  <a href="#view-elevate" className="bg-slate-950 hover:bg-slate-800 text-white text-xs font-semibold px-6 py-2.5 rounded-full transition-all">
                    View
                  </a>
                </div>
              </div>
            </div>

            {/* Card 5: Hyundai Creta */}
            <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between group shadow-sm">
              <div className="relative overflow-hidden aspect-[4/3] bg-slate-50 flex items-center justify-center p-4">
                <img 
                  src={a6} 
                  alt="Hyundai Creta" 
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 text-left flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-lg font-bold text-slate-950">2023 Hyundai Creta SX(O) IVT</h3>
                  <span className="text-xs text-slate-500 font-medium">22,350 km</span>

                  {/* Specs */}
                  <div className="grid grid-cols-3 gap-2 py-4 border-t border-b border-slate-100 text-[11px] text-slate-500 font-medium my-4">
                    <div className="flex items-center space-x-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      <span>2023</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path d="M12 2a10 10 0 00-7.07 17.07L12 12V4" />
                        <path d="M19.07 19.07A10 10 0 0012 2" strokeDasharray="2 2" />
                      </svg>
                      <span>22,350 km</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path d="M3 22h12M4 2v15h10V2H4zM14 9h3a2 2 0 012 2v6a2 2 0 002 2h1" />
                        <path d="M9 6h2v3H9z" />
                      </svg>
                      <span>Petrol</span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center space-x-1.5 text-xs text-slate-500 font-medium mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Kochi, Kerala</span>
                  </div>
                </div>

                {/* Price and Action Row */}
                <div className="flex justify-between items-center mt-auto border-t border-slate-5 pt-4">
                  <div className="flex flex-col text-left">
                    <span className="text-xl font-extrabold text-slate-950">₹16.80 L</span>
                    <span className="text-[10px] text-slate-400 mt-0.5">EMI ₹31,850/mo</span>
                  </div>
                  <a href="#view-creta" className="bg-slate-950 hover:bg-slate-800 text-white text-xs font-semibold px-6 py-2.5 rounded-full transition-all">
                    View
                  </a>
                </div>
              </div>
            </div>

            {/* Card 6: Kia Seltos */}
            <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between group shadow-sm">
              <div className="relative overflow-hidden aspect-[4/3] bg-slate-50 flex items-center justify-center p-4">
                <img 
                  src={a7} 
                  alt="Kia Seltos" 
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 text-left flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-lg font-bold text-slate-950">2022 Kia Seltos GTX+ DCT</h3>
                  <span className="text-xs text-slate-500 font-medium">2022 · 1st Owner</span>

                  {/* Specs */}
                  <div className="grid grid-cols-3 gap-2 py-4 border-t border-b border-slate-100 text-[11px] text-slate-500 font-medium my-4">
                    <div className="flex items-center space-x-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      <span>2022</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path d="M12 2a10 10 0 00-7.07 17.07L12 12V4" />
                        <path d="M19.07 19.07A10 10 0 0012 2" strokeDasharray="2 2" />
                      </svg>
                      <span>22,000 km</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path d="M3 22h12M4 2v15h10V2H4zM14 9h3a2 2 0 012 2v6a2 2 0 002 2h1" />
                        <path d="M9 6h2v3H9z" />
                      </svg>
                      <span>Petrol</span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center space-x-1.5 text-xs text-slate-500 font-medium mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Ernakulam, Kerala</span>
                  </div>
                </div>

                {/* Price and Action Row */}
                <div className="flex justify-between items-center mt-auto border-t border-slate-5 pt-4">
                  <div className="flex flex-col text-left">
                    <span className="text-xl font-extrabold text-slate-950">₹15.25 L</span>
                    <span className="text-[10px] text-slate-400 mt-0.5">EMI ₹29,150/mo</span>
                  </div>
                  <a href="#view-seltos" className="bg-slate-950 hover:bg-slate-800 text-white text-xs font-semibold px-6 py-2.5 rounded-full transition-all">
                    View
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Finance Section */}
      <section className="bg-[#030712] py-24 px-6 border-t border-slate-900">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          {/* Left Column: Text Content and Highlighting Stats */}
          <div className="w-full lg:w-1/2 text-left">
            <span className="text-amber-500 text-xs font-bold uppercase tracking-wider block mb-4">Finance</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
              Your Dream Car is <br /> Closer Than You Think
            </h2>
            <p className="text-slate-400 text-sm md:text-base mb-10 leading-relaxed max-w-xl">
              Access competitive finance rates from 18+ lenders. Get pre-approved in minutes and drive home today.
            </p>

            {/* Grid Highlights */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-6 hover:border-slate-700 transition-colors">
                <span className="text-3xl font-extrabold text-white block mb-1">7.9%</span>
                <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Starting Rate p.a.</span>
              </div>
              <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-6 hover:border-slate-700 transition-colors">
                <span className="text-3xl font-extrabold text-white block mb-1">84 mo</span>
                <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Max Tenure</span>
              </div>
              <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-6 hover:border-slate-700 transition-colors">
                <span className="text-3xl font-extrabold text-white block mb-1">₹5 Cr</span>
                <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Max Loan Amount</span>
              </div>
              <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-6 hover:border-slate-700 transition-colors">
                <span className="text-3xl font-extrabold text-white block mb-1">4 hrs</span>
                <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Avg Approval Time</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive EMI Calculator Widget */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="bg-[#0B0F19] border border-slate-800 rounded-2xl p-8 w-full max-w-lg shadow-2xl relative overflow-hidden">
              <h3 className="text-lg font-bold text-white text-left mb-8 border-b border-slate-900 pb-4">EMI Calculator</h3>

              {/* Slider 1: Loan Amount */}
              <div className="mb-8">
                <div className="flex justify-between items-center text-sm font-semibold mb-3">
                  <span className="text-slate-400">Loan Amount</span>
                  <span className="text-white text-base">₹ {loanAmount} L</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="150"
                  step="1"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-2 font-medium">
                  <span>₹ 5 L</span>
                  <span>₹ 1.5 Cr</span>
                </div>
              </div>

              {/* Slider 2: Loan Tenure */}
              <div className="mb-8">
                <div className="flex justify-between items-center text-sm font-semibold mb-3">
                  <span className="text-slate-400">Loan Tenure</span>
                  <span className="text-white text-base">{loanTenure} {loanTenure === 1 ? 'Year' : 'Years'}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="7"
                  step="1"
                  value={loanTenure}
                  onChange={(e) => setLoanTenure(Number(e.target.value))}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-2 font-medium">
                  <span>1 Year</span>
                  <span>7 Years</span>
                </div>
              </div>

              {/* Output Panel */}
              <div className="bg-slate-900/60 rounded-xl p-6 border border-slate-800 text-center mb-8">
                <span className="text-xs text-slate-400 font-semibold block mb-1">Monthly EMI</span>
                <span className="text-3xl font-black text-white">₹ {formattedEmi}</span>
                <span className="text-[10px] text-slate-500 block mt-1.5 font-medium uppercase tracking-wider">
                  at 9% p.a. | {loanTenure} {loanTenure === 1 ? 'year' : 'years'}
                </span>
              </div>

              {/* Apply Button */}
              <button className="w-full py-3.5 bg-transparent border border-slate-700 hover:border-slate-500 hover:bg-slate-900 text-white rounded-lg font-bold text-xs uppercase tracking-wider transition-all cursor-pointer">
                Apply for Finance
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section (Light Theme) */}
      <section className="bg-white text-slate-900 py-24 px-6 border-b border-slate-100">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-left mb-16">
            <span className="inline-flex items-center px-3.5 py-1 rounded-full border border-slate-200 text-xs font-semibold text-slate-500 mb-4 bg-slate-50">
              Process
            </span>
            <h2 className="text-4xl font-extrabold text-slate-950 mb-3">From browsing to driveway.</h2>
            <p className="text-slate-500 text-sm max-w-xl leading-relaxed">
              From browsing to driving — your journey to the perfect car in four simple steps.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="bg-[#F8F9FA] rounded-2xl p-8 border border-slate-100 hover:shadow-lg hover:border-slate-200 transition-all duration-300 text-left flex flex-col justify-between h-64">
              <span className="text-slate-200 text-5xl font-black block leading-none select-none">01</span>
              <div>
                <h3 className="text-lg font-bold text-slate-950 mb-2">Browse & shortlist</h3>
                <p className="text-slate-500 text-xs leading-relaxed font-medium">
                  Explore our curated inventory. Compare side by side, save your favorites.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#F8F9FA] rounded-2xl p-8 border border-slate-100 hover:shadow-lg hover:border-slate-200 transition-all duration-300 text-left flex flex-col justify-between h-64">
              <span className="text-slate-200 text-5xl font-black block leading-none select-none">02</span>
              <div>
                <h3 className="text-lg font-bold text-slate-950 mb-2">Inspect & test drive</h3>
                <p className="text-slate-500 text-xs leading-relaxed font-medium">
                  Book a doorstep test drive. Review our 220-point inspection report.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#F8F9FA] rounded-2xl p-8 border border-slate-100 hover:shadow-lg hover:border-slate-200 transition-all duration-300 text-left flex flex-col justify-between h-64">
              <span className="text-slate-200 text-5xl font-black block leading-none select-none">03</span>
              <div>
                <h3 className="text-lg font-bold text-slate-950 mb-2">Finance & paperwork</h3>
                <p className="text-slate-500 text-xs leading-relaxed font-medium">
                  Get instant finance pre-approval. We handle RC transfer end to end.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-[#F8F9FA] rounded-2xl p-8 border border-slate-100 hover:shadow-lg hover:border-slate-200 transition-all duration-300 text-left flex flex-col justify-between h-64">
              <span className="text-slate-200 text-5xl font-black block leading-none select-none">04</span>
              <div>
                <h3 className="text-lg font-bold text-slate-950 mb-2">Drive home</h3>
                <p className="text-slate-500 text-xs leading-relaxed font-medium">
                  Your car is delivered to your door, fully detailed and ready to drive.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section (Light Theme) */}
      <section className="bg-white text-slate-900 py-24 px-6 border-b border-slate-100">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-left mb-16">
            <span className="inline-flex items-center px-3.5 py-1 rounded-full border border-slate-200 text-xs font-semibold text-slate-500 mb-4 bg-slate-50">
              Testimonials
            </span>
            <h2 className="text-4xl font-extrabold text-slate-950 mb-3">What Our Clients Say</h2>
            <p className="text-slate-500 text-sm max-w-xl leading-relaxed">
              Join thousands of satisfied buyers who found their dream car through AutoVault.
            </p>
          </div>

          {/* Testimonial Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between text-left h-72">
              <div>
                {/* Quote Icon */}
                <svg className="w-8 h-8 text-slate-200 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                {/* Rating */}
                <div className="flex space-x-1 mb-4 text-amber-500 text-sm">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
                {/* Feedback */}
                <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-medium">
                  "The entire experience was seamless. From browsing to financing to delivery—AutoVault made buying a pre-owned luxury car feel like a first-class experience."
                </p>
              </div>
              <div className="mt-6 border-t border-slate-50 pt-4">
                <h4 className="text-sm font-bold text-slate-950">Arjun Mehta</h4>
                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">BMW 5 Series Owner · Mumbai</p>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between text-left h-72">
              <div>
                <svg className="w-8 h-8 text-slate-200 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <div className="flex space-x-1 mb-4 text-amber-500 text-sm">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
                <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-medium">
                  "I was skeptical about buying pre-owned, but the 200-point inspection report gave me complete confidence. The car arrived in showroom condition."
                </p>
              </div>
              <div className="mt-6 border-t border-slate-50 pt-4">
                <h4 className="text-sm font-bold text-slate-950">Priya Sharma</h4>
                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Mercedes GLC Owner · Delhi</p>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between text-left h-72">
              <div>
                <svg className="w-8 h-8 text-slate-200 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <div className="flex space-x-1 mb-4 text-amber-500 text-sm">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
                <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-medium">
                  "Outstanding service and transparency. The team went above and beyond to ensure I found the perfect car. Highly recommend AutoVault."
                </p>
              </div>
              <div className="mt-6 border-t border-slate-50 pt-4">
                <h4 className="text-sm font-bold text-slate-950">Vikram Singh</h4>
                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">BMW 5 Series Owner · Mumbai</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sell Your Car Section */}
      <section className="bg-white text-slate-900 py-24 px-6 border-b border-slate-100">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          {/* Left Column: Sell Car Information */}
          <div className="w-full lg:w-1/2 text-left">
            <span className="text-slate-500 text-xs font-bold uppercase tracking-widest block mb-4">Sell Your Car</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-950 mb-6 leading-tight">
              Get the best price <br /> for your vehicle
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-10 max-w-xl">
              Skip the hassle of private selling. Get an instant valuation and sell your car to our network of verified dealers.
            </p>

            {/* Feature Bullets */}
            <div className="flex flex-wrap gap-x-8 gap-y-3 mb-10 text-xs md:text-sm font-bold text-slate-800">
              <div className="flex items-center space-x-2">
                <span className="text-amber-500 text-base">•</span>
                <span>Best market price guaranteed</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-amber-500 text-base">•</span>
                <span>Instant online valuation</span>
              </div>
            </div>

            {/* CTA Button */}
            <a 
              href="#valuation" 
              className="inline-flex items-center space-x-2 bg-[#E05E1B] hover:bg-[#c95013] text-white px-6 py-3.5 rounded font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-orange-950/20"
            >
              <span>Get Free Valuation</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

          {/* Right Column: Visual Mockup */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl border border-slate-100">
              <img 
                src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=800" 
                alt="Luxury Car Interior" 
                className="w-full h-80 object-cover"
              />
              
              {/* Overlay Badge */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-slate-200/50 text-left">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Average Selling Time</span>
                <span className="text-xl font-extrabold text-slate-950">48 hours</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dealer Network Section */}
      <section className="bg-[#030712] py-24 px-6 border-t border-slate-900 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="text-slate-500 text-xs font-bold uppercase tracking-widest block mb-4">Partner with us</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
            Join the AutoVault <br /> Dealer Network
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-12 max-w-2xl mx-auto">
            Access thousands of qualified buyers, advanced analytics, and premium listing features for your dealership.
          </p>

          {/* Highlights Row */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-3xl mx-auto mb-12">
            <div className="flex-1 bg-slate-900/40 border border-slate-800/80 px-6 py-4 rounded-xl text-center">
              <span className="text-xs text-slate-300 font-semibold uppercase tracking-wider">10,000+ monthly buyers</span>
            </div>
            <div className="flex-1 bg-slate-900/40 border border-slate-800/80 px-6 py-4 rounded-xl text-center">
              <span className="text-xs text-slate-300 font-semibold uppercase tracking-wider">3x more leads</span>
            </div>
            <div className="flex-1 bg-slate-900/40 border border-slate-800/80 px-6 py-4 rounded-xl text-center">
              <span className="text-xs text-slate-300 font-semibold uppercase tracking-wider">Zero listing fees</span>
            </div>
          </div>

          {/* CTA button */}
          <a 
            href="#register" 
            className="inline-flex items-center space-x-2 bg-[#E05E1B] hover:bg-[#c95013] text-white px-8 py-3.5 rounded font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-orange-950/20"
          >
            <span>Register as Dealer</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white text-slate-900 py-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold uppercase tracking-wider mb-4">
              Got Questions?
            </span>
            <h2 className="text-4xl font-extrabold text-slate-950 mb-3">Frequently Asked Questions</h2>
            <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
              Everything you need to know about buying and selling pre-owned cars.
            </p>
          </div>

          {/* FAQ Accordion list */}
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = expandedFaq === index
              return (
                <div 
                  key={index} 
                  className={`bg-slate-50 border rounded-xl overflow-hidden transition-all duration-355 ${
                    isOpen ? 'border-purple-200 shadow-sm' : 'border-slate-100 hover:border-slate-200'
                  }`}
                >
                  {/* Question Header */}
                  <button 
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center font-bold text-slate-950 text-xs md:text-sm transition-colors cursor-pointer select-none"
                  >
                    <span>{faq.question}</span>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-4 w-4 text-purple-600 transition-transform duration-300 flex-shrink-0 ml-4 ${
                        isOpen ? 'rotate-180' : ''
                      }`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Answer Panel */}
                  <div 
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? 'max-h-48 border-t border-slate-100' : 'max-h-0'
                    }`}
                  >
                    <div className="px-6 py-5 text-left text-xs md:text-sm text-slate-500 leading-relaxed font-medium">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
