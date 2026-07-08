import React, { useState, useEffect } from 'react'
import bcImg from '../assets/bc.png'

export default function BuyCar({ onNavigate, onBookTestDrive, initialSearchQuery, setInitialSearchQuery, initialFilters, setInitialFilters }) {
  const API_BASE = `http://${window.location.hostname}:5080/api`

  const [searchQuery, setSearchQuery] = useState(initialSearchQuery || '')
  const [cars, setCars] = useState([])
  const [wishlistIds, setWishlistIds] = useState([])
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('carsell_user')
    return saved ? JSON.parse(saved) : null
  })

  // Selected Car for 360° Detail Modal
  const [selectedCar, setSelectedCar] = useState(null)
  const [activeAngle, setActiveAngle] = useState(0) // 0 to 315 in steps of 45

  let parsedImages = []
  try {
    parsedImages = JSON.parse(selectedCar?.imagesJson || '[]')
  } catch (e) {
    parsedImages = []
  }
  const hasMultiImages = parsedImages.length > 0 && parsedImages.some(img => img !== '')
  const activeIndex = activeAngle / 45
  const activeImgSrc = (hasMultiImages && parsedImages[activeIndex]) 
    ? parsedImages[activeIndex] 
    : selectedCar?.imageUrl

  // Filter States
  const [filterBrand, setFilterBrand] = useState('All')
  const [filterMaxPrice, setFilterMaxPrice] = useState('All')
  const [filterMaxKm, setFilterMaxKm] = useState('All')
  const [filterTransmission, setFilterTransmission] = useState('All')
  const [filterFuel, setFilterFuel] = useState('All')
  const [filterMinYear, setFilterMinYear] = useState('All')
  const [filterBodyType, setFilterBodyType] = useState('All')

  // Load active stock from DB
  const loadCars = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/cars`)
      if (res.ok) {
        setCars(await res.json())
      }
    } catch (err) {
      console.error('Failed to load cars list', err)
    } finally {
      setLoading(false)
    }
  }

  // Load current wishlist
  const loadWishlist = async () => {
    if (!user) return
    try {
      const res = await fetch(`${API_BASE}/portal/wishlist/${user.id}`)
      if (res.ok) {
        const data = await res.json()
        setWishlistIds(data.map(c => c.id))
      }
    } catch (err) {
      console.error('Failed to load wishlist status', err)
    }
  }

  useEffect(() => {
    loadCars()
  }, [])

  useEffect(() => {
    loadWishlist()
  }, [user])

  useEffect(() => {
    if (initialSearchQuery) {
      setSearchQuery(initialSearchQuery)
    }
  }, [initialSearchQuery])

  useEffect(() => {
    if (initialFilters) {
      if (initialFilters.brand && initialFilters.brand !== 'Any Brand') {
        setFilterBrand(initialFilters.brand)
      }
      if (initialFilters.price && initialFilters.price !== 'Any Budget') {
        let normalizedPrice = initialFilters.price
        if (normalizedPrice === '10') normalizedPrice = '0-10'
        else if (normalizedPrice === '25') normalizedPrice = '10-25'
        else if (normalizedPrice === '50') normalizedPrice = '25-50'
        else if (normalizedPrice === '200') normalizedPrice = '50-999'
        setFilterMaxPrice(normalizedPrice)
      }
      if (initialFilters.fuel && initialFilters.fuel !== 'Any Fuel') {
        setFilterFuel(initialFilters.fuel)
      }
      if (initialFilters.transmission && initialFilters.transmission !== 'Any Type') {
        setFilterTransmission(initialFilters.transmission)
      }
      if (initialFilters.model && initialFilters.model !== 'Any Model') {
        const modelLower = initialFilters.model.toLowerCase()
        if (modelLower.includes('sedan') || modelLower.includes('suv') || modelLower.includes('hatchback') || modelLower.includes('coupe')) {
          let formattedType = 'Sedan'
          if (modelLower === 'suv') formattedType = 'SUV'
          else if (modelLower === 'hatchback') formattedType = 'Hatchback'
          else if (modelLower === 'coupe') formattedType = 'Coupe'
          setFilterBodyType(formattedType)
        } else {
          setSearchQuery(initialFilters.model)
        }
      }
    }
  }, [initialFilters])

  useEffect(() => {
    return () => {
      if (setInitialSearchQuery) {
        setInitialSearchQuery('')
      }
      if (setInitialFilters) {
        setInitialFilters(null)
      }
    }
  }, [])

  // Toggle wishlist state in API
  const handleWishlistToggle = async (carId, e) => {
    e.preventDefault()
    if (!user) {
      if (onNavigate) onNavigate('portal')
      return
    }

    const isSaved = wishlistIds.includes(carId)
    try {
      if (isSaved) {
        const res = await fetch(`${API_BASE}/portal/wishlist/${user.id}/${carId}`, {
          method: 'DELETE'
        })
        if (res.ok) {
          setWishlistIds(prev => prev.filter(id => id !== carId))
        }
      } else {
        const res = await fetch(`${API_BASE}/portal/wishlist`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id, carId })
        })
        if (res.ok) {
          setWishlistIds(prev => [...prev, carId])
        }
      }
    } catch (err) {
      console.error('Failed to update wishlist status', err)
    }
  }

  const getBodyType = (car) => {
    const model = (car.model || '').toLowerCase()
    if (model.includes('coupe') || model.includes('911') || model.includes('amg gt') || model.includes('stradale') || model.includes('tecnica') || model.includes('vantage') || model.includes('f-type') || model.includes('mustang') || model.includes('carrera')) {
      return 'Coupe'
    }
    if (model.includes('fortuner') || model.includes('cruiser') || model.includes('vitara') || model.includes('creta') || model.includes('seltos') || model.includes('x1') || model.includes('innova') || model.includes('elevate') || model.includes('rover') || model.includes('harrier') || model.includes('safari') || model.includes('thar') || model.includes('hector') || model.includes('compass') || model.includes('xc90') || model.includes('q7') || model.includes('q5') || model.includes('x5') || model.includes('gle') || model.includes('gls')) {
      return 'SUV'
    }
    if (model.includes('swift') || model.includes('i20') || model.includes('altroz') || model.includes('tiago') || model.includes('baleno') || model.includes('glanza') || model.includes('jazz') || model.includes('cooper') || model.includes('mini') || model.includes('ioniq') || model.includes('ev6')) {
      return 'Hatchback'
    }
    return 'Sedan'
  }

  // Filter Catalog
  const filteredCars = cars.filter((car) => {
    const matchesSearch = car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          car.model.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesBrand = filterBrand === 'All' || car.brand === filterBrand
    let matchesPrice = true
    if (filterMaxPrice !== 'All') {
      const priceLakhs = car.price / 100000
      if (filterMaxPrice === '0-10' || filterMaxPrice === '10') {
        matchesPrice = priceLakhs <= 10
      } else if (filterMaxPrice === '10-25' || filterMaxPrice === '25') {
        matchesPrice = priceLakhs >= 10 && priceLakhs <= 25
      } else if (filterMaxPrice === '25-50' || filterMaxPrice === '50') {
        matchesPrice = priceLakhs >= 25 && priceLakhs <= 50
      } else if (filterMaxPrice === '50-999' || filterMaxPrice === '200') {
        matchesPrice = priceLakhs >= 50
      }
    }
    const matchesKm = filterMaxKm === 'All' || car.kmDriven <= parseInt(filterMaxKm)
    const matchesTransmission = filterTransmission === 'All' || car.transmission.toLowerCase() === filterTransmission.toLowerCase()
    const matchesFuel = filterFuel === 'All' || car.fuelType.toLowerCase() === filterFuel.toLowerCase()
    const matchesYear = filterMinYear === 'All' || car.year >= parseInt(filterMinYear)
    const matchesBodyType = filterBodyType === 'All' || getBodyType(car).toLowerCase() === filterBodyType.toLowerCase()

    return matchesSearch && matchesBrand && matchesPrice && matchesKm && matchesTransmission && matchesFuel && matchesYear && matchesBodyType
  })

  // Dynamic 360° perspective rotation simulation styles
  const getRotateStyle = () => {
    if (hasMultiImages) {
      return {
        transition: 'transform 0.3s ease, filter 0.3s ease',
        transformOrigin: 'center center'
      }
    }
    return {
      transform: `perspective(800px) rotateY(${activeAngle}deg) scale(${activeAngle === 270 ? '1.15' : '1'})`,
      filter: activeAngle === 270 ? 'brightness(0.85) contrast(1.1) saturate(1.15) blur(0.3px)' : 'none',
      transition: 'transform 0.6s cubic-bezier(0.19, 1, 0.22, 1), filter 0.5s ease',
      transformOrigin: 'center center'
    }
  }

  return (
    <div className="bg-white text-slate-900 min-h-screen relative">
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
        <div className="max-w-7xl mx-auto w-full relative z-20 text-left">
          <div className="max-w-2xl">
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
            <div className="text-left">
              <p className="text-xs font-bold text-slate-900">200+ Points</p>
              <p className="text-[10px] text-slate-500 font-medium">Inspection</p>
            </div>
          </div>
          
          <div className="border border-slate-200 rounded-xl p-4 flex items-center space-x-4 hover:shadow-sm transition-shadow">
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 border border-slate-100 text-amber-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-slate-900">5-Day</p>
              <p className="text-[10px] text-slate-500 font-medium">Return Guarantee</p>
            </div>
          </div>

          <div className="border border-slate-200 rounded-xl p-4 flex items-center space-x-4 hover:shadow-sm transition-shadow">
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 border border-slate-100 text-emerald-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-slate-900">7.5% p.a.</p>
              <p className="text-[10px] text-slate-500 font-medium">Finance Rate</p>
            </div>
          </div>

          <div className="border border-slate-200 rounded-xl p-4 flex items-center space-x-4 hover:shadow-sm transition-shadow">
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 border border-slate-100 text-purple-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-slate-900">48 Hours</p>
              <p className="text-[10px] text-slate-500 font-medium">Avg Sale Time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Selection & Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24 text-left">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <span className="text-blue-600 text-[10px] font-bold uppercase tracking-widest block mb-1">CURATED SELECTION</span>
            <h2 className="text-2xl font-extrabold text-slate-900">Recommended for you</h2>
            <p className="text-slate-500 text-xs mt-1 font-medium">{filteredCars.length} certified pre-owned vehicles available</p>
          </div>
        </div>

        {/* Filters Panel */}
        <div className="bg-slate-50/80 border border-slate-200/80 rounded-[28px] p-6 mb-10 shadow-sm backdrop-blur-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            
            {/* Brand Filter */}
            <div>
              <label className="block text-[9px] uppercase tracking-wider text-slate-500 font-semibold mb-2">Brand</label>
              <select
                value={filterBrand}
                onChange={(e) => setFilterBrand(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-slate-400 cursor-pointer"
              >
                {['All', ...Array.from(new Set(cars.map(c => c.brand)))].map((brand) => (
                  <option key={brand} value={brand}>{brand === 'All' ? 'All Brands' : brand}</option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div>
              <label className="block text-[9px] uppercase tracking-wider text-slate-500 font-semibold mb-2">Price Range</label>
              <select
                value={filterMaxPrice}
                onChange={(e) => setFilterMaxPrice(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-slate-400 cursor-pointer"
              >
                <option value="All">All Prices</option>
                <option value="0-10">Under 10 Lakhs</option>
                <option value="10-25">10 - 25 Lakhs</option>
                <option value="25-50">25 - 50 Lakhs</option>
                <option value="50-999">Above 50 Lakhs</option>
              </select>
            </div>

            {/* Mileage Filter */}
            <div>
              <label className="block text-[9px] uppercase tracking-wider text-slate-500 font-semibold mb-2">Max Mileage</label>
              <select
                value={filterMaxKm}
                onChange={(e) => setFilterMaxKm(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-slate-400 cursor-pointer"
              >
                <option value="All">Any Mileage</option>
                <option value="15000">Under 15,000 km</option>
                <option value="30000">Under 30,000 km</option>
                <option value="50000">Under 50,000 km</option>
                <option value="80000">Under 80,000 km</option>
              </select>
            </div>

            {/* Transmission Filter */}
            <div>
              <label className="block text-[9px] uppercase tracking-wider text-slate-500 font-semibold mb-2">Transmission</label>
              <select
                value={filterTransmission}
                onChange={(e) => setFilterTransmission(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-slate-400 cursor-pointer"
              >
                <option value="All">Any gearbox</option>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>

            {/* Fuel Type Filter */}
            <div>
              <label className="block text-[9px] uppercase tracking-wider text-slate-500 font-semibold mb-2">Fuel Type</label>
              <select
                value={filterFuel}
                onChange={(e) => setFilterFuel(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-slate-400 cursor-pointer"
              >
                <option value="All">Any fuel</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            {/* Year Filter */}
            <div>
              <label className="block text-[9px] uppercase tracking-wider text-slate-500 font-semibold mb-2">Min Year</label>
              <select
                value={filterMinYear}
                onChange={(e) => setFilterMinYear(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-slate-400 cursor-pointer"
              >
                <option value="All">Any year</option>
                <option value="2018">2018 or newer</option>
                <option value="2020">2020 or newer</option>
                <option value="2022">2022 or newer</option>
                <option value="2024">2024 or newer</option>
              </select>
            </div>

            {/* Body Type Filter */}
            <div>
              <label className="block text-[9px] uppercase tracking-wider text-slate-500 font-semibold mb-2">Body Type</label>
              <select
                value={filterBodyType}
                onChange={(e) => setFilterBodyType(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-slate-400 cursor-pointer"
              >
                <option value="All">All Body Types</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Coupe">Coupe</option>
              </select>
            </div>

          </div>

          {/* Active Filter Clear indicator bar */}
          {(filterBrand !== 'All' || filterMaxPrice !== 'All' || filterMaxKm !== 'All' || filterTransmission !== 'All' || filterFuel !== 'All' || filterMinYear !== 'All' || filterBodyType !== 'All' || searchQuery !== '') && (
            <div className="mt-4 pt-4 border-t border-slate-200/60 flex items-center justify-between">
              <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">Active Filters Engaged</span>
              <button
                onClick={() => {
                  setFilterBrand('All')
                  setFilterMaxPrice('All')
                  setFilterMaxKm('All')
                  setFilterTransmission('All')
                  setFilterFuel('All')
                  setFilterMinYear('All')
                  setFilterBodyType('All')
                  setSearchQuery('')
                  if (setInitialSearchQuery) setInitialSearchQuery('')
                  if (setInitialFilters) setInitialFilters(null)
                }}
                className="text-[10px] font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors flex items-center space-x-1 cursor-pointer text-right border-none bg-transparent"
              >
                <span>Reset All Filters</span>
                <span>↺</span>
              </button>
            </div>
          )}
        </div>

        {/* Cars Grid */}
        {loading ? (
          <div className="text-center py-20 text-slate-500 font-normal">Loading luxury catalog...</div>
        ) : filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map((car) => {
              const isWishlisted = wishlistIds.includes(car.id)
              return (
                <div key={car.id} className="bg-white border border-slate-200 rounded-[24px] overflow-hidden hover:shadow-lg hover:border-slate-300 transition-all duration-300 flex flex-col group shadow-sm">
                  {/* Image Area */}
                  <div className="relative overflow-hidden aspect-[4/3] bg-slate-50 flex items-center justify-center">
                    <img 
                      src={car.imageUrl} 
                      alt={`${car.brand} ${car.model}`} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Action Icons */}
                    <div className="absolute top-4 right-4 flex flex-col space-y-2 z-10">
                      <button 
                        onClick={(e) => handleWishlistToggle(car.id, e)}
                        className={`w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm transition-colors cursor-pointer ${
                          isWishlisted ? 'text-rose-500 bg-white' : 'text-slate-400 hover:text-rose-500 hover:bg-white'
                        }`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill={isWishlisted ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Details Area */}
                  <div className="p-5 flex flex-col flex-grow">
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-1">{car.brand}</span>
                    <h3 className="text-sm font-extrabold text-slate-900 mb-2 truncate">{car.brand} {car.model}</h3>
                    <div className="mb-4 text-left">
                      <span className="text-lg font-black text-slate-900">₹{(car.price / 100000).toFixed(2)} Lakh</span>
                      <span className="text-[10px] text-slate-400 font-medium block">EMI starts from ₹32,000/mo</span>
                    </div>

                    {/* Specs Grid */}
                    <div className="grid grid-cols-4 gap-2 py-3 border-t border-slate-100 text-center mt-auto">
                      <div className="flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                        <span className="text-[9px] text-slate-500 font-semibold">{car.year}</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path d="M3 22h12M4 2v15h10V2H4zM14 9h3a2 2 0 012 2v6a2 2 0 002 2h1" /><path d="M9 6h2v3H9z" /></svg>
                        <span className="text-[9px] text-slate-500 font-semibold">{car.fuelType}</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path d="M12 2a10 10 0 00-7.07 17.07L12 12V4" /><path d="M19.07 19.07A10 10 0 0012 2" strokeDasharray="2 2" /></svg>
                        <span className="text-[9px] text-slate-500 font-semibold">{car.kmDriven.toLocaleString()}</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        <span className="text-[9px] text-slate-500 font-semibold truncate w-full px-1">Mumbai</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2 pt-4 border-t border-slate-100">
                      <button 
                        onClick={() => { setSelectedCar(car); setActiveAngle(0); }}
                        className="flex-1 border border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-50 py-2 rounded-full text-[11px] font-bold transition-all text-center cursor-pointer"
                      >
                        View Details
                      </button>
                      <button 
                        onClick={() => { if (onBookTestDrive) onBookTestDrive(car); }}
                        className="flex-1 bg-[#1A233A] text-white hover:bg-[#111827] py-2 rounded-full text-[11px] font-bold transition-all text-center shadow-md cursor-pointer"
                      >
                        Test Drive
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 border border-slate-200 rounded-3xl">
            <h3 className="text-lg font-bold text-slate-900">No cars match your search</h3>
            <p className="text-slate-500 text-sm mt-1">Try resetting your search query.</p>
          </div>
        )}
      </section>

      {/* 360° VEHICLE DETAILS OVERLAY MODAL */}
      {selectedCar && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row relative text-left">
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedCar(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-full p-2.5 z-55 transition-colors cursor-pointer text-sm"
              title="Close Panel"
            >
              ✕
            </button>

            {/* Left Box: 360° Virtual Tour Interactive Viewer */}
            <div className="w-full lg:w-1/2 bg-slate-950 p-8 flex flex-col justify-between border-r border-slate-800/60 relative">
              <div>
                <span className="text-[10px] bg-amber-500/10 text-amber-500 border border-amber-500/25 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                  Interactive 360° View
                </span>
                <h3 className="text-lg font-serif font-bold text-white mt-4">Virtual Tour Rotation</h3>
                <p className="text-[10px] text-slate-500 mt-1">Slide or use preset rotation angles to rotate vehicle perspectives.</p>
              </div>

              {/* Rotatable Vehicle Container */}
              <div className="my-10 relative overflow-hidden flex items-center justify-center h-64 border border-slate-850/60 rounded-2xl bg-slate-950/80">
                <img 
                  src={activeImgSrc} 
                  alt={selectedCar.model}
                  style={getRotateStyle()}
                  className="max-h-full max-w-full object-contain pointer-events-none"
                />

                {/* Dashboard Badge Overlay when viewing interior */}
                {activeAngle === 270 && (
                  <div className="absolute inset-0 bg-slate-950/60 flex flex-col items-center justify-center p-6 text-center transition-opacity">
                    <span className="text-lg font-black text-amber-500 font-serif uppercase tracking-widest">Dash Interior View</span>
                    <p className="text-[10px] text-slate-300 mt-2 max-w-xs leading-relaxed">
                      Premium Hand-Stitched Leather Layout & bull; Ambient Lighting Console & bull; Integrated Touch Interface
                    </p>
                  </div>
                )}
              </div>

              {/* Angle Slider and Controls */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  <span>Perspective Rotation Angle</span>
                  <span className="text-amber-500">{activeAngle}°</span>
                </div>

                <input 
                  type="range"
                  min="0"
                  max="315"
                  step="45"
                  value={activeAngle}
                  onChange={(e) => setActiveAngle(Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer"
                />

                {/* Angle Preset Buttons */}
                <div className="grid grid-cols-4 gap-2 pt-2">
                  <button 
                    onClick={() => setActiveAngle(0)}
                    className={`py-2 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      activeAngle === 0 ? 'bg-amber-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:bg-slate-850'
                    }`}
                  >
                    Front
                  </button>
                  <button 
                    onClick={() => setActiveAngle(90)}
                    className={`py-2 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      activeAngle === 90 ? 'bg-amber-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:bg-slate-850'
                    }`}
                  >
                    Side
                  </button>
                  <button 
                    onClick={() => setActiveAngle(180)}
                    className={`py-2 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      activeAngle === 180 ? 'bg-amber-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:bg-slate-850'
                    }`}
                  >
                    Rear
                  </button>
                  <button 
                    onClick={() => setActiveAngle(270)}
                    className={`py-2 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      activeAngle === 270 ? 'bg-amber-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:bg-slate-850'
                    }`}
                  >
                    Interior
                  </button>
                </div>
              </div>
            </div>

            {/* Right Box: Spec Details & Actions */}
            <div className="w-full lg:w-1/2 p-8 flex flex-col justify-between">
              <div>
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">{selectedCar.brand}</span>
                <h2 className="text-2xl font-serif font-bold text-white mt-1">{selectedCar.brand} {selectedCar.model}</h2>
                <div className="mt-3 flex items-baseline space-x-2">
                  <span className="text-xl font-black text-amber-500">₹{(selectedCar.price / 100000).toFixed(2)} Lakh</span>
                  <span className="text-[10px] text-slate-500">(Fixed Price + GST Invoiced)</span>
                </div>

                {/* Spec sheets */}
                <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-850">
                  <div>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Model Year</span>
                    <p className="text-xs text-slate-200 mt-1 font-semibold">{selectedCar.year}</p>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Kilometers Driven</span>
                    <p className="text-xs text-slate-200 mt-1 font-semibold">{selectedCar.kmDriven.toLocaleString()} km</p>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Fuel Type</span>
                    <p className="text-xs text-slate-200 mt-1 font-semibold">{selectedCar.fuelType}</p>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Transmission</span>
                    <p className="text-xs text-slate-200 mt-1 font-semibold">{selectedCar.transmission}</p>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Body Color</span>
                    <p className="text-xs text-slate-200 mt-1 font-semibold">{selectedCar.color}</p>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Registration Hub</span>
                    <p className="text-xs text-slate-200 mt-1 font-semibold">MH-01 (Mumbai South)</p>
                  </div>
                </div>

                {/* Premium features highlights checklist */}
                <div className="mt-6 pt-6 border-t border-slate-850">
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block mb-3">Premium Features Checklist</span>
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 font-normal">
                    <div className="flex items-center space-x-2">
                      <span className="text-emerald-500">✓</span>
                      <span>Panoramic Moonroof</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-emerald-500">✓</span>
                      <span>Adaptive Cruise Control</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-emerald-500">✓</span>
                      <span>Nappa Leather Seats</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-emerald-500">✓</span>
                      <span>LED Ambient Lighting</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking CTAs */}
              <div className="mt-8 pt-6 border-t border-slate-850 flex gap-4">
                <button 
                  onClick={() => { if (onBookTestDrive) onBookTestDrive(selectedCar); setSelectedCar(null); }}
                  className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition-colors shadow-md text-center cursor-pointer"
                >
                  Book Test Drive
                </button>
                <button 
                  onClick={() => window.open('https://wa.me/919999999999', '_blank')}
                  className="flex-1 border border-slate-800 hover:bg-slate-850 text-slate-300 font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition-colors text-center cursor-pointer"
                >
                  Contact Advisor
                </button>
              </div>

            </div>

          </div>
        </div>
      )}
    </div>
  )
}
