import React, { useState, useEffect } from 'react'
import bcImg from '../assets/bc.png'

export default function Dealers() {
  const API_BASE = `http://${window.location.hostname}:5080/api`

  const [dealer, setDealer] = useState(() => {
    const saved = localStorage.getItem('carsell_dealer')
    return saved ? JSON.parse(saved) : null
  })

  // Auth/Tab States
  const [authTab, setAuthTab] = useState('register') // 'register' or 'login'
  const [regSubmitted, setRegSubmitted] = useState(false)
  const [authError, setAuthError] = useState('')
  const [authLoading, setAuthLoading] = useState(false)

  // Registration Form
  const [regForm, setRegForm] = useState({
    businessName: '',
    contactPerson: '',
    phone: '',
    email: '',
    city: '',
    gstNumber: '',
    password: ''
  })

  // Login Form
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })

  // Workspace Dashboard States
  const [inventory, setInventory] = useState([])
  const [dashboardTab, setDashboardTab] = useState('publish') // 'publish' or 'inventory'
  const [publishForm, setPublishForm] = useState({
    brand: '',
    model: '',
    year: '',
    kmDriven: '',
    price: '',
    color: '',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    imageUrl: ''
  })
  const [publishStatus, setPublishStatus] = useState({ type: '', message: '' })
  const [publishLoading, setPublishLoading] = useState(false)

  const handleImageFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPublishForm(prev => ({
          ...prev,
          imageUrl: reader.result
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  // Fetch all cars on mount or refresh
  const fetchInventory = async () => {
    try {
      const res = await fetch(`${API_BASE}/cars`)
      if (res.ok) {
        setInventory(await res.json())
      }
    } catch (err) {
      console.error('Failed to fetch catalog', err)
    }
  }

  useEffect(() => {
    fetchInventory()
  }, [])

  // Handle Registration Submit
  const handleRegisterSubmit = async (e) => {
    e.preventDefault()
    setAuthError('')
    setAuthLoading(true)

    const payload = {
      BusinessName: regForm.businessName,
      ContactPerson: regForm.contactPerson,
      Phone: regForm.phone,
      Email: regForm.email,
      City: regForm.city,
      GstNumber: regForm.gstNumber,
      PasswordHash: regForm.password,
      Documents: 'registration_proof.pdf'
    }

    try {
      const res = await fetch(`${API_BASE}/crm/dealers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message || 'Registration failed')
      }

      setRegSubmitted(true)
      setRegForm({
        businessName: '',
        contactPerson: '',
        phone: '',
        email: '',
        city: '',
        gstNumber: '',
        password: ''
      })
    } catch (err) {
      setAuthError(err.message)
    } finally {
      setAuthLoading(false)
    }
  }

  // Handle Login Submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    setAuthError('')
    setAuthLoading(true)

    try {
      const res = await fetch(`${API_BASE}/crm/dealers/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginForm.email, password: loginForm.password })
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message || 'Invalid credentials')
      }

      localStorage.setItem('carsell_dealer', JSON.stringify(data.dealer))
      setDealer(data.dealer)
    } catch (err) {
      setAuthError(err.message)
    } finally {
      setAuthLoading(false)
    }
  }

  // Handle Publish Stock Submit
  const handlePublishSubmit = async (e) => {
    e.preventDefault()
    setPublishStatus({ type: '', message: '' })
    setPublishLoading(true)

    const payload = {
      brand: publishForm.brand,
      model: publishForm.model,
      year: Number(publishForm.year),
      kmDriven: Number(publishForm.kmDriven),
      price: Number(publishForm.price),
      color: publishForm.color,
      fuelType: publishForm.fuelType,
      transmission: publishForm.transmission,
      imageUrl: publishForm.imageUrl,
      isFeatured: false
    }

    try {
      const res = await fetch(`${API_BASE}/cars`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!res.ok) {
        const errorText = await res.text().catch(() => '')
        throw new Error(errorText || 'Failed to publish vehicle listing')
      }

      setPublishStatus({ type: 'success', message: 'Vehicle listing published to live catalog successfully!' })
      setPublishForm({
        brand: '',
        model: '',
        year: '',
        kmDriven: '',
        price: '',
        color: '',
        fuelType: 'Petrol',
        transmission: 'Automatic',
        imageUrl: '/assets/b1.png'
      })
      fetchInventory()
    } catch (err) {
      setPublishStatus({ type: 'error', message: err.message })
    } finally {
      setPublishLoading(false)
    }
  }

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('carsell_dealer')
    setDealer(null)
    setRegSubmitted(false)
    setAuthError('')
  }

  // PORTAL VIEW (Unauthenticated - Login / Register)
  if (!dealer) {
    return (
      <div className="bg-slate-950 text-slate-100 font-sans min-h-screen pt-24 pb-20 px-6 flex flex-col justify-center items-center">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-10 bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl relative">
          
          {/* Left Column: Partner Highlights & Pricing Summary */}
          <div className="text-left flex flex-col justify-between space-y-8 pr-0 md:pr-6 border-r border-slate-800/60 md:border-r">
            <div>
              <span className="text-amber-500 text-[10px] font-black uppercase tracking-widest block mb-2">
                Dealer Partner Program
              </span>
              <h1 className="text-3xl font-bold text-white font-serif leading-tight">
                Scale Your Luxury Dealership
              </h1>
              <p className="text-slate-400 text-xs mt-3 leading-relaxed">
                Unlock instant listing publications to our premium catalog, track verification approvals, and acquire verified hot leads in real-time.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3.5">
                <span className="w-8 h-8 rounded-lg bg-slate-950 flex items-center justify-center text-sm">📈</span>
                <div>
                  <p className="text-xs font-bold text-white">10x Higher Conversion Rate</p>
                  <p className="text-[10px] text-slate-500">Dealers report qualified leads closing in under 48 hours.</p>
                </div>
              </div>

              <div className="flex items-center space-x-3.5">
                <span className="w-8 h-8 rounded-lg bg-slate-950 flex items-center justify-center text-sm">🎫</span>
                <div>
                  <p className="text-xs font-bold text-white">MotorElite Certification Badge</p>
                  <p className="text-[10px] text-slate-500">Build immediate buyer trust with verified dealer highlights.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-850 text-[11px] text-slate-500 font-medium">
              Dealer Support Desk: <span className="text-slate-300 font-bold">support@autoflow.in</span>
            </div>
          </div>

          {/* Right Column: Auth Tab Cards */}
          <div className="flex flex-col text-left">
            <div className="flex border-b border-slate-850 mb-6">
              <button 
                onClick={() => { setAuthTab('register'); setAuthError('') }}
                className={`flex-1 pb-3 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer text-center ${
                  authTab === 'register' ? 'border-b-2 border-amber-500 text-white' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                Register
              </button>
              <button 
                onClick={() => { setAuthTab('login'); setAuthError('') }}
                className={`flex-1 pb-3 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer text-center ${
                  authTab === 'login' ? 'border-b-2 border-amber-500 text-white' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                Sign In
              </button>
            </div>

            {authError && (
              <div className="p-3 mb-4 text-xs font-semibold rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">
                {authError}
              </div>
            )}

            {authTab === 'register' ? (
              regSubmitted ? (
                <div className="text-center py-12 text-[#E05E1B] font-bold my-auto">
                  <svg className="w-12 h-12 mx-auto mb-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-lg font-extrabold text-slate-100 mb-1">Registration Recorded!</h3>
                  <p className="text-slate-400 text-xs font-normal">Our team will verify your uploaded documents and GST records shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Dealership Name</label>
                    <input 
                      type="text" required placeholder="Elite Cars Mumbai"
                      value={regForm.businessName}
                      onChange={(e) => setRegForm(prev => ({ ...prev, businessName: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-850 rounded-lg px-4 py-2.5 text-xs text-slate-100 placeholder-slate-700 focus:outline-none focus:border-slate-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Contact Person</label>
                      <input 
                        type="text" required placeholder="Rajesh Sharma"
                        value={regForm.contactPerson}
                        onChange={(e) => setRegForm(prev => ({ ...prev, contactPerson: e.target.value }))}
                        className="w-full bg-slate-950 border border-slate-850 rounded-lg px-4 py-2.5 text-xs text-slate-100 placeholder-slate-700 focus:outline-none focus:border-slate-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Phone Number</label>
                      <input 
                        type="tel" required placeholder="+91 98765 43210"
                        value={regForm.phone}
                        onChange={(e) => setRegForm(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full bg-slate-950 border border-slate-850 rounded-lg px-4 py-2.5 text-xs text-slate-100 placeholder-slate-700 focus:outline-none focus:border-slate-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Email Address</label>
                    <input 
                      type="email" required placeholder="dealer@autohub.in"
                      value={regForm.email}
                      onChange={(e) => setRegForm(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-850 rounded-lg px-4 py-2.5 text-xs text-slate-100 placeholder-slate-700 focus:outline-none focus:border-slate-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">City</label>
                      <input 
                        type="text" required placeholder="Mumbai"
                        value={regForm.city}
                        onChange={(e) => setRegForm(prev => ({ ...prev, city: e.target.value }))}
                        className="w-full bg-slate-950 border border-slate-850 rounded-lg px-4 py-2.5 text-xs text-slate-100 placeholder-slate-700 focus:outline-none focus:border-slate-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">GST Number</label>
                      <input 
                        type="text" required placeholder="27AAACX1234M1Z5"
                        value={regForm.gstNumber}
                        onChange={(e) => setRegForm(prev => ({ ...prev, gstNumber: e.target.value }))}
                        className="w-full bg-slate-950 border border-slate-850 rounded-lg px-4 py-2.5 text-xs text-slate-100 placeholder-slate-700 focus:outline-none focus:border-slate-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Portal Password</label>
                    <input 
                      type="password" required placeholder="••••••••"
                      value={regForm.password}
                      onChange={(e) => setRegForm(prev => ({ ...prev, password: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-850 rounded-lg px-4 py-2.5 text-xs text-slate-100 placeholder-slate-700 focus:outline-none focus:border-slate-500"
                    />
                  </div>

                  <button 
                    type="submit" disabled={authLoading}
                    className="w-full py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors disabled:opacity-50 mt-4 cursor-pointer"
                  >
                    {authLoading ? 'Submitting Application...' : 'Register Agency'}
                  </button>
                </form>
              )
            ) : (
              <form onSubmit={handleLoginSubmit} className="space-y-4 my-auto">
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Email Address</label>
                  <input 
                    type="email" required placeholder="dealer@autohub.in"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-850 rounded-lg px-4 py-3 text-xs text-slate-100 placeholder-slate-700 focus:outline-none focus:border-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Portal Password</label>
                  <input 
                    type="password" required placeholder="••••••••"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-850 rounded-lg px-4 py-3 text-xs text-slate-100 placeholder-slate-700 focus:outline-none focus:border-slate-500"
                  />
                </div>

                <button 
                  type="submit" disabled={authLoading}
                  className="w-full py-3.5 bg-white hover:bg-slate-100 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-colors disabled:opacity-50 mt-4 cursor-pointer"
                >
                  {authLoading ? 'Signing In...' : 'Sign In'}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    )
  }

  // WORKSPACE PORTAL VIEW (Authenticated)
  return (
    <div className="bg-slate-950 text-slate-100 font-sans min-h-screen pt-20 flex flex-col">
      {/* Header Banner */}
      <header className="bg-slate-900 border-b border-slate-850 px-8 py-6 flex items-center justify-between text-left">
        <div>
          <span className="text-[10px] font-black uppercase text-amber-500 tracking-wider">
            Elite Partner Workspace
          </span>
          <h1 className="text-xl font-bold font-serif text-white mt-1">
            {dealer.businessName}
          </h1>
          <p className="text-[10px] text-slate-500">Registered Email: {dealer.email}</p>
        </div>

        <button 
          onClick={handleLogout}
          className="bg-slate-800 hover:bg-slate-750 text-white font-bold px-4 py-2 rounded-lg text-xs transition-colors cursor-pointer"
        >
          Sign Out
        </button>
      </header>

      {/* Verification status checker */}
      <div className="max-w-7xl mx-auto w-full px-6 pt-8 text-left">
        {dealer.verificationStatus === 'Pending Review' && (
          <div className="bg-amber-500/10 border border-amber-500/20 text-amber-400 p-5 rounded-2xl flex items-center space-x-4">
            <span className="text-2xl">⏳</span>
            <div>
              <p className="text-xs font-bold">Verification Pending Review</p>
              <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                Our dealership verification team is currently validating your business registrations and GST certificates. You will be unlocked to publish listings to the public catalog once approved.
              </p>
            </div>
          </div>
        )}

        {dealer.verificationStatus === 'Rejected' && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-5 rounded-2xl flex items-center space-x-4">
            <span className="text-2xl">🛑</span>
            <div>
              <p className="text-xs font-bold">Account Verification Rejected</p>
              <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                Your agency registration was rejected due to mismatching licence proofs. Please reach out to partnersupport@autoflow.in for assistance.
              </p>
            </div>
          </div>
        )}

        {dealer.verificationStatus === 'Approved' && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-5 rounded-2xl flex items-center space-x-4">
            <span className="text-2xl">✅</span>
            <div>
              <p className="text-xs font-bold">Verification Approved</p>
              <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                Congratulations! Your dealership has been verified. You now have full listing publishing privileges enabled.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Main Workspace Body */}
      {dealer.verificationStatus === 'Approved' && (
        <div className="max-w-7xl mx-auto w-full px-6 py-8 flex flex-col lg:flex-row gap-8 text-left flex-grow">
          {/* Left panel tabs */}
          <aside className="w-full lg:w-60 flex-shrink-0 flex flex-col space-y-2">
            <button 
              onClick={() => setDashboardTab('publish')}
              className={`w-full text-left px-4 py-3 rounded-xl flex items-center space-x-3 text-xs transition-colors font-bold uppercase tracking-wider ${
                dashboardTab === 'publish' ? 'bg-amber-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:bg-slate-850'
              }`}
            >
              <span>🚗</span>
              <span>Publish Vehicle</span>
            </button>

            <button 
              onClick={() => setDashboardTab('inventory')}
              className={`w-full text-left px-4 py-3 rounded-xl flex items-center space-x-3 text-xs transition-colors font-bold uppercase tracking-wider ${
                dashboardTab === 'inventory' ? 'bg-amber-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:bg-slate-850'
              }`}
            >
              <span>📊</span>
              <span>Active Stock ({inventory.length})</span>
            </button>
          </aside>

          {/* Right panel content area */}
          <section className="flex-grow bg-slate-900 border border-slate-850 rounded-3xl p-8 min-h-[50vh]">
            
            {/* TAB 1: PUBLISH STOCK */}
            {dashboardTab === 'publish' && (
              <div>
                <h3 className="text-lg font-serif font-bold text-white mb-6">List Luxury Vehicle</h3>

                {publishStatus.message && (
                  <div className={`p-4 mb-6 text-xs font-semibold rounded-lg border ${
                    publishStatus.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'
                  }`}>
                    {publishStatus.message}
                  </div>
                )}

                <form onSubmit={handlePublishSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Brand</label>
                      <input 
                        type="text" required placeholder="Porsche"
                        value={publishForm.brand}
                        onChange={(e) => setPublishForm(prev => ({ ...prev, brand: e.target.value }))}
                        className="w-full bg-slate-950 border border-slate-850 rounded-lg px-4 py-2.5 text-xs text-slate-100 placeholder-slate-700 focus:outline-none focus:border-slate-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Model</label>
                      <input 
                        type="text" required placeholder="911 Carrera S"
                        value={publishForm.model}
                        onChange={(e) => setPublishForm(prev => ({ ...prev, model: e.target.value }))}
                        className="w-full bg-slate-950 border border-slate-850 rounded-lg px-4 py-2.5 text-xs text-slate-100 placeholder-slate-700 focus:outline-none focus:border-slate-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Year</label>
                      <input 
                        type="number" required placeholder="2024"
                        value={publishForm.year}
                        onChange={(e) => setPublishForm(prev => ({ ...prev, year: e.target.value }))}
                        className="w-full bg-slate-950 border border-slate-850 rounded-lg px-4 py-2.5 text-xs text-slate-100 placeholder-slate-700 focus:outline-none focus:border-slate-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">KM Driven</label>
                      <input 
                        type="number" required placeholder="4500"
                        value={publishForm.kmDriven}
                        onChange={(e) => setPublishForm(prev => ({ ...prev, kmDriven: e.target.value }))}
                        className="w-full bg-slate-950 border border-slate-850 rounded-lg px-4 py-2.5 text-xs text-slate-100 placeholder-slate-700 focus:outline-none focus:border-slate-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Price (INR)</label>
                      <input 
                        type="number" required placeholder="18500000"
                        value={publishForm.price}
                        onChange={(e) => setPublishForm(prev => ({ ...prev, price: e.target.value }))}
                        className="w-full bg-slate-950 border border-slate-850 rounded-lg px-4 py-2.5 text-xs text-slate-100 placeholder-slate-700 focus:outline-none focus:border-slate-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Color</label>
                      <input 
                        type="text" required placeholder="Guards Red"
                        value={publishForm.color}
                        onChange={(e) => setPublishForm(prev => ({ ...prev, color: e.target.value }))}
                        className="w-full bg-slate-950 border border-slate-850 rounded-lg px-4 py-2.5 text-xs text-slate-100 placeholder-slate-700 focus:outline-none focus:border-slate-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Fuel Type</label>
                      <select 
                        value={publishForm.fuelType}
                        onChange={(e) => setPublishForm(prev => ({ ...prev, fuelType: e.target.value }))}
                        className="w-full bg-slate-950 border border-slate-850 rounded-lg px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-slate-500"
                      >
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Electric">Electric</option>
                        <option value="Hybrid">Hybrid</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Transmission</label>
                      <select 
                        value={publishForm.transmission}
                        onChange={(e) => setPublishForm(prev => ({ ...prev, transmission: e.target.value }))}
                        className="w-full bg-slate-950 border border-slate-850 rounded-lg px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-slate-500"
                      >
                        <option value="Automatic">Automatic</option>
                        <option value="Manual">Manual</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Vehicle Image</label>
                    
                    {publishForm.imageUrl ? (
                      <div className="relative border border-slate-850 rounded-lg p-2 bg-slate-950 flex flex-col items-center">
                        <img 
                          src={publishForm.imageUrl} 
                          alt="Preview" 
                          className="max-h-40 max-w-full object-contain mb-3 rounded"
                        />
                        <button
                          type="button"
                          onClick={() => setPublishForm(prev => ({ ...prev, imageUrl: '' }))}
                          className="px-3 py-1 bg-red-950/40 border border-red-500/30 hover:bg-red-900/50 hover:border-red-500 text-red-400 text-[10px] font-semibold rounded cursor-pointer transition-colors"
                        >
                          Remove Image
                        </button>
                      </div>
                    ) : (
                      <div className="relative border border-dashed border-slate-850 rounded-lg p-6 bg-slate-950 hover:border-slate-700 transition-colors flex flex-col items-center justify-center cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageFileChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          required
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-[10px] text-slate-400 font-medium">Click to upload image from local storage</span>
                      </div>
                    )}
                  </div>

                  <button 
                    type="submit" disabled={publishLoading}
                    className="w-full py-4 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors disabled:opacity-50 mt-6 cursor-pointer"
                  >
                    {publishLoading ? 'Publishing Vehicle...' : 'Publish Vehicle'}
                  </button>
                </form>
              </div>
            )}

            {/* TAB 2: ACTIVE STOCK LIST */}
            {dashboardTab === 'inventory' && (
              <div>
                <h3 className="text-lg font-serif font-bold text-white mb-6">Verified Listings Catalog</h3>

                {inventory.length === 0 ? (
                  <div className="text-center py-20 text-slate-500 font-normal">
                    No active vehicles in the marketplace catalog.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {inventory.map(car => (
                      <div key={car.id} className="bg-slate-950 border border-slate-850 rounded-2xl overflow-hidden flex flex-col">
                        <div className="h-40 bg-slate-900 overflow-hidden">
                          <img src={car.imageUrl} alt={car.brand} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-5 flex-grow flex flex-col justify-between">
                          <div>
                            <span className="text-[9px] font-black uppercase text-amber-500 tracking-wider">{car.brand}</span>
                            <h4 className="text-sm font-bold text-white mt-0.5">{car.brand} {car.model}</h4>
                            <p className="text-[10px] text-slate-500 mt-1">{car.year} &bull; {car.kmDriven.toLocaleString()} km &bull; {car.fuelType} &bull; {car.transmission}</p>
                          </div>
                          <div className="flex justify-between items-center mt-5 pt-3 border-t border-slate-850">
                            <span className="text-xs font-bold text-white">₹{(car.price / 100000).toFixed(2)} Lakh</span>
                            <span className="bg-emerald-500/10 text-emerald-500 text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded border border-emerald-500/25">
                              Live
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </section>
        </div>
      )}

      {/* Fallback space for review and rejected states */}
      {dealer.verificationStatus !== 'Approved' && (
        <div className="flex-grow flex justify-center items-center py-20 text-slate-500 text-xs font-semibold uppercase tracking-widest">
          Workspace access locked until account verification completes.
        </div>
      )}

    </div>
  )
}
