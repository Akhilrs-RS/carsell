import React, { useState } from 'react'
import bcImg from '../assets/bc.png'

export default function Contact() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="bg-white text-slate-900 min-h-screen pb-24">
      {/* Hero Section (Dark Theme) */}
      <section className="relative w-full min-h-[75vh] flex flex-col justify-center pt-28 pb-16 px-6 overflow-hidden bg-slate-950 text-white">
        {/* Background Image: bc.png */}
        <div className="absolute inset-0 w-full h-full z-0">
          <img
            src={bcImg}
            alt="Contact Background"
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
            <div className="flex flex-col sm:flex-row gap-3 max-w-md w-full">
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
              <button className="bg-white hover:bg-slate-100 text-slate-950 font-bold px-6 py-2.5 rounded-full text-xs transition-all shadow-md">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-6 py-12 -mt-10 relative z-30">
        {/* Info Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1: Call Us */}
          <div className="bg-white rounded-2xl p-6 flex items-start space-x-4 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="bg-blue-50 text-blue-500 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 mb-1">Call Us</h3>
              <p className="text-sm font-semibold text-slate-700 mb-1">+91 88765 43210</p>
              <p className="text-[10px] text-slate-400 font-medium">Mon-Sat, 9AM-7PM IST</p>
            </div>
          </div>

          {/* Card 2: Email Us */}
          <div className="bg-white rounded-2xl p-6 flex items-start space-x-4 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="bg-emerald-50 text-emerald-500 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 mb-1">Email Us</h3>
              <p className="text-sm font-semibold text-slate-700 mb-1">support@autoflow.in</p>
              <p className="text-[10px] text-slate-400 font-medium">Response within 2 hours</p>
            </div>
          </div>

          {/* Card 3: WhatsApp */}
          <div className="bg-white rounded-2xl p-6 flex items-start space-x-4 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="bg-green-50 text-green-500 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 mb-1">WhatsApp</h3>
              <p className="text-sm font-semibold text-slate-700 mb-1">+91 88765 43210</p>
              <p className="text-[10px] text-slate-400 font-medium">Instant support 24x7</p>
            </div>
          </div>
        </div>

        {/* Lower Section (Form & Map) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Form Column */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Send a Message</h2>
            <form className="space-y-5">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
                <input 
                  type="text" 
                  placeholder="Arjun Mehta" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-slate-400 focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                <input 
                  type="email" 
                  placeholder="arjun@gmail.com" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-slate-400 focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="+91 89898 00898" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-slate-400 focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Subject</label>
                <input 
                  type="text" 
                  placeholder="" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-slate-400 focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Message</label>
                <textarea 
                  rows="4"
                  placeholder="Tell us how we can help..." 
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-slate-400 focus:bg-white transition-colors resize-none"
                ></textarea>
              </div>

              <div className="pt-2">
                <button 
                  type="button" 
                  className="w-full bg-[#404040] hover:bg-slate-900 text-white font-semibold rounded-full py-4 text-sm transition-colors shadow-md"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

          {/* Map Column */}
          <div className="flex flex-col space-y-6">
            {/* Map Placeholder */}
            <div className="w-full h-72 bg-[#f0f2f5] rounded-3xl flex items-center justify-center relative overflow-hidden border border-slate-100">
              <div className="text-center flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span className="text-xs text-slate-400 font-medium">AutoFlow HQ, BKC, Mumbai 400051</span>
              </div>
            </div>

            {/* Location Detail Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-start space-x-4">
               <div className="bg-blue-50 text-blue-500 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
               </div>
               <div>
                 <h3 className="text-sm font-bold text-slate-900 mb-1">Mumbai (HQ)</h3>
                 <p className="text-xs text-slate-500 leading-relaxed mb-2">Unit 14, Bandra Kurla Complex, Mumbai 400051</p>
                 <a href="tel:+912245678900" className="text-blue-600 text-[11px] font-bold hover:underline">+91 22 4567 8900</a>
               </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
