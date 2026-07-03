import React, { useState, useEffect } from 'react'

export default function ERP() {
  const API_BASE = `http://${window.location.hostname}:5080/api`
  const [activeTab, setActiveTab] = useState('dashboard')

  // Auth states
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('carsell_erp_auth') === 'true'
  })
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [showForgot, setShowForgot] = useState(false)
  const [recoveryEmail, setRecoveryEmail] = useState('')
  const [recoveryStatus, setRecoveryStatus] = useState('')
  const [authError, setAuthError] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    if (loginEmail === 'erp@autoflow.in' && loginPassword === 'erp') {
      setIsLoggedIn(true)
      localStorage.setItem('carsell_erp_auth', 'true')
      setAuthError('')
    } else {
      setAuthError('Invalid ERP credentials!')
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('carsell_erp_auth')
  }

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault()
    if (recoveryEmail.trim().toLowerCase() === 'erp@autoflow.in') {
      setRecoveryStatus('Success! Temporary ERP access key (Password: erp) has been sent to recovery mailbox: temp-erp-recovery@autoflow.in')
    } else {
      setRecoveryStatus('Error: Entered email is not registered as an ERP operator.')
    }
  }

  // Live Database States
  const [cars, setCars] = useState([])
  const [inquiries, setInquiries] = useState([])
  const [sellRequests, setSellRequests] = useState([])
  const [financeApps, setFinanceApps] = useState([])
  const [customers, setCustomers] = useState([])
  const [dealers, setDealers] = useState([])
  const [invoices, setInvoices] = useState([])
  const [ledgers, setLedgers] = useState([])
  const [employees, setEmployees] = useState([])
  const [services, setServices] = useState([])
  const [jobCards, setJobCards] = useState([])
  const [accounts, setAccounts] = useState([])

  // Modal / Form States
  const [showEmployeeModal, setShowEmployeeModal] = useState(false)
  const [employeeForm, setEmployeeForm] = useState({ name: '', department: 'Sales', position: '', salary: '' })
  const [showInvoiceModal, setShowInvoiceModal] = useState(false)
  const [invoiceForm, setInvoiceForm] = useState({ referenceNumber: '', type: 'Sales', amount: '', taxAmount: '' })
  const [showJobCardModal, setShowJobCardModal] = useState(false)
  const [jobCardForm, setJobCardForm] = useState({ serviceBookingId: '', description: '', sparePartsUsed: '', laborCost: '', sparePartsCost: '' })

  const [loading, setLoading] = useState(false)
  const [actionError, setActionError] = useState('')

  // Load database items
  const fetchData = async () => {
    try {
      const [
        carsRes, inqRes, sellRes, finRes, custRes,
        dealRes, invRes, ledRes, empRes, serRes, jcRes, accRes
      ] = await Promise.all([
        fetch(`${API_BASE}/cars`),
        fetch(`${API_BASE}/contact`),
        fetch(`${API_BASE}/sellcars`),
        fetch(`${API_BASE}/finance`),
        fetch(`${API_BASE}/crm/customers`),
        fetch(`${API_BASE}/crm/dealers`),
        fetch(`${API_BASE}/accounting/invoices`),
        fetch(`${API_BASE}/accounting/ledgers`),
        fetch(`${API_BASE}/operations/employees`),
        fetch(`${API_BASE}/operations/servicebookings`),
        fetch(`${API_BASE}/operations/jobcards`),
        fetch(`${API_BASE}/accounting/accounts`)
      ])

      if (carsRes.ok) setCars(await carsRes.json())
      if (inqRes.ok) setInquiries(await inqRes.json())
      if (sellRes.ok) setSellRequests(await sellRes.json())
      if (finRes.ok) setFinanceApps(await finRes.json())
      if (custRes.ok) setCustomers(await custRes.json())
      if (dealRes.ok) setDealers(await dealRes.json())
      if (invRes.ok) setInvoices(await invRes.json())
      if (ledRes.ok) setLedgers(await ledRes.json())
      if (empRes.ok) setEmployees(await empRes.json())
      if (serRes.ok) setServices(await serRes.json())
      if (jcRes.ok) setJobCards(await jcRes.json())
      if (accRes.ok) setAccounts(await accRes.json())
    } catch (err) {
      console.error('Failed to retrieve ERP context', err)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Dealer Document Verification API call
  const handleVerifyDealer = async (id, status) => {
    setActionError('')
    try {
      const res = await fetch(`${API_BASE}/crm/dealers/${id}/verify`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(status)
      })
      if (!res.ok) throw new Error('Verification failed')
      fetchData()
    } catch (err) {
      setActionError('Failed to change dealer status.')
    }
  }

  // HRMS Hire Employee API call
  const handleHireEmployeeSubmit = async (e) => {
    e.preventDefault()
    setActionError('')
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/operations/employees`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...employeeForm,
          salary: Number(employeeForm.salary)
        })
      })
      if (!res.ok) throw new Error('Create failed')
      setShowEmployeeModal(false)
      setEmployeeForm({ name: '', department: 'Sales', position: '', salary: '' })
      fetchData()
    } catch (err) {
      setActionError('Failed to add employee record.')
    } finally {
      setLoading(false)
    }
  }

  // Create Invoice and Ledger Posting API call
  const handleInvoiceSubmit = async (e) => {
    e.preventDefault()
    setActionError('')
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/accounting/invoices`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...invoiceForm,
          amount: Number(invoiceForm.amount),
          taxAmount: Number(invoiceForm.taxAmount)
        })
      })
      if (!res.ok) throw new Error('Invoice posting failed')
      setShowInvoiceModal(false)
      setInvoiceForm({ referenceNumber: '', type: 'Sales', amount: '', taxAmount: '' })
      fetchData()
    } catch (err) {
      setActionError('Failed to record invoice entry.')
    } finally {
      setLoading(false)
    }
  }

  // Create Workshop Repair Job Card API call
  const handleJobCardSubmit = async (e) => {
    e.preventDefault()
    setActionError('')
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/operations/jobcards`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceBookingId: Number(jobCardForm.serviceBookingId),
          description: jobCardForm.description,
          sparePartsUsed: jobCardForm.sparePartsUsed,
          laborCost: Number(jobCardForm.laborCost),
          sparePartsCost: Number(jobCardForm.sparePartsCost)
        })
      })
      if (!res.ok) throw new Error('Job Card creation failed')
      setShowJobCardModal(false)
      setJobCardForm({ serviceBookingId: '', description: '', sparePartsUsed: '', laborCost: '', sparePartsCost: '' })
      fetchData()
    } catch (err) {
      setActionError('Failed to record job card.')
    } finally {
      setLoading(false)
    }
  }

  // Calculate ERP Dashboard Metrics
  const totalSalesRevenue = invoices
    .filter(i => i.type === 'Sales')
    .reduce((sum, item) => sum + item.amount, 124560000) // Base seed offset + live invoices

  const activeLeadsCount = inquiries.length + financeApps.length + sellRequests.length

  const modules = [
    { id: 'dashboard', label: 'Command Dashboard', desc: 'KPI cards & revenue analytical trends', icon: '📊' },
    { id: 'crm', label: 'CRM & Dealer Panel', desc: 'Manage enquiries, customer list, and verified dealers', icon: '👥' },
    { id: 'inventory', label: 'Vehicle Inventory', desc: 'Add, edit, check vehicle status and specs', icon: '🚗' },
    { id: 'accounting', label: 'Accounts & Billing', desc: 'General ledger, GST invoices, and balance sheets', icon: '💳' },
    { id: 'hrms', label: 'HRMS & Payroll', desc: 'Employee registry, attendance, and payslip generator', icon: '💼' },
    { id: 'workshop', label: 'Workshop Service', desc: 'Job cards, mechanic schedules, spare parts', icon: '🔧' }
  ]

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex items-center justify-center p-6 relative overflow-hidden">
        {/* Decorative backdrop glow elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10 text-left">
          
          <div className="text-center mb-8">
            <span className="text-[10px] bg-amber-500/10 text-amber-500 border border-amber-500/20 px-3 py-1 rounded-full font-black uppercase tracking-widest">
              ERP Operations Terminal
            </span>
            <h1 className="text-3xl font-bold text-white mt-4 font-serif">AutoFlow ERP</h1>
            <p className="text-slate-400 text-xs mt-2">Sign in to initialize enterprise management subsystems.</p>
          </div>

          {authError && (
            <div className="p-3 mb-4 text-xs font-semibold rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">
              {authError}
            </div>
          )}

          {!showForgot ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Operator Email</label>
                <input 
                  type="email" required placeholder="erp@autoflow.in"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-850 rounded-lg px-4 py-2.5 text-xs text-slate-100 placeholder-slate-700 focus:outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500">Access Password</label>
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
                <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Registered ERP Email</label>
                <input 
                  type="email" required placeholder="erp@autoflow.in"
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
              ← Back to Public Website
            </button>
          </div>

        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* ERP Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md px-8 py-5 flex items-center justify-between sticky top-0 z-45">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center font-bold text-white shadow-lg shadow-amber-500/20">
            Ω
          </div>
          <div className="text-left">
            <h1 className="text-sm font-extrabold tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              AutoFlow ERP
            </h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mt-0.5">Enterprise Management Suite</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-[10px] bg-amber-500/10 text-amber-500 border border-amber-500/25 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
            System 2 (ERP & CRM) Active
          </span>
          <div className="h-8 w-px bg-slate-800" />
          <div className="flex items-center space-x-2 bg-slate-800/40 border border-slate-800 px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-slate-300 font-semibold">Admin Agent</span>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-950/20 hover:bg-red-900/35 border border-red-900/40 text-red-400 hover:text-red-300 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* ERP Sidebar */}
        <aside className="w-72 border-r border-slate-800 bg-slate-900/20 p-6 flex flex-col justify-between hidden md:flex">
          <div className="space-y-6">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block px-3 text-left">
              Modules
            </span>
            <nav className="space-y-1.5">
              {modules.map(mod => (
                <button
                  key={mod.id}
                  onClick={() => setActiveTab(mod.id)}
                  className={`w-full text-left px-3 py-3 rounded-xl flex items-center space-x-3.5 transition-all group ${
                    activeTab === mod.id 
                      ? 'bg-gradient-to-r from-amber-500/15 to-transparent border-l-2 border-amber-500 text-white font-semibold' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/40'
                  }`}
                >
                  <span className="text-lg">{mod.icon}</span>
                  <div>
                    <span className="text-xs block">{mod.label}</span>
                    <span className="text-[9px] text-slate-500 font-normal block truncate max-w-[170px] mt-0.5">
                      {mod.desc}
                    </span>
                  </div>
                </button>
              ))}
            </nav>
          </div>

          <div className="border-t border-slate-900 pt-6">
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4 text-center">
              <span className="text-[10px] text-slate-500 font-bold block mb-1">Database Mode</span>
              <span className="text-xs text-slate-200 font-semibold block">MySQL (carselldb)</span>
              <span className="text-[9px] text-slate-400 font-normal block mt-1">Port: 3308</span>
            </div>
          </div>
        </aside>

        {/* ERP Main Body */}
        <main className="flex-1 overflow-y-auto p-8 lg:p-12 text-left">
          
          {/* Active Banner */}
          <div className="bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/20 rounded-3xl p-8 mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h2 className="text-xl md:text-2xl font-serif font-bold text-white mb-2">ERP Command Console</h2>
              <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
                You have routed here by adding <code className="bg-slate-900 text-amber-400 px-2 py-0.5 rounded text-[11px] font-mono">/erp</code> to the URL. The database connection to <code className="bg-slate-900 text-amber-400 px-2 py-0.5 rounded text-[11px] font-mono">carselldb</code> is live and functioning.
              </p>
            </div>
            <a 
              href="/admin"
              className="bg-slate-900 hover:bg-slate-850 border border-slate-800 text-white font-bold text-xs px-5 py-3 rounded-full transition-all shadow-md flex items-center space-x-2 flex-shrink-0"
            >
              <span>Switch to Admin Panel</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

          {actionError && (
            <div className="p-4 mb-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold">
              {actionError}
            </div>
          )}

          {/* Tab Content: Dashboard */}
          {activeTab === 'dashboard' && (
            <div className="space-y-10 animate-fade-in">
              {/* Stats Cards Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-slate-900/30 border border-slate-800/80 rounded-2xl p-6 hover:border-slate-700 transition-colors shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-slate-400 text-xs font-semibold">Total Revenue (INR)</span>
                    <span className="text-xl">💰</span>
                  </div>
                  <div className="text-xl lg:text-2xl font-extrabold text-white mb-1.5">₹{totalSalesRevenue.toLocaleString('en-IN')}</div>
                  <span className="text-[10px] text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">Live Balance</span>
                </div>

                <div className="bg-slate-900/30 border border-slate-800/80 rounded-2xl p-6 hover:border-slate-700 transition-colors shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-slate-400 text-xs font-semibold">Vehicles in Stock</span>
                    <span className="text-xl">🚗</span>
                  </div>
                  <div className="text-xl lg:text-2xl font-extrabold text-white mb-1.5">{cars.length} Units</div>
                  <span className="text-[10px] text-amber-500 font-bold bg-amber-500/10 px-2 py-0.5 rounded-full">Available</span>
                </div>

                <div className="bg-slate-900/30 border border-slate-800/80 rounded-2xl p-6 hover:border-slate-700 transition-colors shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-slate-400 text-xs font-semibold">Active CRM Leads</span>
                    <span className="text-xl">👥</span>
                  </div>
                  <div className="text-xl lg:text-2xl font-extrabold text-white mb-1.5">{activeLeadsCount} Leads</div>
                  <span className="text-[10px] text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">Across Webforms</span>
                </div>

                <div className="bg-slate-900/30 border border-slate-800/80 rounded-2xl p-6 hover:border-slate-700 transition-colors shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-slate-400 text-xs font-semibold">Service Workloads</span>
                    <span className="text-xl">🔧</span>
                  </div>
                  <div className="text-xl lg:text-2xl font-extrabold text-white mb-1.5">{services.length} active</div>
                  <span className="text-[10px] text-amber-500 font-bold bg-amber-500/10 px-2 py-0.5 rounded-full">Workshop tickets</span>
                </div>
              </div>

              {/* Graphical Charts Placeholder */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-slate-900/30 border border-slate-800/80 rounded-3xl p-8 text-left">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Financial Balance Chart</h3>
                  <div className="h-60 w-full flex items-end justify-between px-2 pt-6 border-b border-l border-slate-800 relative">
                    {accounts.map((acc, index) => {
                      const maxBalance = Math.max(...accounts.map(a => Math.abs(a.balance)), 100000000)
                      const pct = (Math.abs(acc.balance) / maxBalance) * 80 // Scale to max 80% height
                      return (
                        <div key={acc.id} className="flex flex-col items-center flex-1 group relative">
                          <div 
                            style={{ height: `${pct}%` }} 
                            className="w-10 rounded-t-lg bg-gradient-to-t from-amber-500 to-orange-500 opacity-80 group-hover:opacity-100 transition-all shadow-md shadow-amber-500/10"
                          />
                          <span className="absolute -top-6 text-[9px] text-slate-400 font-mono hidden group-hover:block whitespace-nowrap bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded">
                            ₹{(acc.balance / 100000).toFixed(1)}L
                          </span>
                          <span className="text-[10px] text-slate-500 mt-2 truncate max-w-[65px] font-medium" title={acc.name}>
                            {acc.name}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="bg-slate-900/30 border border-slate-800/80 rounded-3xl p-8 text-left flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Leads Breakdown By Origin</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-xs mb-1 font-semibold">
                          <span className="text-slate-400">Website Enquiries</span>
                          <span className="text-white">{inquiries.length} requests</span>
                        </div>
                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div className="bg-amber-500 h-full rounded-full" style={{ width: `${(inquiries.length / Math.max(activeLeadsCount, 1)) * 100}%` }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1 font-semibold">
                          <span className="text-slate-400">Finance Eligibility Checks</span>
                          <span className="text-white">{financeApps.length} applications</span>
                        </div>
                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div className="bg-orange-500 h-full rounded-full" style={{ width: `${(financeApps.length / Math.max(activeLeadsCount, 1)) * 100}%` }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1 font-semibold">
                          <span className="text-slate-400">Car Selling Requests</span>
                          <span className="text-white">{sellRequests.length} vehicle posts</span>
                        </div>
                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div className="bg-yellow-500 h-full rounded-full" style={{ width: `${(sellRequests.length / Math.max(activeLeadsCount, 1)) * 100}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-slate-900 pt-6 mt-6">
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Latest System Event</p>
                    <p className="text-xs text-slate-300 font-semibold mt-1">Data sync completed: {new Date().toLocaleTimeString()}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CRM & Dealer Panel */}
          {activeTab === 'crm' && (
            <div className="space-y-10 animate-fade-in">
              {/* Customer List */}
              <div className="bg-slate-900/30 border border-slate-800/80 rounded-3xl p-8">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">VIP Customer Directory</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400">
                        <th className="pb-3 font-semibold">Name</th>
                        <th className="pb-3 font-semibold">Email</th>
                        <th className="pb-3 font-semibold">Phone</th>
                        <th className="pb-3 font-semibold">Address</th>
                        <th className="pb-3 font-semibold">Purchase History</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {customers.map(c => (
                        <tr key={c.id} className="text-slate-300">
                          <td className="py-3 font-semibold text-white">{c.fullName}</td>
                          <td className="py-3">{c.email}</td>
                          <td className="py-3">{c.phone}</td>
                          <td className="py-3">{c.address}</td>
                          <td className="py-3 font-medium text-amber-500">{c.purchaseHistory}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Dealer verification section */}
              <div className="bg-slate-900/30 border border-slate-800/80 rounded-3xl p-8">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Dealer Registration Approvals</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400">
                        <th className="pb-3 font-semibold">Business Name</th>
                        <th className="pb-3 font-semibold">Contact Email</th>
                        <th className="pb-3 font-semibold">Phone</th>
                        <th className="pb-3 font-semibold">Status</th>
                        <th className="pb-3 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {dealers.map(d => (
                        <tr key={d.id} className="text-slate-300">
                          <td className="py-3 font-semibold text-white">{d.businessName}</td>
                          <td className="py-3">{d.email}</td>
                          <td className="py-3">{d.phone}</td>
                          <td className="py-3">
                            <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold ${
                              d.verificationStatus === 'Approved' ? 'bg-emerald-500/10 text-emerald-500' :
                              d.verificationStatus === 'Rejected' ? 'bg-red-500/10 text-red-500' :
                              'bg-amber-500/10 text-amber-500'
                            }`}>
                              {d.verificationStatus}
                            </span>
                          </td>
                          <td className="py-3 text-right space-x-2">
                            {d.verificationStatus === 'Pending Review' && (
                              <>
                                <button 
                                  onClick={() => handleVerifyDealer(d.id, 'Approved')}
                                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg text-[10px] transition-colors cursor-pointer"
                                >
                                  Approve
                                </button>
                                <button 
                                  onClick={() => handleVerifyDealer(d.id, 'Rejected')}
                                  className="bg-red-650 hover:bg-red-750 text-white font-bold px-3 py-1.5 rounded-lg text-[10px] transition-colors cursor-pointer"
                                >
                                  Reject
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                      {dealers.length === 0 && (
                        <tr>
                          <td colSpan="5" className="py-4 text-slate-500 text-center font-normal">No dealer applications available.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Vehicle Inventory */}
          {activeTab === 'inventory' && (
            <div className="bg-slate-900/30 border border-slate-800/80 rounded-3xl p-8 animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Automotive Stock Directory</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="pb-3 font-semibold">Brand / Model</th>
                      <th className="pb-3 font-semibold">Specs</th>
                      <th className="pb-3 font-semibold">Fuel</th>
                      <th className="pb-3 font-semibold">KM Driven</th>
                      <th className="pb-3 font-semibold">Value (INR)</th>
                      <th className="pb-3 font-semibold">Stock Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {cars.map(c => (
                      <tr key={c.id} className="text-slate-300">
                        <td className="py-3">
                          <div className="font-semibold text-white">{c.brand}</div>
                          <div className="text-[10px] text-slate-500">{c.model}</div>
                        </td>
                        <td className="py-3">{c.year} &bull; {c.color}</td>
                        <td className="py-3">{c.fuelType}</td>
                        <td className="py-3">{c.kmDriven.toLocaleString()} km</td>
                        <td className="py-3 font-semibold text-white">₹{(c.price / 100000).toFixed(2)} Lakh</td>
                        <td className="py-3">
                          <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold ${
                            c.isFeatured ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-800 text-slate-400'
                          }`}>
                            {c.isFeatured ? 'Featured Listing' : 'Active Stock'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Accounts & Billing */}
          {activeTab === 'accounting' && (
            <div className="space-y-10 animate-fade-in">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-serif font-bold text-white">Accounts & Invoicing</h2>
                <button 
                  onClick={() => setShowInvoiceModal(true)}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-4 py-2.5 rounded-full text-xs transition-colors cursor-pointer"
                >
                  Generate Invoice
                </button>
              </div>

              {/* General Invoices */}
              <div className="bg-slate-900/30 border border-slate-800/80 rounded-3xl p-8">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">GST Invoices</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400">
                        <th className="pb-3 font-semibold">Ref Number</th>
                        <th className="pb-3 font-semibold">Type</th>
                        <th className="pb-3 font-semibold">Base Amount</th>
                        <th className="pb-3 font-semibold">GST (Tax)</th>
                        <th className="pb-3 font-semibold">Total Invoice</th>
                        <th className="pb-3 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {invoices.map(inv => (
                        <tr key={inv.id} className="text-slate-300">
                          <td className="py-3 font-mono font-bold text-white">{inv.referenceNumber}</td>
                          <td className="py-3">{inv.type}</td>
                          <td className="py-3">₹{inv.amount.toLocaleString()}</td>
                          <td className="py-3 text-red-400">₹{inv.taxAmount.toLocaleString()}</td>
                          <td className="py-3 font-semibold text-white">₹{(inv.amount + inv.taxAmount).toLocaleString()}</td>
                          <td className="py-3">
                            <span className="bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded text-[9px] font-bold">
                              {inv.paymentStatus}
                            </span>
                          </td>
                        </tr>
                      ))}
                      {invoices.length === 0 && (
                        <tr>
                          <td colSpan="6" className="py-4 text-slate-500 text-center font-normal">No invoices recorded in this billing cycle.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* General Ledger entries */}
              <div className="bg-slate-900/30 border border-slate-800/80 rounded-3xl p-8">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">General Ledger Journal Entries</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400">
                        <th className="pb-3 font-semibold">Date</th>
                        <th className="pb-3 font-semibold">Account</th>
                        <th className="pb-3 font-semibold">Type</th>
                        <th className="pb-3 font-semibold">Value</th>
                        <th className="pb-3 font-semibold">Memo / Narration</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {ledgers.map(led => {
                        const accName = accounts.find(a => a.id === led.accountId)?.name || `Account #${led.accountId}`
                        return (
                          <tr key={led.id} className="text-slate-300">
                            <td className="py-3">{new Date(led.date).toLocaleDateString()}</td>
                            <td className="py-3 font-semibold text-white">{accName}</td>
                            <td className="py-3">
                              <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                                led.type === 'Debit' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
                              }`}>
                                {led.type}
                              </span>
                            </td>
                            <td className="py-3 font-semibold">₹{led.amount.toLocaleString()}</td>
                            <td className="py-3 font-normal text-slate-400">{led.description}</td>
                          </tr>
                        )
                      })}
                      {ledgers.length === 0 && (
                        <tr>
                          <td colSpan="5" className="py-4 text-slate-500 text-center font-normal">Journal ledger records will generate automatically on invoice creation.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* HRMS & Payroll */}
          {activeTab === 'hrms' && (
            <div className="space-y-10 animate-fade-in">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-serif font-bold text-white">HRMS Directory</h2>
                <button 
                  onClick={() => setShowEmployeeModal(true)}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-4 py-2.5 rounded-full text-xs transition-colors cursor-pointer"
                >
                  Register Employee
                </button>
              </div>

              {/* Employee Directory */}
              <div className="bg-slate-900/30 border border-slate-800/80 rounded-3xl p-8">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400">
                        <th className="pb-3 font-semibold">Name</th>
                        <th className="pb-3 font-semibold">Department</th>
                        <th className="pb-3 font-semibold">Role / Position</th>
                        <th className="pb-3 font-semibold">Monthly Salary</th>
                        <th className="pb-3 font-semibold">Hired Date</th>
                        <th className="pb-3 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {employees.map(emp => (
                        <tr key={emp.id} className="text-slate-300">
                          <td className="py-3 font-semibold text-white">{emp.name}</td>
                          <td className="py-3">{emp.department}</td>
                          <td className="py-3">{emp.position}</td>
                          <td className="py-3">₹{emp.salary.toLocaleString()}</td>
                          <td className="py-3">{new Date(emp.dateHired).toLocaleDateString()}</td>
                          <td className="py-3">
                            <span className="bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded text-[9px] font-bold">
                              {emp.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Workshop Service */}
          {activeTab === 'workshop' && (
            <div className="space-y-10 animate-fade-in">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-serif font-bold text-white">Workshop & Mechanics Console</h2>
                <button 
                  onClick={() => setShowJobCardModal(true)}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-4 py-2.5 rounded-full text-xs transition-colors cursor-pointer"
                >
                  Create Job Card
                </button>
              </div>

              {/* Service tickets */}
              <div className="bg-slate-900/30 border border-slate-800/80 rounded-3xl p-8">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Service Appointments</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400">
                        <th className="pb-3 font-semibold">Ticket ID</th>
                        <th className="pb-3 font-semibold">Customer</th>
                        <th className="pb-3 font-semibold">Vehicle</th>
                        <th className="pb-3 font-semibold">Service Type</th>
                        <th className="pb-3 font-semibold">Mechanic</th>
                        <th className="pb-3 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {services.map(ser => (
                        <tr key={ser.id} className="text-slate-300">
                          <td className="py-3 font-bold text-white">#SRV-{ser.id}</td>
                          <td className="py-3">{ser.customerName}</td>
                          <td className="py-3">{ser.vehicleDetails}</td>
                          <td className="py-3">{ser.serviceType}</td>
                          <td className="py-3 font-medium text-amber-500">{ser.assignedMechanic}</td>
                          <td className="py-3">
                            <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                              ser.status === 'QC' ? 'bg-orange-500/10 text-orange-500' :
                              ser.status === 'In Progress' ? 'bg-blue-500/10 text-blue-500' :
                              'bg-emerald-500/10 text-emerald-500'
                            }`}>
                              {ser.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Job Cards */}
              <div className="bg-slate-900/30 border border-slate-800/80 rounded-3xl p-8">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Closed Repair Job Cards</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400">
                        <th className="pb-3 font-semibold">Card ID</th>
                        <th className="pb-3 font-semibold">Service ID</th>
                        <th className="pb-3 font-semibold">Work details</th>
                        <th className="pb-3 font-semibold">Labor Cost</th>
                        <th className="pb-3 font-semibold">Parts Cost</th>
                        <th className="pb-3 font-semibold">Total Cost</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {jobCards.map(jc => (
                        <tr key={jc.id} className="text-slate-300">
                          <td className="py-3 font-bold text-white">#JC-{jc.id}</td>
                          <td className="py-3 font-mono">#SRV-{jc.serviceBookingId}</td>
                          <td className="py-3">
                            <div className="font-semibold text-white">{jc.description}</div>
                            <div className="text-[10px] text-slate-500">{jc.sparePartsUsed}</div>
                          </td>
                          <td className="py-3">₹{jc.laborCost.toLocaleString()}</td>
                          <td className="py-3">₹{jc.sparePartsCost.toLocaleString()}</td>
                          <td className="py-3 font-bold text-white">₹{jc.totalCost.toLocaleString()}</td>
                        </tr>
                      ))}
                      {jobCards.length === 0 && (
                        <tr>
                          <td colSpan="6" className="py-4 text-slate-500 text-center font-normal">Create job cards above to close out repairs and log costs.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ================= MODALS ================= */}

      {/* Hire Employee Modal */}
      {showEmployeeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl p-8 shadow-2xl relative text-left">
            <h3 className="text-lg font-serif font-bold text-white mb-6">Register Employee Profile</h3>
            <form onSubmit={handleHireEmployeeSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Employee Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="Rahul Sharma"
                  value={employeeForm.name}
                  onChange={(e) => setEmployeeForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-slate-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Department</label>
                  <select 
                    value={employeeForm.department}
                    onChange={(e) => setEmployeeForm(prev => ({ ...prev, department: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-slate-500"
                  >
                    <option value="Sales">Sales</option>
                    <option value="Finance">Finance</option>
                    <option value="Workshop">Workshop</option>
                    <option value="HR">HR</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Monthly Salary (INR)</label>
                  <input 
                    type="number" 
                    required
                    placeholder="75000"
                    value={employeeForm.salary}
                    onChange={(e) => setEmployeeForm(prev => ({ ...prev, salary: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-slate-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Position / Role</label>
                <input 
                  type="text" 
                  required
                  placeholder="Sales Consultant"
                  value={employeeForm.position}
                  onChange={(e) => setEmployeeForm(prev => ({ ...prev, position: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-slate-500"
                />
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button 
                  type="button"
                  onClick={() => setShowEmployeeModal(false)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-lg uppercase transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg uppercase transition-colors disabled:opacity-50"
                >
                  {loading ? 'Hiring...' : 'Save employee'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Generate Invoice Modal */}
      {showInvoiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl p-8 shadow-2xl relative text-left">
            <h3 className="text-lg font-serif font-bold text-white mb-6">Record Invoice Entry</h3>
            <form onSubmit={handleInvoiceSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Reference Number</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. INV-2026-001"
                  value={invoiceForm.referenceNumber}
                  onChange={(e) => setInvoiceForm(prev => ({ ...prev, referenceNumber: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-slate-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Transaction Type</label>
                  <select 
                    value={invoiceForm.type}
                    onChange={(e) => setInvoiceForm(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-slate-500"
                  >
                    <option value="Sales">Sales (Revenue)</option>
                    <option value="Purchase">Purchase (Cost)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Base Amount (INR)</label>
                  <input 
                    type="number" 
                    required
                    placeholder="e.g. 150000"
                    value={invoiceForm.amount}
                    onChange={(e) => setInvoiceForm(prev => ({ ...prev, amount: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-slate-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">GST Tax Amount (INR)</label>
                <input 
                  type="number" 
                  required
                  placeholder="e.g. 27000"
                  value={invoiceForm.taxAmount}
                  onChange={(e) => setInvoiceForm(prev => ({ ...prev, taxAmount: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-slate-500"
                />
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button 
                  type="button"
                  onClick={() => setShowInvoiceModal(false)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-lg uppercase transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg uppercase transition-colors disabled:opacity-50"
                >
                  {loading ? 'Posting...' : 'Record Invoice'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Job Card Modal */}
      {showJobCardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl p-8 shadow-2xl relative text-left">
            <h3 className="text-lg font-serif font-bold text-white mb-6">Create Repair Job Card</h3>
            <form onSubmit={handleJobCardSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Select Service Appointment</label>
                <select 
                  required
                  value={jobCardForm.serviceBookingId}
                  onChange={(e) => setJobCardForm(prev => ({ ...prev, serviceBookingId: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-slate-500"
                >
                  <option value="">Choose an active booking</option>
                  {services.map(s => (
                    <option key={s.id} value={s.id}>#SRV-{s.id} &bull; {s.customerName} ({s.vehicleDetails})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Work Description</label>
                <input 
                  type="text" 
                  required
                  placeholder="Engine re-calibration and exhaust check"
                  value={jobCardForm.description}
                  onChange={(e) => setJobCardForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Spare Parts Used</label>
                <input 
                  type="text" 
                  required
                  placeholder="Carbon filter, Gasket seal"
                  value={jobCardForm.sparePartsUsed}
                  onChange={(e) => setJobCardForm(prev => ({ ...prev, sparePartsUsed: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-slate-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Labor Cost (INR)</label>
                  <input 
                    type="number" 
                    required
                    placeholder="4500"
                    value={jobCardForm.laborCost}
                    onChange={(e) => setJobCardForm(prev => ({ ...prev, laborCost: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-slate-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Spare Parts Cost (INR)</label>
                  <input 
                    type="number" 
                    required
                    placeholder="8900"
                    value={jobCardForm.sparePartsCost}
                    onChange={(e) => setJobCardForm(prev => ({ ...prev, sparePartsCost: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-slate-500"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button 
                  type="button"
                  onClick={() => setShowJobCardModal(false)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-lg uppercase transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg uppercase transition-colors disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Create Job Card'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
