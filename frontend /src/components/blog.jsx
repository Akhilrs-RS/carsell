import React, { useState } from 'react'
import bcImg from '../assets/bc.png'

import f1 from '../assets/f1.png'
import f2 from '../assets/f2.png'
import f3 from '../assets/f3.png'
import f4 from '../assets/f4.png'
import f5 from '../assets/f5.png'
import f6 from '../assets/f6.jpg'

export default function Blog({ onNavigate, setInitialSearchQuery }) {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault()
    if (setInitialSearchQuery) {
      setInitialSearchQuery(searchQuery)
    }
    if (onNavigate) {
      onNavigate('buy')
    }
  }

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen pb-24">
      {/* Hero Section (Dark Theme) */}
      <section className="relative w-full min-h-[75vh] flex flex-col justify-center pt-28 pb-16 px-6 overflow-hidden bg-slate-950 text-white">
        {/* Background Image: bc.png */}
        <div className="absolute inset-0 w-full h-full z-0">
          <img
            src={bcImg}
            alt="Blog Background"
            className="w-full h-full object-cover object-center pointer-events-none"
          />
          {/* Gradients matching the screenshot style */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/20 z-10" />
        </div>

        {/* Content Area */}
        <div className="max-w-7xl mx-auto w-full relative z-20">
          <div className="max-w-2xl text-left">
            {/* Page Header */}
            <span className="text-slate-300 text-xs font-semibold uppercase tracking-widest block mb-4">
              THE GARAGE
            </span>

            {/* Main Title */}
            <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6 font-serif">
              Expert Automotive <br />
              Insights
            </h1>

            {/* Subtitle */}
            <p className="text-slate-300 max-w-lg text-sm leading-relaxed mb-8">
              Buying guides, finance tips, market analysis, and driving stories.
            </p>

            {/* Search Box Row */}
            <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md w-full">
              <div className="relative flex-grow">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Search by brand, model..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900/60 border border-slate-800 rounded-full py-2.5 pl-10 pr-4 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-white focus:ring-1 focus:ring-white"
                />
              </div>
              <button 
                type="submit"
                className="bg-white hover:bg-slate-100 text-slate-950 font-bold px-6 py-2.5 rounded-full text-xs transition-all shadow-md cursor-pointer"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-30">
        {/* Featured Article */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 flex flex-col md:flex-row mb-12">
          {/* Image */}
          <div className="md:w-1/2 h-64 md:h-auto relative">
            <img 
              src={f1} 
              alt="Featured Article" 
              className="w-full h-full object-cover"
            />
          </div>
          {/* Content */}
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <div className="flex items-center space-x-3 mb-4">
              <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-3 py-1 rounded-full">
                Buying Tips
              </span>
              <span className="text-slate-400 text-[10px] font-medium uppercase tracking-widest">
                Featured Article
              </span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4 font-serif leading-tight">
              The Complete Guide to Buying a Pre-Owned Luxury Car in 2025
            </h2>
            
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Everything you need to know about inspections, documentation, financing, and negotiation when buying a pre-owned luxury vehicle.
            </p>
            
            <div className="flex items-center text-[11px] font-semibold text-slate-400 space-x-2">
              <span>June 18, 2025</span>
              <span>•</span>
              <span>8 min read</span>
            </div>
          </div>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Article 2 */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-slate-100 hover:shadow-xl transition-shadow flex flex-col">
            <div className="h-48 overflow-hidden">
              <img src={f2} alt="Article 2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"/>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center space-x-3 mb-3">
                <span className="bg-blue-50 text-blue-600 text-[9px] font-bold px-2.5 py-1 rounded-full">Buying Tips</span>
                <span className="text-slate-400 text-[10px] font-semibold">6 min read</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight">The Complete Guide to Buying a Pre-Owned Car in 2025</h3>
              <p className="text-slate-500 text-xs leading-relaxed mb-4 flex-grow">
                Everything you need to know about inspections, documentation, financing, and negotiation when buying a pre-owned vehicle.
              </p>
              <div className="text-[10px] font-semibold text-slate-400">June 12, 2025</div>
            </div>
          </div>

          {/* Article 3 */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-slate-100 hover:shadow-xl transition-shadow flex flex-col">
            <div className="h-48 overflow-hidden">
              <img src={f3} alt="Article 3" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"/>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center space-x-3 mb-3">
                <span className="bg-blue-50 text-blue-600 text-[9px] font-bold px-2.5 py-1 rounded-full">Comparisons</span>
                <span className="text-slate-400 text-[10px] font-semibold">6 min read</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight">Electric vs Hybrid: Which Pre-Owned Car Should You Buy?</h3>
              <p className="text-slate-500 text-xs leading-relaxed mb-4 flex-grow">
                An in-depth comparison of the three performance flagships — performance metrics, ownership costs, and resale value analyzed.
              </p>
              <div className="text-[10px] font-semibold text-slate-400">June 12, 2025</div>
            </div>
          </div>

          {/* Article 4 */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-slate-100 hover:shadow-xl transition-shadow flex flex-col">
            <div className="h-48 overflow-hidden">
              <img src={f4} alt="Article 4" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"/>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center space-x-3 mb-3">
                <span className="bg-blue-50 text-blue-600 text-[9px] font-bold px-2.5 py-1 rounded-full">Finance Tips</span>
                <span className="text-slate-400 text-[10px] font-semibold">5 min read</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight">Understanding Car Loan EMI: A Complete Guide</h3>
              <p className="text-slate-500 text-xs leading-relaxed mb-4 flex-grow">
                Insider strategies to lower your EMI, choose the right lender, and structure your loan for maximum savings over the term.
              </p>
              <div className="text-[10px] font-semibold text-slate-400">June 5, 2025</div>
            </div>
          </div>

          {/* Article 5 */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-slate-100 hover:shadow-xl transition-shadow flex flex-col">
            <div className="h-48 overflow-hidden">
              <img src={f5} alt="Article 5" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"/>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center space-x-3 mb-3">
                <span className="bg-blue-50 text-blue-600 text-[9px] font-bold px-2.5 py-1 rounded-full">Maintenance</span>
                <span className="text-slate-400 text-[10px] font-semibold">5 min read</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight">Essential Car Maintenance Tips for Monsoon Season</h3>
              <p className="text-slate-500 text-xs leading-relaxed mb-4 flex-grow">
                Protect your vehicle during the rainy season with these expert maintenance tips.
              </p>
              <div className="text-[10px] font-semibold text-slate-400">June 5, 2025</div>
            </div>
          </div>

          {/* Article 6 */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-slate-100 hover:shadow-xl transition-shadow flex flex-col">
            <div className="h-48 overflow-hidden">
              <img src={f6} alt="Article 6" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"/>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center space-x-3 mb-3">
                <span className="bg-blue-50 text-blue-600 text-[9px] font-bold px-2.5 py-1 rounded-full">Industry News</span>
                <span className="text-slate-400 text-[10px] font-semibold">5 min read</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight">The Future of India's Pre-Owned Car Market</h3>
              <p className="text-slate-500 text-xs leading-relaxed mb-4 flex-grow">
                Industry trends, digital transformation, and what buyers can expect in the coming years.
              </p>
              <div className="text-[10px] font-semibold text-slate-400">June 15, 2025</div>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
