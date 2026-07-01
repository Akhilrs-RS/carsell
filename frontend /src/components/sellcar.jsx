import React, { useState } from 'react'
import bcImg from '../assets/bc.png'

export default function SellCar({ onNavigate }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [step, setStep] = useState(1)

  const steps = [
    { id: 1, label: 'Car Details' },
    { id: 2, label: 'Upload Photos' },
    { id: 3, label: 'Schedule Inspection' },
    { id: 4, label: 'Submit' }
  ]

  return (
    <div className="bg-white text-slate-900 min-h-screen pb-24">
      {/* Hero Section (Dark Theme) */}
      <section className="relative w-full min-h-[75vh] flex flex-col justify-center pt-28 pb-16 px-6 overflow-hidden bg-slate-950 text-white">
        {/* Background Image: bc.png */}
        <div className="absolute inset-0 w-full h-full z-0">
          <img
            src={bcImg}
            alt="Sell Car Background"
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
              SELL YOUR CAR
            </span>

            {/* Main Title */}
            <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6 font-serif">
              Get the best price <br />
              for your vehicle
            </h1>

            {/* Subtitle */}
            <p className="text-slate-300 max-w-lg text-sm leading-relaxed mb-8">
              Browse verified luxury vehicles with transparent pricing and instant finance.
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

      {/* Main Form Section (Light Theme) */}
      <section className="max-w-4xl mx-auto px-6 py-12 -mt-12 relative z-30">
        {/* Stepper */}
        <div className="flex items-center justify-center mb-10">
          {steps.map((s, idx) => {
            const isCompleted = step > s.id
            const isActive = step === s.id

            return (
              <React.Fragment key={s.id}>
                <div 
                  onClick={() => {
                    if (s.id < step) setStep(s.id)
                  }}
                  className={`flex flex-col items-center ${s.id < step ? 'cursor-pointer group' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-sm z-10 relative transition-all ${
                    isCompleted 
                      ? 'bg-emerald-500 text-white group-hover:bg-emerald-600 shadow-emerald-500/20' 
                      : isActive 
                        ? 'bg-slate-900 text-white shadow-md' 
                        : 'bg-slate-200 text-slate-500'
                  }`}>
                    {isCompleted ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      s.id
                    )}
                  </div>
                  <span className={`text-[10px] mt-2 transition-colors ${
                    isCompleted 
                      ? 'text-slate-900 font-bold group-hover:text-emerald-600' 
                      : isActive 
                        ? 'text-slate-900 font-bold' 
                        : 'text-slate-400 font-medium'
                  }`}>
                    {s.label}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div className={`w-12 md:w-16 h-px -mt-5 mx-1 md:mx-2 transition-colors ${
                    step > s.id ? 'bg-emerald-500' : 'bg-slate-200'
                  }`} />
                )}
              </React.Fragment>
            )
          })}
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8 md:p-12 transition-all">
          
          {/* STEP 1: CAR DETAILS */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-serif font-bold text-slate-900 mb-8">Car Details</h2>
              
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Brand */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Brand</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Porsche" 
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-full px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-slate-400 focus:bg-white transition-colors"
                    />
                  </div>

                  {/* Model */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Model</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 911 Carrera S" 
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-full px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-slate-400 focus:bg-white transition-colors"
                    />
                  </div>

                  {/* Year */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Year</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 2022" 
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-full px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-slate-400 focus:bg-white transition-colors"
                    />
                  </div>

                  {/* KM Driven */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">KM Driven</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 18,400" 
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-full px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-slate-400 focus:bg-white transition-colors"
                    />
                  </div>

                  {/* Color */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Color</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Arctic Silver" 
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-full px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-slate-400 focus:bg-white transition-colors"
                    />
                  </div>

                  {/* Fuel Type */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Fuel Type</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Petrol" 
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-full px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-slate-400 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                {/* Continue Button */}
                <div className="pt-6">
                  <button 
                    type="submit" 
                    className="w-full bg-[#404040] hover:bg-slate-900 text-white font-semibold rounded-full py-4 text-sm transition-colors shadow-md"
                  >
                    Continue
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 2: UPLOAD PHOTOS */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-serif font-bold text-slate-900 mb-8">Upload Photos</h2>
              
              <div className="space-y-6">
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer group">
                  <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-slate-500 mb-4 border border-slate-100 group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-slate-700 block mb-1">Drop photos here</span>
                  <span className="text-xs text-slate-400">or click to browse from your device</span>
                </div>

                <p className="text-xs text-slate-400 text-center block mb-8">
                  Upload up to 10 images in JPG or PNG format. Maximum size 5MB per image.
                </p>

                <div className="pt-4 flex gap-4">
                  <button 
                    type="button" 
                    onClick={() => setStep(1)}
                    className="w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-full py-4 text-sm transition-colors"
                  >
                    Back
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setStep(3)}
                    className="w-2/3 bg-[#404040] hover:bg-slate-900 text-white font-semibold rounded-full py-4 text-sm transition-colors shadow-md"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: SCHEDULE INSPECTION */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-serif font-bold text-slate-900 mb-8">Schedule Inspection</h2>
              
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setStep(4); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Preferred Date</label>
                      <input 
                        type="date" 
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-full px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-slate-400 focus:bg-white transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Inspection Address</label>
                      <textarea 
                        rows="3"
                        required
                        placeholder="Enter complete address" 
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-slate-400 focus:bg-white transition-colors resize-none"
                      ></textarea>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Time Slot</label>
                      <select className="w-full bg-slate-50 border border-slate-200 rounded-full px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-slate-400 focus:bg-white transition-colors">
                        <option>Morning (9:00 AM - 12:00 PM)</option>
                        <option>Afternoon (12:00 PM - 4:00 PM)</option>
                        <option>Evening (4:00 PM - 7:00 PM)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Contact Number</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="+91 98765 43210" 
                        className="w-full bg-slate-50 border border-slate-200 rounded-full px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-slate-400 focus:bg-white transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex gap-4">
                  <button 
                    type="button" 
                    onClick={() => setStep(2)}
                    className="w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-full py-4 text-sm transition-colors"
                  >
                    Back
                  </button>
                  <button 
                    type="submit" 
                    className="w-2/3 bg-[#404040] hover:bg-slate-900 text-white font-semibold rounded-full py-4 text-sm transition-colors shadow-md"
                  >
                    Confirm & Schedule
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 4: YOUR DETAILS */}
          {step === 4 && (
            <div>
              <h2 className="text-2xl font-serif font-bold text-slate-900 mb-8">Your Details</h2>
              
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setStep(5); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Arjun Mehta" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-full px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-slate-400 focus:bg-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="+91 98765 43210" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-full px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-slate-400 focus:bg-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                    <input 
                      type="email" 
                      required
                      placeholder="arjun@gmail.com" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-full px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-slate-400 focus:bg-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">City</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Mumbai" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-full px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-slate-400 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div className="pt-4 flex gap-4">
                  <button 
                    type="button" 
                    onClick={() => setStep(3)}
                    className="w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-full py-4 text-sm transition-colors"
                  >
                    Back
                  </button>
                  <button 
                    type="submit" 
                    className="w-2/3 bg-[#404040] hover:bg-slate-900 text-white font-semibold rounded-full py-4 text-sm transition-colors shadow-md"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 5: SUCCESS / SUBMITTED */}
          {step === 5 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-serif font-bold text-slate-900 mb-3">Request Submitted!</h2>
              <p className="text-sm text-slate-500 max-w-md mx-auto mb-8 leading-relaxed">
                Our team will review your details and contact you within 24 hours to confirm the inspection.
              </p>
              <button 
                type="button"
                onClick={() => {
                  setStep(1)
                  if (onNavigate) onNavigate('home')
                }}
                className="inline-flex items-center space-x-2 text-emerald-600 font-bold text-sm hover:text-emerald-700 transition-colors cursor-pointer group"
              >
                <span>Return to Homepage</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          )}

        </div>
      </section>
    </div>
  )
}
