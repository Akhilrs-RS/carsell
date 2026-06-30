import React, { useState } from 'react'
import bcImg from '../assets/bc.png'

// Imports of vehicle images
import b1 from '../assets/b1.png'
import b2 from '../assets/b2.jpg'
import b3 from '../assets/b3.png'
import b4 from '../assets/b4.png'
import b5 from '../assets/b5.png'
import b6 from '../assets/b6.png'
import b7 from '../assets/b7.png'
import b8 from '../assets/b8.png'
import b9 from '../assets/b9.png'
import b10 from '../assets/b10.png'
import b11 from '../assets/b11.png'
import b12 from '../assets/b12.png'

export default function BuyCar() {
  const [searchQuery, setSearchQuery] = useState('')
  
  // Full catalog dataset
  const vehicles = [
    {
      name: "Toyota Fortuner 4x2 AT",
      brand: "TOYOTA",
      year: "2024",
      km: "28,000 km",
      fuel: "Diesel",
      location: "Mumbai",
      price: "₹29.50 L",
      emi: "EMI ₹20,000/mo",
      image: b1,
      badge: "FEATURED",
      badgeColor: "bg-amber-500",
    },
    {
      name: "Toyota Urban Cruiser Hyryder V",
      brand: "TOYOTA",
      year: "2023",
      km: "18,000 km",
      fuel: "Hybrid",
      location: "Bengaluru",
      price: "₹14.90 L",
      emi: "EMI ₹30,285/mo",
      image: b2,
      badge: "PREMIUM",
      badgeColor: "bg-indigo-500",
    },
    {
      name: "Hyundai Verna SX",
      brand: "HYUNDAI",
      year: "2024",
      km: "12,450 km",
      fuel: "Petrol",
      location: "Chennai",
      price: "₹13.40 L",
      emi: "EMI ₹27,500/mo",
      image: b3,
      badge: "NEW",
      badgeColor: "bg-emerald-500",
    },
    {
      name: "Kia Seltos HTX",
      brand: "KIA",
      year: "2022",
      km: "32,600 km",
      fuel: "Petrol",
      location: "Hyderabad",
      price: "₹14.25 L",
      emi: "EMI ₹29,150/mo",
      image: b4,
      badge: "",
      badgeColor: "",
    },
    {
      name: "Maruti Suzuki Grand Vitara Alpha",
      brand: "MARUTI SUZUKI",
      year: "2023",
      km: "16,300 km",
      fuel: "Hybrid",
      location: "Mumbai",
      price: "₹15.60 L",
      emi: "EMI ₹31,850/mo",
      image: b5,
      badge: "PREMIUM",
      badgeColor: "bg-indigo-500",
    },
    {
      name: "Mercedes-Benz C-Class C220d",
      brand: "MERCEDES-BENZ",
      year: "2021",
      km: "46,200 km",
      fuel: "Diesel",
      location: "Delhi",
      price: "₹24.90 L",
      emi: "EMI ₹50,200/mo",
      image: b6,
      badge: "PREMIUM",
      badgeColor: "bg-indigo-500",
    },
    {
      name: "Honda City ZX CVT",
      brand: "HONDA",
      year: "2023",
      km: "18,900 km",
      fuel: "Petrol",
      location: "Kochi",
      price: "₹12.80 L",
      emi: "EMI ₹25,400/mo",
      image: b7,
      badge: "FEATURED",
      badgeColor: "bg-amber-500",
    },
    {
      name: "BMW X1 sDrive20d",
      brand: "BMW",
      year: "2019",
      km: "54,000 km",
      fuel: "Diesel",
      location: "Bengaluru",
      price: "₹23.90 L",
      emi: "EMI ₹48,200/mo",
      image: b8,
      badge: "PREMIUM",
      badgeColor: "bg-indigo-500",
    },
    {
      name: "Skoda Slavia Style",
      brand: "SKODA",
      year: "2022",
      km: "28,350 km",
      fuel: "Petrol",
      location: "Ahmedabad",
      price: "₹14.60 L",
      emi: "EMI ₹29,500/mo",
      image: b9,
      badge: "NEW",
      badgeColor: "bg-emerald-500",
    },
    {
      name: "Toyota Innova Crysta VX",
      brand: "TOYOTA",
      year: "2021",
      km: "64,700 km",
      fuel: "Diesel",
      location: "Delhi",
      price: "₹18.75 L",
      emi: "EMI ₹37,500/mo",
      image: b10,
      badge: "FEATURED",
      badgeColor: "bg-amber-500",
    },
    {
      name: "Honda Elevate ZX",
      brand: "HONDA",
      year: "2023",
      km: "12,650 km",
      fuel: "Petrol",
      location: "Trivandrum",
      price: "₹15.25 L",
      emi: "EMI ₹30,400/mo",
      image: b11,
      badge: "NEW",
      badgeColor: "bg-emerald-500",
    },
    {
      name: "Audi A4 Premium",
      brand: "AUDI",
      year: "2022",
      km: "41,000 km",
      fuel: "Petrol",
      location: "Mumbai",
      price: "₹21.50 L",
      emi: "EMI ₹43,500/mo",
      image: b12,
      badge: "FEATURED",
      badgeColor: "bg-amber-500",
    }
  ]

  // Filter Logic
  const filteredVehicles = vehicles.filter((car) => {
    return car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           car.brand.toLowerCase().includes(searchQuery.toLowerCase())
  })

  return (
    <div className="bg-white text-slate-900 min-h-screen">
      {/* Hero Section (Dark Theme) */}
      <section className="relative w-full min-h-[85vh] flex flex-col justify-center pt-28 pb-16 px-6 overflow-hidden bg-slate-950 text-white">
        {/* Background Image: bc.png */}
        <div className="absolute inset-0 w-full h-full z-0">
          <img
            src={bcImg}
            alt="Buy Car Background"
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
              BUY A CAR
            </span>

            {/* Main Title */}
            <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6 font-serif">
              Find Your <br />
              Perfect Match
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

      {/* Process Highlights Row */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="border border-slate-200 rounded-xl p-4 flex items-center space-x-4 hover:shadow-sm transition-shadow">
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 border border-slate-100 text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">200+ Points</p>
              <p className="text-[10px] text-slate-500 font-medium">Inspection</p>
            </div>
          </div>
          
          <div className="border border-slate-200 rounded-xl p-4 flex items-center space-x-4 hover:shadow-sm transition-shadow">
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 border border-slate-100 text-amber-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">5-Day</p>
              <p className="text-[10px] text-slate-500 font-medium">Return Guarantee</p>
            </div>
          </div>

          <div className="border border-slate-200 rounded-xl p-4 flex items-center space-x-4 hover:shadow-sm transition-shadow">
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 border border-slate-100 text-emerald-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">7.5% p.a.</p>
              <p className="text-[10px] text-slate-500 font-medium">Finance Rate</p>
            </div>
          </div>

          <div className="border border-slate-200 rounded-xl p-4 flex items-center space-x-4 hover:shadow-sm transition-shadow">
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 border border-slate-100 text-purple-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">48 Hours</p>
              <p className="text-[10px] text-slate-500 font-medium">Avg Sale Time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Selection & Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <span className="text-blue-600 text-[10px] font-bold uppercase tracking-widest block mb-1">CURATED SELECTION</span>
            <h2 className="text-2xl font-extrabold text-slate-900">Recommended for you</h2>
            <p className="text-slate-500 text-xs mt-1 font-medium">{filteredVehicles.length} certified pre-owned vehicles available</p>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <button className="flex items-center space-x-1.5 border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 px-4 py-2 rounded-full text-xs font-semibold transition-colors shadow-sm cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
              <span>Filters</span>
            </button>
            <button className="flex items-center space-x-1.5 border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 px-4 py-2 rounded-full text-xs font-semibold transition-colors shadow-sm cursor-pointer">
              <span>Sort: Recommended</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </button>
          </div>
        </div>

        {/* Cars Grid */}
        {filteredVehicles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map((car, index) => (
              <div key={index} className="bg-white border border-slate-200 rounded-[24px] overflow-hidden hover:shadow-lg hover:border-slate-300 transition-all duration-300 flex flex-col group shadow-sm">
                {/* Image Area */}
                <div className="relative overflow-hidden aspect-[4/3] bg-slate-50 flex items-center justify-center">
                  <img 
                    src={car.image} 
                    alt={car.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Badges */}
                  {car.badge && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className={`${car.badgeColor} text-white text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm`}>
                        {car.badge}
                      </span>
                    </div>
                  )}
                  {/* Action Icons */}
                  <div className="absolute top-4 right-4 flex flex-col space-y-2 z-10">
                    <button className="w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-white shadow-sm transition-colors cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    </button>
                    <button className="w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-400 hover:text-blue-500 hover:bg-white shadow-sm transition-colors cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                    </button>
                  </div>
                </div>

                {/* Details Area */}
                <div className="p-5 flex flex-col flex-grow">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-1">{car.brand}</span>
                  <h3 className="text-sm font-extrabold text-slate-900 mb-2 truncate">{car.name}</h3>
                  <div className="mb-4">
                    <span className="text-lg font-black text-slate-900">{car.price}</span>
                    <span className="text-[10px] text-slate-400 font-medium block">{car.emi}</span>
                  </div>

                  {/* Specs Grid */}
                  <div className="grid grid-cols-4 gap-2 py-3 border-t border-slate-100 text-center mt-auto">
                    <div className="flex flex-col items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                      <span className="text-[9px] text-slate-500 font-semibold">{car.year}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path d="M3 22h12M4 2v15h10V2H4zM14 9h3a2 2 0 012 2v6a2 2 0 002 2h1" /><path d="M9 6h2v3H9z" /></svg>
                      <span className="text-[9px] text-slate-500 font-semibold">{car.fuel}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path d="M12 2a10 10 0 00-7.07 17.07L12 12V4" /><path d="M19.07 19.07A10 10 0 0012 2" strokeDasharray="2 2" /></svg>
                      <span className="text-[9px] text-slate-500 font-semibold">{car.km}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      <span className="text-[9px] text-slate-500 font-semibold truncate w-full px-1" title={car.location}>{car.location}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-4 border-t border-slate-100">
                    <button className="flex-1 border border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-50 py-2 rounded-full text-[11px] font-bold transition-all text-center cursor-pointer">
                      View Details
                    </button>
                    <button className="flex-1 bg-[#1A233A] text-white hover:bg-[#111827] py-2 rounded-full text-[11px] font-bold transition-all text-center shadow-md cursor-pointer">
                      Test Drive
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 border border-slate-200 rounded-3xl">
            <h3 className="text-lg font-bold text-slate-900">No cars match your search</h3>
            <p className="text-slate-500 text-sm mt-1">Try resetting your search query.</p>
          </div>
        )}
      </section>
    </div>
  )
}
