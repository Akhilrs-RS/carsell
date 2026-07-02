import React, { useState } from 'react'
import bcImg from '../assets/bc.png'

export default function Dealers() {
  const [searchQuery, setSearchQuery] = useState('')
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    dealershipName: '',
    contactPerson: '',
    phoneNumber: '',
    emailAddress: '',
    city: '',
    gstNumber: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)
    setTimeout(() => {
      setFormSubmitted(false)
      setFormData({
        dealershipName: '',
        contactPerson: '',
        phoneNumber: '',
        emailAddress: '',
        city: '',
        gstNumber: ''
      })
    }, 4000)
  }

  return (
    <div className="bg-white text-slate-900 font-sans min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative min-h-[500px] flex items-center justify-center bg-cover bg-center pt-24 pb-16"
        style={{ backgroundImage: `url(${bcImg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/85 to-slate-950/90"></div>
        <div className="relative max-w-7xl mx-auto px-6 w-full text-center sm:text-left z-10">
          <span className="text-[#E05E1B] text-xs font-bold uppercase tracking-widest block mb-3">
            Partner With Us
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4 max-w-2xl font-serif">
            Dealer Registration
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-xl mb-8 leading-relaxed">
            Join India's fastest-growing automotive marketplace and scale your dealership.
          </p>

          {/* Search Box */}
          <div className="flex flex-col sm:flex-row items-center max-w-lg w-full bg-slate-900/60 border border-slate-800 p-2 rounded-xl backdrop-blur gap-2">
            <div className="flex items-center flex-1 w-full px-3">
              <svg className="w-4 h-4 text-slate-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by brand, model..."
                className="w-full bg-transparent border-none text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-0"
              />
            </div>
            <button className="w-full sm:w-auto bg-white hover:bg-slate-200 text-slate-950 px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white border border-slate-200/80 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all text-center">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-5 text-[#E05E1B]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-950 mb-2">50,000+ Verified Buyers</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Access to our premium buyer network across 50+ cities.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-slate-200/80 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all text-center">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-5 text-[#E05E1B]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-950 mb-2">10x More Leads</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Dealers report 10x more qualified leads vs traditional channels.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-slate-200/80 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all text-center">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-5 text-[#E05E1B]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-950 mb-2">Premium Badge</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                MotorElite Certified Dealer badge builds buyer trust instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-center text-slate-950 mb-16">
            Choose Your Plan
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Starter Plan */}
            <div className="bg-white border border-slate-200/80 p-8 rounded-2xl flex flex-col justify-between hover:shadow-lg transition-all">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Starter</h3>
                <div className="flex items-baseline mb-1">
                  <span className="text-3xl font-black text-slate-950">₹4,999</span>
                  <span className="text-slate-500 text-sm ml-2">/month</span>
                </div>
                <span className="text-xs text-[#E05E1B] font-bold tracking-wide uppercase block mb-6">
                  Up to 15 listings
                </span>

                <ul className="space-y-4 text-sm text-slate-600 mb-8">
                  <li className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Basic analytics</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Standard support</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Mobile app access</span>
                  </li>
                </ul>
              </div>
              <button className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-colors mt-auto">
                Get Started
              </button>
            </div>

            {/* Growth Plan - Highlighted */}
            <div className="relative bg-slate-950 text-white p-8 rounded-2xl flex flex-col justify-between shadow-2xl border border-slate-900 transform md:-translate-y-2">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                Most Popular
              </span>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Growth</h3>
                <div className="flex items-baseline mb-1">
                  <span className="text-3xl font-black text-white">₹12,999</span>
                  <span className="text-slate-400 text-sm ml-2">/month</span>
                </div>
                <span className="text-xs text-amber-400 font-bold tracking-wide uppercase block mb-6">
                  Up to 100 listings
                </span>

                <ul className="space-y-4 text-sm text-slate-300 mb-8">
                  <li className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Advanced analytics</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Featured listing slots</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Lead management CRM</span>
                  </li>
                </ul>
              </div>
              <button className="w-full py-3 bg-[#E05E1B] hover:bg-[#c95013] text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors mt-auto">
                Get Started
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white border border-slate-200/80 p-8 rounded-2xl flex flex-col justify-between hover:shadow-lg transition-all">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Enterprise</h3>
                <div className="flex items-baseline mb-1">
                  <span className="text-3xl font-black text-slate-950">Custom</span>
                </div>
                <span className="text-xs text-[#E05E1B] font-bold tracking-wide uppercase block mb-6">
                  Unlimited listings
                </span>

                <ul className="space-y-4 text-sm text-slate-600 mb-8">
                  <li className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>API access</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>White-label portal</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Custom Integrations</span>
                  </li>
                </ul>
              </div>
              <button className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-colors mt-auto">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Register as a Dealer Form */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-xl shadow-slate-200/30">
            <h2 className="text-2xl font-black text-center text-slate-950 mb-10 font-serif">
              Register as a Dealer
            </h2>

            {formSubmitted ? (
              <div className="text-center py-12 text-[#E05E1B] font-bold">
                <svg className="w-16 h-16 mx-auto mb-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-extrabold text-slate-950 mb-1">Registration Submitted!</h3>
                <p className="text-slate-500 text-sm font-normal">Our Dealer Relations team will reach out within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Dealership Name */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Dealership Name
                    </label>
                    <input 
                      type="text" 
                      name="dealershipName"
                      required
                      value={formData.dealershipName}
                      onChange={handleInputChange}
                      placeholder="AutoHub Premium Cars"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400"
                    />
                  </div>

                  {/* Contact Person */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Contact Person
                    </label>
                    <input 
                      type="text" 
                      name="contactPerson"
                      required
                      value={formData.contactPerson}
                      onChange={handleInputChange}
                      placeholder="Rajesh Sharma"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Phone Number
                    </label>
                    <input 
                      type="tel" 
                      name="phoneNumber"
                      required
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400"
                    />
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      name="emailAddress"
                      required
                      value={formData.emailAddress}
                      onChange={handleInputChange}
                      placeholder="rajesh@autohub.in"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400"
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                      City
                    </label>
                    <input 
                      type="text" 
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Mumbai"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400"
                    />
                  </div>

                  {/* GST Number */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                      GST Number
                    </label>
                    <input 
                      type="text" 
                      name="gstNumber"
                      required
                      value={formData.gstNumber}
                      onChange={handleInputChange}
                      placeholder="27AAACX1234M1Z5"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-[#4A4A4A] hover:bg-[#3d3d3d] text-white font-bold rounded-xl text-sm transition-colors mt-6 uppercase tracking-wider"
                >
                  Submit Registration
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
