import React, { useState, useEffect } from 'react'

export default function Portal({ onNavigate }) {
  const API_BASE = `http://${window.location.hostname}:5080/api`

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('carsell_user')
    return saved ? JSON.parse(saved) : null
  })

  // Auth Forms State
  const [isRegister, setIsRegister] = useState(false)
  const [authForm, setAuthForm] = useState({ fullName: '', email: '', password: '', phone: '' })
  const [authError, setAuthError] = useState('')
  const [authLoading, setAuthLoading] = useState(false)

  // Portal Dashboard State
  const [wishlist, setWishlist] = useState([])
  const [activity, setActivity] = useState({ inquiries: [], financeApplications: [], sellRequests: [] })
  const [activeTab, setActiveTab] = useState('wishlist')
  const [loading, setLoading] = useState(false)
  const [portalError, setPortalError] = useState('')

  // Load portal details
  const fetchPortalData = async (userId) => {
    setLoading(true)
    setPortalError('')
    try {
      const [wishRes, actRes] = await Promise.all([
        fetch(`${API_BASE}/portal/wishlist/${userId}`),
        fetch(`${API_BASE}/portal/activity/${userId}`)
      ])

      if (wishRes.ok) setWishlist(await wishRes.json())
      if (actRes.ok) setActivity(await actRes.json())
    } catch (err) {
      setPortalError('Failed to load account details.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      fetchPortalData(user.id)
    }
  }, [user])

  // Handle Login / Registration
  const handleAuthSubmit = async (e) => {
    e.preventDefault()
    setAuthError('')
    setAuthLoading(true)

    const endpoint = isRegister ? 'register' : 'login'
    const payload = isRegister ? authForm : { email: authForm.email, password: authForm.password }

    try {
      const res = await fetch(`${API_BASE}/auth/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message || 'Authentication failed')
      }

      // Store session
      localStorage.setItem('carsell_user', JSON.stringify(data.user))
      setUser(data.user)
      window.dispatchEvent(new Event('storage')) // Notify navbar to update
    } catch (err) {
      setAuthError(err.message)
    } finally {
      setAuthLoading(false)
    }
  }

  // Remove item from Wishlist
  const handleRemoveWishlist = async (carId) => {
    try {
      const res = await fetch(`${API_BASE}/portal/wishlist/${user.id}/${carId}`, {
        method: 'DELETE'
      })
      if (res.ok) {
        setWishlist(prev => prev.filter(c => c.id !== carId))
      }
    } catch (err) {
      console.error('Failed to remove item', err)
    }
  }

  // Logout trigger
  const handleLogout = () => {
    localStorage.removeItem('carsell_user')
    setUser(null)
    setWishlist([])
    setActivity({ inquiries: [], financeApplications: [], sellRequests: [] })
    window.dispatchEvent(new Event('storage')) // Notify navbar
  }

  // Auth View (Unauthenticated)
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center pt-28 pb-20 px-6 font-sans">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative text-left">
          
          <div className="text-center mb-8">
            <span className="text-[10px] bg-amber-500/10 text-amber-500 border border-amber-500/25 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
              Customer Portal Access
            </span>
            <h2 className="text-2xl font-serif font-bold text-white mt-4">
              {isRegister ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-xs text-slate-500 mt-1.5">
              {isRegister ? 'Sign up to check loan options & track bookings' : 'Sign in to access your wishlist & applications'}
            </p>
          </div>

          {authError && (
            <div className="p-3 mb-5 text-xs font-semibold rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">
              {authError}
            </div>
          )}

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="Arjun Mehta"
                  value={authForm.fullName}
                  onChange={(e) => setAuthForm(prev => ({ ...prev, fullName: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-sm text-slate-100 placeholder-slate-700 focus:outline-none focus:border-slate-500"
                />
              </div>
            )}

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
              <input 
                type="email" 
                required
                placeholder="arjun@example.com"
                value={authForm.email}
                onChange={(e) => setAuthForm(prev => ({ ...prev, email: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-sm text-slate-100 placeholder-slate-700 focus:outline-none focus:border-slate-500"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Password</label>
              <input 
                type="password" 
                required
                placeholder="••••••••"
                value={authForm.password}
                onChange={(e) => setAuthForm(prev => ({ ...prev, password: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-sm text-slate-100 placeholder-slate-700 focus:outline-none focus:border-slate-500"
              />
            </div>

            {isRegister && (
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="+91 98765 43210"
                  value={authForm.phone}
                  onChange={(e) => setAuthForm(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-sm text-slate-100 placeholder-slate-700 focus:outline-none focus:border-slate-500"
                />
              </div>
            )}

            <button 
              type="submit"
              disabled={authLoading}
              className="w-full bg-white hover:bg-slate-100 text-slate-950 font-bold py-4 rounded-lg text-xs tracking-wider uppercase transition-colors shadow-md disabled:opacity-50 mt-2"
            >
              {authLoading ? 'Verifying...' : isRegister ? 'Register Account' : 'Sign In'}
            </button>
          </form>

          <div className="text-center mt-6">
            <button 
              onClick={() => {
                setIsRegister(!isRegister)
                setAuthError('')
              }}
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
          </div>

        </div>
      </div>
    )
  }

  // Dashboard View (Authenticated)
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans pt-20">
      {/* Portal Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md px-8 py-6 flex items-center justify-between">
        <div className="text-left">
          <h1 className="text-xl font-bold font-serif text-white">Hello, {user.fullName}</h1>
          <p className="text-xs text-slate-400">Manage your wishlists, inquiries, and application statuses.</p>
        </div>

        <button 
          onClick={handleLogout}
          className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-4 py-2 rounded-lg text-xs transition-colors cursor-pointer"
        >
          Logout
        </button>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full px-6 py-12 flex flex-col lg:flex-row gap-8 text-left">
        
        {/* Navigation Sidebar */}
        <aside className="w-full lg:w-64 flex flex-col space-y-2 flex-shrink-0">
          <button 
            onClick={() => setActiveTab('wishlist')}
            className={`w-full text-left px-4 py-3 rounded-xl flex items-center space-x-3 text-xs transition-colors font-bold uppercase tracking-wider ${
              activeTab === 'wishlist' ? 'bg-amber-600 text-white shadow-md' : 'bg-slate-900/40 text-slate-400 hover:bg-slate-900'
            }`}
          >
            <span>❤️</span>
            <span>My Wishlist ({wishlist.length})</span>
          </button>

          <button 
            onClick={() => setActiveTab('finance')}
            className={`w-full text-left px-4 py-3 rounded-xl flex items-center space-x-3 text-xs transition-colors font-bold uppercase tracking-wider ${
              activeTab === 'finance' ? 'bg-amber-600 text-white shadow-md' : 'bg-slate-900/40 text-slate-400 hover:bg-slate-900'
            }`}
          >
            <span>💳</span>
            <span>Finance Applications ({activity.financeApplications.length})</span>
          </button>

          <button 
            onClick={() => setActiveTab('sell')}
            className={`w-full text-left px-4 py-3 rounded-xl flex items-center space-x-3 text-xs transition-colors font-bold uppercase tracking-wider ${
              activeTab === 'sell' ? 'bg-amber-600 text-white shadow-md' : 'bg-slate-900/40 text-slate-400 hover:bg-slate-900'
            }`}
          >
            <span>🏷️</span>
            <span>My Selling Posts ({activity.sellRequests.length})</span>
          </button>

          <button 
            onClick={() => setActiveTab('inquiry')}
            className={`w-full text-left px-4 py-3 rounded-xl flex items-center space-x-3 text-xs transition-colors font-bold uppercase tracking-wider ${
              activeTab === 'inquiry' ? 'bg-amber-600 text-white shadow-md' : 'bg-slate-900/40 text-slate-400 hover:bg-slate-900'
            }`}
          >
            <span>✉️</span>
            <span>General Inquiries ({activity.inquiries.length})</span>
          </button>
        </aside>

        {/* Content Section */}
        <section className="flex-grow bg-slate-900/20 border border-slate-800/80 rounded-3xl p-8 min-h-[60vh]">
          {loading && <div className="text-center text-slate-500 py-10 font-normal">Loading account feeds...</div>}
          {portalError && <div className="text-center text-red-400 py-10 font-semibold">{portalError}</div>}

          {!loading && !portalError && (
            <div>
              {/* TAB 1: WISHLIST */}
              {activeTab === 'wishlist' && (
                <div>
                  <h3 className="text-lg font-serif font-bold text-white mb-6">Saved Luxury Inventory</h3>
                  
                  {wishlist.length === 0 ? (
                    <div className="text-center py-20 text-slate-500 font-normal">
                      Your wishlist is empty. 
                      <button 
                        onClick={() => onNavigate('buy')} 
                        className="text-amber-500 font-bold hover:underline block mx-auto mt-2 text-xs uppercase"
                      >
                        Browse cars catalog
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {wishlist.map(car => (
                        <div key={car.id} className="bg-slate-900 border border-slate-850 rounded-2xl overflow-hidden flex flex-col">
                          <div className="h-44 bg-slate-950 overflow-hidden relative">
                            <img src={car.imageUrl} alt={car.brand} className="w-full h-full object-cover" />
                            <button 
                              onClick={() => handleRemoveWishlist(car.id)}
                              className="absolute top-3 right-3 bg-red-650/80 hover:bg-red-700 text-white rounded-full p-2 shadow-md transition-colors"
                              title="Remove from wishlist"
                            >
                              ✕
                            </button>
                          </div>
                          <div className="p-5 flex-grow flex flex-col justify-between">
                            <div>
                              <h4 className="text-sm font-bold text-white">{car.brand} {car.model}</h4>
                              <p className="text-[11px] text-slate-400 mt-1">{car.year} &bull; {car.kmDriven.toLocaleString()} km &bull; {car.fuelType}</p>
                            </div>
                            <div className="flex justify-between items-center mt-5 pt-3 border-t border-slate-850">
                              <span className="text-xs font-bold text-amber-500">₹{(car.price / 100000).toFixed(2)} Lakh</span>
                              <button 
                                onClick={() => onNavigate('buy')}
                                className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-3 py-1.5 rounded-lg text-[10px] transition-colors"
                              >
                                View Listing
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: FINANCE */}
              {activeTab === 'finance' && (
                <div>
                  <h3 className="text-lg font-serif font-bold text-white mb-6">Finance Applications Status</h3>
                  
                  {activity.financeApplications.length === 0 ? (
                    <div className="text-center py-20 text-slate-500 font-normal">
                      No loan eligibility checks submitted yet.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {activity.financeApplications.map(app => (
                        <div key={app.id} className="bg-slate-900/50 border border-slate-850 rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <div>
                            <div className="flex items-center space-x-2.5">
                              <span className="text-xs font-bold text-white">Loan Amount: ₹{app.loanAmount.toLocaleString()}</span>
                              <span className="text-[10px] text-slate-400">&bull; {app.tenureMonths} Months</span>
                            </div>
                            <p className="text-[10px] text-slate-500 mt-1">Submitted: {new Date(app.createdAt).toLocaleDateString()}</p>
                          </div>
                          
                          <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-start">
                            <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold ${
                              app.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                              app.status === 'Rejected' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                              'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                            }`}>
                              {app.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: SELLING POSTS */}
              {activeTab === 'sell' && (
                <div>
                  <h3 className="text-lg font-serif font-bold text-white mb-6">My Scheduled Inspections</h3>
                  
                  {activity.sellRequests.length === 0 ? (
                    <div className="text-center py-20 text-slate-500 font-normal">
                      No car selling inspection requests recorded.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {activity.sellRequests.map(req => (
                        <div key={req.id} className="bg-slate-900/50 border border-slate-850 rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <div>
                            <h4 className="text-xs font-bold text-white">{req.brand} {req.model} ({req.year})</h4>
                            <p className="text-[10px] text-slate-400 mt-1">
                              Inspection Slot: <span className="text-amber-500 font-medium">{req.preferredDate}</span> ({req.timeSlot})
                            </p>
                            <p className="text-[10px] text-slate-500 mt-0.5">Address: {req.address}</p>
                          </div>
                          
                          <span className="bg-emerald-500/10 text-emerald-500 px-2.5 py-1 rounded-full text-[9px] font-bold border border-emerald-500/20">
                            Scheduled
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: GENERAL INQUIRIES */}
              {activeTab === 'inquiry' && (
                <div>
                  <h3 className="text-lg font-serif font-bold text-white mb-6">Submitted Support Inquiries</h3>
                  
                  {activity.inquiries.length === 0 ? (
                    <div className="text-center py-20 text-slate-500 font-normal">
                      No general inquiry messages recorded.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {activity.inquiries.map(inq => (
                        <div key={inq.id} className="bg-slate-900/50 border border-slate-850 rounded-2xl p-5 text-left">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-xs font-bold text-white">Subject: {inq.subject || 'No Subject'}</h4>
                            <span className="text-[9px] text-slate-500">{new Date(inq.createdAt).toLocaleDateString()}</span>
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed font-normal">{inq.message}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </div>
          )}

        </section>

      </div>
    </div>
  )
}
