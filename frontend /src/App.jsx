import React, { useState } from 'react'
import Nav from './components/nav'
import Home from './components/home'
import BuyCar from './components/buycar'
import SellCar from './components/sellcar'
import Finance from './components/finance'
import Blog from './components/blog'
import Contact from './components/contact'
import Admin from './components/admin'
import ERP from './components/erp'
import Portal from './components/portal'
import Chat from './components/chat'
import Dealers from './components/dealers'
import Footer from './components/footer'

function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    if (window.location.pathname === '/admin') {
      return 'admin'
    }
    if (window.location.pathname === '/erp') {
      return 'erp'
    }
    if (window.location.pathname === '/portal') {
      return 'portal'
    }
    return 'home'
  })
  const [bookingCar, setBookingCar] = useState(null)
  const [initialSearchQuery, setInitialSearchQuery] = useState('')
  const [initialFilters, setInitialFilters] = useState(null)

  return (
    <>
      {currentPage !== 'admin' && currentPage !== 'erp' && <Nav currentPage={currentPage} onNavigate={setCurrentPage} />}
      {currentPage === 'home' && <Home onNavigate={setCurrentPage} onBookTestDrive={setBookingCar} setInitialSearchQuery={setInitialSearchQuery} setInitialFilters={setInitialFilters} />}
      {currentPage === 'buy' && <BuyCar onNavigate={setCurrentPage} onBookTestDrive={setBookingCar} initialSearchQuery={initialSearchQuery} setInitialSearchQuery={setInitialSearchQuery} initialFilters={initialFilters} setInitialFilters={setInitialFilters} />}
      {currentPage === 'sell' && <SellCar onNavigate={setCurrentPage} setInitialSearchQuery={setInitialSearchQuery} />}
      {currentPage === 'finance' && <Finance onNavigate={setCurrentPage} setInitialSearchQuery={setInitialSearchQuery} />}
      {currentPage === 'blog' && <Blog onNavigate={setCurrentPage} setInitialSearchQuery={setInitialSearchQuery} />}
      {currentPage === 'contact' && <Contact onNavigate={setCurrentPage} setInitialSearchQuery={setInitialSearchQuery} />}
      {currentPage === 'dealers' && <Dealers />}
      {currentPage === 'admin' && <Admin />}
      {currentPage === 'erp' && <ERP />}
      {currentPage === 'portal' && <Portal onNavigate={setCurrentPage} />}
      {currentPage !== 'admin' && currentPage !== 'erp' && <Footer onNavigate={setCurrentPage} />}
      {currentPage !== 'admin' && currentPage !== 'erp' && <Chat />}

      {bookingCar && (
        <TestDriveBookingModal car={bookingCar} onClose={() => setBookingCar(null)} />
      )}
    </>
  )
}

function TestDriveBookingModal({ car, onClose }) {
  const API_BASE = `http://${window.location.hostname}:5080/api`
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    timeSlot: 'Morning (10 AM - 1 PM)'
  })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus({ type: '', message: '' })

    const payload = {
      fullName: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: `Test Drive Request: ${car.brand} ${car.model}`,
      message: `Preferred Date: ${formData.date}\nPreferred Time Slot: ${formData.timeSlot}\nVehicle: ${car.brand} ${car.model} (${car.year} | ${car.color} | ID: ${car.id})`
    }

    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!res.ok) throw new Error('Failed to book test drive. Please try again.')

      setStatus({ type: 'success', message: 'Test drive booked successfully! Our executive will contact you shortly.' })
      setTimeout(() => {
        onClose()
      }, 2500)
    } catch (err) {
      setStatus({ type: 'error', message: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative text-left text-slate-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-full p-2 transition-colors cursor-pointer text-xs"
        >
          ✕
        </button>

        <h3 className="text-xl font-serif font-bold text-white mb-2">Book a Test Drive</h3>
        <p className="text-xs text-slate-400 mb-6">
          Schedule a doorstep inspection & test drive for the <span className="text-amber-500 font-semibold">{car.brand} {car.model}</span>.
        </p>

        {status.message && (
          <div className={`p-4 rounded-xl text-xs font-semibold mb-6 ${
            status.type === 'success' ? 'bg-emerald-950/40 border border-emerald-500/30 text-emerald-400' : 'bg-red-950/40 border border-red-500/30 text-red-400'
          }`}>
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-1.5">Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. John Doe"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-1.5">Email Address</label>
              <input
                type="email"
                required
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-1.5">Phone Number</label>
              <input
                type="tel"
                required
                placeholder="+91 XXXXX XXXXX"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-1.5">Preferred Date</label>
              <input
                type="date"
                required
                min={new Date().toISOString().split('T')[0]}
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-1.5">Time Slot</label>
              <select
                value={formData.timeSlot}
                onChange={(e) => setFormData(prev => ({ ...prev, timeSlot: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
              >
                <option>Morning (10 AM - 1 PM)</option>
                <option>Afternoon (1 PM - 4 PM)</option>
                <option>Evening (4 PM - 7 PM)</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-colors disabled:opacity-50 mt-6 cursor-pointer"
          >
            {loading ? 'Submitting Request...' : 'Confirm Test Drive'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default App
