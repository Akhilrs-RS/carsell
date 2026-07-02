import React, { useState } from 'react'

export default function ERP() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const stats = [
    { label: 'Total Revenue', value: '₹12,45,60,000', change: '+14.2% MoM', icon: '💰' },
    { label: 'Vehicles in Stock', value: '42 Units', change: '+3 new today', icon: '🚗' },
    { label: 'Active CRM Leads', value: '184 Leads', change: '+24 new this week', icon: '👥' },
    { label: 'Pending Inspections', value: '8 Scheduled', change: 'Next at 4 PM', icon: '📝' }
  ]

  const modules = [
    { id: 'dashboard', label: 'Command Dashboard', desc: 'KPI cards & revenue analytical trends', icon: '📊' },
    { id: 'crm', label: 'CRM & Dealer Panel', desc: 'Manage enquiries, customer list, and verified dealers', icon: '👥' },
    { id: 'inventory', label: 'Vehicle Inventory', desc: 'Add, edit, check vehicle status and specs', icon: '🚗' },
    { id: 'accounting', label: 'Accounts & Billing', desc: 'General ledger, GST invoices, and balance sheets', icon: '💳' },
    { id: 'hrms', label: 'HRMS & Payroll', desc: 'Employee registry, attendance, and payslip generator', icon: '💼' },
    { id: 'workshop', label: 'Workshop Service', desc: 'Job cards, mechanic schedules, spare parts', icon: '🔧' }
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* ERP Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md px-8 py-5 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center font-bold text-white shadow-lg shadow-amber-500/20">
            Ω
          </div>
          <div>
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
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* ERP Sidebar */}
        <aside className="w-72 border-r border-slate-800 bg-slate-900/20 p-6 flex flex-col justify-between hidden md:flex">
          <div className="space-y-6">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block px-3">
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
              <h2 className="text-xl md:text-2xl font-serif font-bold text-white mb-2">ERP Route Initialized successfully</h2>
              <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
                You have routed here by adding <code className="bg-slate-900 text-amber-400 px-2 py-0.5 rounded text-[11px] font-mono">/erp</code> to the URL. The backend integration routes are fully prepped for data synchronisation.
              </p>
            </div>
            <a 
              href="/admin"
              className="bg-slate-900 hover:bg-slate-850 border border-slate-800 text-white font-bold text-xs px-5 py-3 rounded-full transition-all shadow-md flex items-center space-x-2 flex-shrink-0"
            >
              <span>Verify /admin Route</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

          {/* Tab Content: Dashboard */}
          {activeTab === 'dashboard' && (
            <div>
              {/* Stats Cards Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {stats.map((stat, i) => (
                  <div key={i} className="bg-slate-900/30 border border-slate-800/80 rounded-2xl p-6 hover:border-slate-700 transition-colors shadow-sm">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-slate-400 text-xs font-semibold">{stat.label}</span>
                      <span className="text-xl">{stat.icon}</span>
                    </div>
                    <div className="text-xl lg:text-2xl font-extrabold text-white mb-1.5">{stat.value}</div>
                    <span className="text-[10px] text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">{stat.change}</span>
                  </div>
                ))}
              </div>

              {/* Module Cards Grid */}
              <h3 className="text-md font-extrabold tracking-wider uppercase text-slate-500 mb-6 text-left">
                Integrated ERP Modules Roadmap
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {modules.slice(1).map((mod, i) => (
                  <div 
                    key={i} 
                    onClick={() => setActiveTab(mod.id)}
                    className="bg-slate-900/20 border border-slate-900 hover:border-slate-800 rounded-2xl p-6 transition-all hover:bg-slate-900/40 cursor-pointer group"
                  >
                    <div className="text-2xl mb-4 bg-slate-900/60 w-11 h-11 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                      {mod.icon}
                    </div>
                    <h4 className="text-sm font-bold text-white mb-2 group-hover:text-amber-500 transition-colors">{mod.label}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-normal">{mod.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab !== 'dashboard' && (
            <div className="text-center py-20 bg-slate-900/10 border border-slate-900 rounded-3xl">
              <span className="text-4xl mb-4 block">🚧</span>
              <h3 className="text-lg font-bold text-white mb-2">Module Integration Pending</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed font-normal">
                This section details data from the {modules.find(m => m.id === activeTab)?.label} API module. It is currently locked and will be built per the active implementation plan.
              </p>
            </div>
          )}

        </main>
      </div>

    </div>
  )
}
