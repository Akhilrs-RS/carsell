import React, { useState, useEffect } from 'react'

export default function Admin() {
  const API_BASE = `http://${window.location.hostname}:5080/api`
  const [activeTab, setActiveTab] = useState('dashboard')

  // Auth states
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('carsell_admin_auth') === 'true'
  })
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [showForgot, setShowForgot] = useState(false)
  const [recoveryEmail, setRecoveryEmail] = useState('')
  const [recoveryStatus, setRecoveryStatus] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    if (loginEmail === 'admin@autoflow.in' && loginPassword === 'admin') {
      setIsLoggedIn(true)
      localStorage.setItem('carsell_admin_auth', 'true')
      setError('')
    } else {
      setError('Invalid admin credentials!')
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('carsell_admin_auth')
  }

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault()
    if (recoveryEmail.trim().toLowerCase() === 'admin@autoflow.in') {
      setRecoveryStatus('Success! Temporary admin access key (Password: admin) has been sent to recovery mailbox: temp-admin-recovery@autoflow.in')
    } else {
      setRecoveryStatus('Error: Entered email is not registered as an administrator.')
    }
  }

  // Data states
  const [cars, setCars] = useState([])
  const [inquiries, setInquiries] = useState([])
  const [sellRequests, setSellRequests] = useState([])
  const [financeApps, setFinanceApps] = useState([])
  
  // Loading & Error states
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Car Form state
  const [showForm, setShowForm] = useState(false)
  const [editingCar, setEditingCar] = useState(null)
  const [carFormData, setCarFormData] = useState({
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    kmDriven: 0,
    price: 0,
    color: '',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    imageUrl: '',
    isFeatured: false
  })

  // Fetch functions
  const fetchCars = async () => {
    try {
      const res = await fetch(`${API_BASE}/cars`)
      if (!res.ok) throw new Error('Failed to fetch cars')
      const data = await res.json()
      setCars(data)
    } catch (err) {
      setError(err.message)
    }
  }

  const fetchInquiries = async () => {
    try {
      const res = await fetch(`${API_BASE}/contact`)
      if (!res.ok) throw new Error('Failed to fetch inquiries')
      const data = await res.json()
      setInquiries(data)
    } catch (err) {
      setError(err.message)
    }
  }

  const fetchSellRequests = async () => {
    try {
      const res = await fetch(`${API_BASE}/sellcars`)
      if (!res.ok) throw new Error('Failed to fetch sell requests')
      const data = await res.json()
      setSellRequests(data)
    } catch (err) {
      setError(err.message)
    }
  }

  const fetchFinanceApps = async () => {
    try {
      const res = await fetch(`${API_BASE}/finance`)
      if (!res.ok) throw new Error('Failed to fetch finance applications')
      const data = await res.json()
      setFinanceApps(data)
    } catch (err) {
      setError(err.message)
    }
  }

  const fetchAllData = async () => {
    setLoading(true)
    setError('')
    await Promise.all([
      fetchCars(),
      fetchInquiries(),
      fetchSellRequests(),
      fetchFinanceApps()
    ])
    setLoading(false)
  }

  useEffect(() => {
    fetchAllData()
  }, [])

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setCarFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (type === 'number' ? Number(value) : value)
    }))
  }

  const openAddForm = () => {
    setEditingCar(null)
    setCarFormData({
      brand: '',
      model: '',
      year: new Date().getFullYear(),
      kmDriven: 0,
      price: 0,
      color: '',
      fuelType: 'Petrol',
      transmission: 'Automatic',
      imageUrl: '',
      isFeatured: false
    })
    setShowForm(true)
  }

  const openEditForm = (car) => {
    setEditingCar(car)
    setCarFormData({
      brand: car.brand,
      model: car.model,
      year: car.year,
      kmDriven: car.kmDriven,
      price: car.price,
      color: car.color,
      fuelType: car.fuelType,
      transmission: car.transmission,
      imageUrl: car.imageUrl,
      isFeatured: car.isFeatured
    })
    setShowForm(true)
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      let res
      if (editingCar) {
        // PUT (Update)
        res = await fetch(`${API_BASE}/cars/${editingCar.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...carFormData, id: editingCar.id })
        })
      } else {
        // POST (Create)
        res = await fetch(`${API_BASE}/cars`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(carFormData)
        })
      }

      if (!res.ok) throw new Error('Failed to save vehicle details')
      
      setShowForm(false)
      await fetchCars()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteCar = async (id) => {
    if (!window.confirm('Are you sure you want to delete this vehicle listing?')) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API_BASE}/cars/${id}`, {
        method: 'DELETE'
      })
      if (!res.ok) throw new Error('Failed to delete vehicle')
      await fetchCars()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Format currency
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val)
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex items-center justify-center p-6 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10 text-left">
          
          <div className="text-center mb-8">
            <span className="text-[10px] bg-amber-500/10 text-amber-500 border border-amber-500/20 px-3 py-1 rounded-full font-black uppercase tracking-widest">
              Secure Operations Console
            </span>
            <h1 className="text-3xl font-bold text-white mt-4 font-serif">Admin Portal</h1>
            <p className="text-slate-400 text-xs mt-2">Enter credentials to unlock database management utilities.</p>
          </div>

          {error && (
            <div className="p-3 mb-4 text-xs font-semibold rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">
              {error}
            </div>
          )}

          {!showForgot ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Admin Email</label>
                <input 
                  type="email" required placeholder="admin@autoflow.in"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-850 rounded-lg px-4 py-2.5 text-xs text-slate-100 placeholder-slate-700 focus:outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500">Password</label>
                  <button 
                    type="button"
                    onClick={() => { setShowForgot(true); setRecoveryStatus(''); setRecoveryEmail(''); }}
                    className="text-[9px] text-amber-500 hover:text-amber-400 font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Forgot?
                  </button>
                </div>
                <input 
                  type="password" required placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-850 rounded-lg px-4 py-2.5 text-xs text-slate-100 placeholder-slate-700 focus:outline-none focus:border-slate-500"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors mt-6 cursor-pointer"
              >
                Sign In
              </button>
            </form>
          ) : (
            <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Register Recovery Email</label>
                <input 
                  type="email" required placeholder="admin@autoflow.in"
                  value={recoveryEmail}
                  onChange={(e) => setRecoveryEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-850 rounded-lg px-4 py-2.5 text-xs text-slate-100 placeholder-slate-700 focus:outline-none focus:border-slate-500"
                />
              </div>

              {recoveryStatus && (
                <div className={`p-3.5 text-xs font-semibold rounded-lg border ${
                  recoveryStatus.startsWith('Success') 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                    : 'bg-red-500/10 text-red-400 border-red-500/20'
                }`}>
                  {recoveryStatus}
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowForgot(false)}
                  className="flex-1 py-3 bg-slate-800 hover:bg-slate-750 text-slate-300 font-bold rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Recover Key
                </button>
              </div>
            </form>
          )}

          <div className="mt-8 pt-4 border-t border-slate-850 text-center">
            <button 
              onClick={() => window.location.href = '/'}
              className="text-[10px] text-slate-500 hover:text-slate-300 font-bold uppercase tracking-widest transition-colors cursor-pointer"
            >
              ← Back to Marketplace
            </button>
          </div>

        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Sidebar / Navbar layout */}
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Admin Navigation */}
        <aside className="w-full md:w-64 bg-slate-900 border-b md:border-b-0 md:border-r border-slate-800 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-8 cursor-pointer" onClick={() => window.location.href = '/'}>
              <span className="text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-600">
                CAR SELL
              </span>
              <span className="text-xs bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded font-semibold uppercase tracking-wider">
                Admin
              </span>
            </div>

            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'dashboard'
                    ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/10'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <span>Dashboard Analytics</span>
              </button>
              <button
                onClick={() => setActiveTab('inventory')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'inventory'
                    ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/10'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <span>Vehicle Inventory</span>
              </button>
              <button
                onClick={() => setActiveTab('inquiries')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'inquiries'
                    ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/10'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <span>Leads & Inquiries</span>
              </button>
              <button
                onClick={() => setActiveTab('sell_requests')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'sell_requests'
                    ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/10'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <span>Car Sell Requests</span>
              </button>
              <button
                onClick={() => setActiveTab('finance')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'finance'
                    ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/10'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <span>Finance Requests</span>
              </button>
            </nav>
          </div>

          <div className="mt-8 border-t border-slate-800 pt-6 space-y-2">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-950/20 border border-red-900/35 hover:bg-red-900/30 text-red-400 hover:text-red-300 rounded-lg text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
            >
              <span>Sign Out</span>
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white rounded-lg text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
            >
              <span>Back to Public Site</span>
            </button>
          </div>
        </aside>

        {/* Content Body */}
        <main className="flex-1 p-8 overflow-y-auto">
          {/* Top Bar info */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 pb-6 mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight capitalize">
                {activeTab.replace('_', ' ')} Dashboard
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                Management Console & MySQL Database Overview
              </p>
            </div>
            <button
              onClick={fetchAllData}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg border border-slate-700 transition-colors uppercase tracking-wider"
            >
              Sync Database
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/15 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm flex justify-between items-center">
              <span>{error}</span>
              <button onClick={() => setError('')} className="font-bold">&times;</button>
            </div>
          )}

          {/* Loader */}
          {loading && !showForm && (
            <div className="text-center py-12 text-slate-400 text-sm font-medium animate-pulse">
              Syncing live details from carselldb...
            </div>
          )}

          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && !loading && (
            <div className="space-y-8">
              {/* Analytics Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total Listings</span>
                  <span className="text-4xl font-extrabold text-white mt-4">{cars.length}</span>
                  <span className="text-xs text-emerald-400 mt-2 font-medium">Cars in Database</span>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Contact Inquiries</span>
                  <span className="text-4xl font-extrabold text-white mt-4">{inquiries.length}</span>
                  <span className="text-xs text-amber-400 mt-2 font-medium">Messages Recieved</span>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Sell Requests</span>
                  <span className="text-4xl font-extrabold text-white mt-4">{sellRequests.length}</span>
                  <span className="text-xs text-orange-400 mt-2 font-medium">Inspection Bookings</span>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Finance Applications</span>
                  <span className="text-4xl font-extrabold text-white mt-4">{financeApps.length}</span>
                  <span className="text-xs text-indigo-400 mt-2 font-medium">Loan Check Applications</span>
                </div>
              </div>

              {/* Quick Actions & Info */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                  <h3 className="text-lg font-bold text-white mb-4">Quick Management Actions</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => { setActiveTab('inventory'); openAddForm(); }}
                      className="p-4 bg-slate-800/50 hover:bg-slate-800 rounded-xl border border-slate-700/50 text-left transition-colors"
                    >
                      <h4 className="font-semibold text-amber-400 text-sm">Add New Listing</h4>
                      <p className="text-xs text-slate-400 mt-1">Post a new car on the marketplace</p>
                    </button>
                    <button
                      onClick={() => setActiveTab('inquiries')}
                      className="p-4 bg-slate-800/50 hover:bg-slate-800 rounded-xl border border-slate-700/50 text-left transition-colors"
                    >
                      <h4 className="font-semibold text-amber-400 text-sm">Check Inquiries</h4>
                      <p className="text-xs text-slate-400 mt-1">Review contact form submissions</p>
                    </button>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                  <h3 className="text-lg font-bold text-white mb-4">Database Details</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">Database Engine</span>
                      <span className="text-slate-200 font-semibold">MySQL 8.0</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">Database Name</span>
                      <span className="text-slate-200 font-semibold">carselldb</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">Host Port Mapping</span>
                      <span className="text-slate-200 font-semibold">3308:3306</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Backend API Address</span>
                      <span className="text-slate-200 font-semibold">http://localhost:5080</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Inventory Tab */}
          {activeTab === 'inventory' && (
            <div className="space-y-6">
              {!showForm ? (
                <>
                  <div className="flex justify-end">
                    <button
                      onClick={openAddForm}
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg transition-colors flex items-center space-x-2 text-sm"
                    >
                      <span>Add Vehicle Listing</span>
                    </button>
                  </div>

                  {/* Desktop Inventory Table */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm border-collapse">
                        <thead>
                          <tr className="bg-slate-800 text-slate-300 border-b border-slate-700 font-semibold">
                            <th className="px-6 py-4">Vehicle</th>
                            <th className="px-6 py-4">Year</th>
                            <th className="px-6 py-4">Price</th>
                            <th className="px-6 py-4">Km Driven</th>
                            <th className="px-6 py-4">Fuel & Gearbox</th>
                            <th className="px-6 py-4">Featured</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                          {cars.map((car) => (
                            <tr key={car.id} className="hover:bg-slate-800/40 transition-colors">
                              <td className="px-6 py-4">
                                <div className="flex items-center space-x-4">
                                  <div className="w-12 h-8 rounded bg-slate-800 overflow-hidden flex items-center justify-center border border-slate-700">
                                    {car.imageUrl ? (
                                      <img src={car.imageUrl} alt={car.model} className="object-cover w-full h-full" />
                                    ) : (
                                      <span className="text-[10px] text-slate-500">No Image</span>
                                    )}
                                  </div>
                                  <div>
                                    <h4 className="font-bold text-white">{car.brand}</h4>
                                    <span className="text-xs text-slate-400">{car.model}</span>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-slate-200">{car.year}</td>
                              <td className="px-6 py-4 text-slate-200 font-semibold">{formatCurrency(car.price)}</td>
                              <td className="px-6 py-4 text-slate-300">{car.kmDriven.toLocaleString()} km</td>
                              <td className="px-6 py-4 text-xs">
                                <span className="px-2 py-1 bg-slate-800 rounded font-medium text-slate-300 mr-2">{car.fuelType}</span>
                                <span className="px-2 py-1 bg-slate-800 rounded font-medium text-slate-300">{car.transmission}</span>
                              </td>
                              <td className="px-6 py-4">
                                {car.isFeatured ? (
                                  <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs rounded-full font-bold">Featured</span>
                                ) : (
                                  <span className="text-slate-500 text-xs">-</span>
                                )}
                              </td>
                              <td className="px-6 py-4 text-right space-x-2">
                                <button
                                  onClick={() => openEditForm(car)}
                                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-amber-400 hover:text-amber-300 text-xs font-bold rounded border border-slate-700 transition-colors"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteCar(car.id)}
                                  className="px-3 py-1 bg-red-950/40 hover:bg-red-900/60 text-red-400 hover:text-red-300 text-xs font-bold rounded border border-red-900/30 transition-colors"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                          {cars.length === 0 && (
                            <tr>
                              <td colSpan="7" className="text-center py-12 text-slate-500">No vehicle listings found in database.</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              ) : (
                /* Add/Edit Form */
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-3xl mx-auto shadow-2xl">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white">
                      {editingCar ? `Edit Listing: ${editingCar.brand} ${editingCar.model}` : 'Create Vehicle Listing'}
                    </h3>
                    <button
                      onClick={() => setShowForm(false)}
                      className="text-slate-400 hover:text-white font-bold"
                    >
                      Cancel
                    </button>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">Brand</label>
                        <input
                          type="text"
                          name="brand"
                          required
                          value={carFormData.brand}
                          onChange={handleInputChange}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
                          placeholder="e.g. Porsche"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">Model</label>
                        <input
                          type="text"
                          name="model"
                          required
                          value={carFormData.model}
                          onChange={handleInputChange}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
                          placeholder="e.g. 911 Carrera S"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">Year</label>
                        <input
                          type="number"
                          name="year"
                          required
                          value={carFormData.year}
                          onChange={handleInputChange}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">Price (INR)</label>
                        <input
                          type="number"
                          name="price"
                          required
                          value={carFormData.price}
                          onChange={handleInputChange}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
                          placeholder="e.g. 18500000"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">KM Driven</label>
                        <input
                          type="number"
                          name="kmDriven"
                          required
                          value={carFormData.kmDriven}
                          onChange={handleInputChange}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
                          placeholder="e.g. 4500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">Color</label>
                        <input
                          type="text"
                          name="color"
                          required
                          value={carFormData.color}
                          onChange={handleInputChange}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
                          placeholder="e.g. Arctic Silver"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">Fuel Type</label>
                        <select
                          name="fuelType"
                          value={carFormData.fuelType}
                          onChange={handleInputChange}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
                        >
                          <option>Petrol</option>
                          <option>Diesel</option>
                          <option>Electric</option>
                          <option>Hybrid</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">Transmission</label>
                        <select
                          name="transmission"
                          value={carFormData.transmission}
                          onChange={handleInputChange}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
                        >
                          <option>Automatic</option>
                          <option>Manual</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">Image Asset Path / URL</label>
                      <input
                        type="text"
                        name="imageUrl"
                        value={carFormData.imageUrl}
                        onChange={handleInputChange}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
                        placeholder="e.g. /assets/b1.png"
                      />
                    </div>

                    <div className="flex items-center space-x-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <input
                        type="checkbox"
                        name="isFeatured"
                        id="isFeatured"
                        checked={carFormData.isFeatured}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-amber-500 bg-slate-900 border-slate-800 rounded focus:ring-0 focus:ring-offset-0"
                      />
                      <label htmlFor="isFeatured" className="text-sm font-semibold text-slate-200 select-none cursor-pointer">
                        Feature this car on the Homepage
                      </label>
                    </div>

                    <div className="flex justify-end space-x-4 pt-4 border-t border-slate-800">
                      <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-sm font-bold rounded-lg transition-colors disabled:opacity-50"
                      >
                        {loading ? 'Saving...' : (editingCar ? 'Update Car' : 'Save Car')}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* Inquiries Tab */}
          {activeTab === 'inquiries' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-800 text-slate-300 border-b border-slate-700 font-semibold">
                      <th className="px-6 py-4">Client Name</th>
                      <th className="px-6 py-4">Contact Info</th>
                      <th className="px-6 py-4">Subject</th>
                      <th className="px-6 py-4">Message</th>
                      <th className="px-6 py-4">Received Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {inquiries.map((inq) => (
                      <tr key={inq.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="px-6 py-4 font-bold text-white">{inq.fullName}</td>
                        <td className="px-6 py-4 text-xs">
                          <div>{inq.email}</div>
                          <div className="text-slate-400 mt-1">{inq.phone || 'No phone'}</div>
                        </td>
                        <td className="px-6 py-4 font-medium text-slate-200">{inq.subject || 'No Subject'}</td>
                        <td className="px-6 py-4 text-slate-400 max-w-sm whitespace-pre-line leading-relaxed">{inq.message}</td>
                        <td className="px-6 py-4 text-xs text-slate-400">{new Date(inq.createdAt).toLocaleString()}</td>
                      </tr>
                    ))}
                    {inquiries.length === 0 && (
                      <tr>
                        <td colSpan="5" className="text-center py-12 text-slate-500">No contact inquiries found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Sell Requests Tab */}
          {activeTab === 'sell_requests' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-800 text-slate-300 border-b border-slate-700 font-semibold">
                      <th className="px-6 py-4">Vehicle Details</th>
                      <th className="px-6 py-4">Seller Info</th>
                      <th className="px-6 py-4">Inspection Slot</th>
                      <th className="px-6 py-4">Expected Price</th>
                      <th className="px-6 py-4">Inspection Address</th>
                      <th className="px-6 py-4">Received Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {sellRequests.map((req) => (
                      <tr key={req.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-bold text-white">{req.brand} {req.model}</div>
                          <div className="text-xs text-slate-400 mt-1">
                            {req.year} • {req.color} • {req.fuelType} • {req.kmDriven.toLocaleString()} km
                          </div>
                        </td>
                        <td className="px-6 py-4 text-xs">
                          <div className="font-bold text-slate-200">{req.fullName}</div>
                          <div>{req.email}</div>
                          <div className="text-slate-400 mt-1">{req.contactNumber}</div>
                        </td>
                        <td className="px-6 py-4 text-xs">
                          <div className="font-semibold text-amber-400">{req.preferredDate}</div>
                          <div className="text-slate-400 mt-1">{req.timeSlot}</div>
                        </td>
                        <td className="px-6 py-4 text-slate-200 font-bold">
                          {req.expectedPrice ? formatCurrency(req.expectedPrice) : 'Not specified'}
                        </td>
                        <td className="px-6 py-4 text-xs text-slate-400 max-w-xs leading-relaxed">
                          <div>{req.address}</div>
                          <div className="text-slate-200 font-medium mt-1">{req.city}</div>
                        </td>
                        <td className="px-6 py-4 text-xs text-slate-400">{new Date(req.createdAt).toLocaleString()}</td>
                      </tr>
                    ))}
                    {sellRequests.length === 0 && (
                      <tr>
                        <td colSpan="6" className="text-center py-12 text-slate-500">No vehicle sell requests received.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Finance Requests Tab */}
          {activeTab === 'finance' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-800 text-slate-300 border-b border-slate-700 font-semibold">
                      <th className="px-6 py-4">Applicant</th>
                      <th className="px-6 py-4">Contact</th>
                      <th className="px-6 py-4">Requested Loan</th>
                      <th className="px-6 py-4">Tenure</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Application Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {financeApps.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="px-6 py-4 font-bold text-white">{app.fullName}</td>
                        <td className="px-6 py-4 text-xs">
                          <div>{app.email}</div>
                          <div className="text-slate-400 mt-1">{app.phone}</div>
                        </td>
                        <td className="px-6 py-4 text-emerald-400 font-bold">{formatCurrency(app.loanAmount)}</td>
                        <td className="px-6 py-4 text-slate-300 font-semibold">{app.tenureMonths} Months</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs rounded-full font-bold">
                            {app.status || 'Pending Review'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs text-slate-400">{new Date(app.createdAt).toLocaleString()}</td>
                      </tr>
                    ))}
                    {financeApps.length === 0 && (
                      <tr>
                        <td colSpan="6" className="text-center py-12 text-slate-500">No finance applications found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
