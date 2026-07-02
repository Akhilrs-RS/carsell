import React, { useState, useEffect } from 'react'
import bcImg from '../assets/bc.png'
import cvImg from '../assets/cv.png'

export default function Finance() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    loanAmount: '',
    tenureMonths: 36,
    carId: ''
  })

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch('http://localhost:5080/api/cars')
        if (res.ok) {
          const data = await res.json()
          setCars(data)
        }
      } catch (err) {
        console.error('Failed to fetch cars', err)
      }
    }
    fetchCars()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'loanAmount' || name === 'tenureMonths' ? Number(value) : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    const payload = {
      ...formData,
      carId: formData.carId ? Number(formData.carId) : null
    }

    try {
      const res = await fetch('http://localhost:5080/api/finance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!res.ok) throw new Error('Submission failed')

      setSuccess(true)
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        loanAmount: '',
        tenureMonths: 36,
        carId: ''
      })
      setTimeout(() => {
        setIsModalOpen(false)
        setSuccess(false)
      }, 3000)
    } catch (err) {
      setError('Failed to submit application. Please check your inputs and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white text-slate-900 min-h-screen pb-24">
      {/* Hero Section (Dark Theme) */}
      <section className="relative w-full min-h-[75vh] flex flex-col justify-center pt-28 pb-16 px-6 overflow-hidden bg-slate-950 text-white">
        {/* Background Image: bc.png */}
        <div className="absolute inset-0 w-full h-full z-0">
          <img
            src={bcImg}
            alt="Finance Background"
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
              THE GARAGE
            </span>

            {/* Main Title */}
            <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6 font-serif">
              Drive your Dream <br />
              Car with Easy Finance
            </h1>

            {/* Subtitle */}
            <p className="text-slate-300 max-w-lg text-sm leading-relaxed mb-8">
              Buying guides, finance tips, market analysis, and driving stories.
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

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-6 -mt-12 relative z-30">
        
        {/* Highlights Row (4 Stats Cards) */}
        <div className="bg-[#f8f9fa] rounded-3xl p-6 border border-slate-100 shadow-sm mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Stat 1 */}
            <div className="bg-white rounded-2xl p-6 text-center border border-slate-100/80 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-1">95%</div>
              <div className="text-xs text-slate-500 font-medium">Approval Support</div>
            </div>

            {/* Stat 2 */}
            <div className="bg-white rounded-2xl p-6 text-center border border-slate-100/80 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-1">20+</div>
              <div className="text-xs text-slate-500 font-medium">Finance Partners</div>
            </div>

            {/* Stat 3 */}
            <div className="bg-white rounded-2xl p-6 text-center border border-slate-100/80 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-1">24 Hrs</div>
              <div className="text-xs text-slate-500 font-medium">Fast Processing</div>
            </div>

            {/* Stat 4 */}
            <div className="bg-white rounded-2xl p-6 text-center border border-slate-100/80 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-1">0 Hidden</div>
              <div className="text-xs text-slate-500 font-medium">Extra Charges</div>
            </div>

          </div>
        </div>

        {/* "Finance in 4 simple steps" Section */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-8 text-left">
            Finance in 4 simple steps
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-8 text-center border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center">
              <div className="w-8 h-8 rounded-full border border-slate-300 text-slate-500 flex items-center justify-center text-xs font-bold mb-4">
                1
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-2">Select your Car</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Choose any Verified pre -Owned vehicle from our collection.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-8 text-center border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center">
              <div className="w-8 h-8 rounded-full border border-slate-300 text-slate-500 flex items-center justify-center text-xs font-bold mb-4">
                2
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-2">Calculate EMI</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Adjust price, down payment, tenure, and interest rate.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-8 text-center border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center">
              <div className="w-8 h-8 rounded-full border border-slate-300 text-slate-500 flex items-center justify-center text-xs font-bold mb-4">
                3
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-2">Submit Details</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Share basic personal and finance information securely.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-2xl p-8 text-center border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center">
              <div className="w-8 h-8 rounded-full border border-slate-300 text-slate-500 flex items-center justify-center text-xs font-bold mb-4">
                4
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-2">Get Approval</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Our finance team will contact you with the best loan options.
              </p>
            </div>

          </div>
        </div>

        {/* "Documents Needed" Section */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-8 text-left">
            Documents Needed
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            
            {/* Doc 1: Aadhaar Card */}
            <div className="bg-white rounded-2xl p-6 text-center border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center min-h-[140px]">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <span className="text-xs font-bold text-slate-800">Aadhaar Card</span>
            </div>

            {/* Doc 2: PAN Card */}
            <div className="bg-white rounded-2xl p-6 text-center border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center min-h-[140px]">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                </svg>
              </div>
              <span className="text-xs font-bold text-slate-800">PAN Card</span>
            </div>

            {/* Doc 3: Address Proof */}
            <div className="bg-white rounded-2xl p-6 text-center border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center min-h-[140px]">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <span className="text-xs font-bold text-slate-800">Address Proof</span>
            </div>

            {/* Doc 4: Bank Statement */}
            <div className="bg-white rounded-2xl p-6 text-center border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center min-h-[140px]">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span className="text-xs font-bold text-slate-800">Bank Statement</span>
            </div>

            {/* Doc 5: Salary Proof */}
            <div className="bg-white rounded-2xl p-6 text-center border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center min-h-[140px]">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="text-xs font-bold text-slate-800 leading-tight">Salary Proof/ <br /> Income Proof</span>
            </div>

            {/* Doc 6: Passport Photo */}
            <div className="bg-white rounded-2xl p-6 text-center border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center min-h-[140px]">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-xs font-bold text-slate-800 leading-tight">Passport Size <br /> Photo</span>
            </div>

          </div>
        </div>

        {/* Bottom CTA Banner Card */}
        <div className="bg-[#505050] rounded-3xl p-8 md:p-12 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between overflow-hidden relative border border-slate-600/40">
          
          {/* Left Column */}
          <div className="lg:w-5/12 z-10 text-left mb-8 lg:mb-0">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3 leading-tight">
              Ready to Own Your Next Car ?
            </h2>
            <p className="text-sm text-slate-200 leading-relaxed mb-8 max-w-sm">
              Check your EMI and get Quick finance support for your selected vehicle.
            </p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-white hover:bg-slate-100 text-slate-900 font-bold px-6 py-3.5 rounded-full text-xs transition-all shadow-md inline-flex items-center space-x-2 group cursor-pointer"
            >
              <span>Check Finance Eligibility</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Center Car Image */}
          <div className="lg:w-4/12 flex justify-center my-4 lg:my-0 z-10">
            <img 
              src={cvImg} 
              alt="Finance Vehicle" 
              className="w-full max-w-[340px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500" 
            />
          </div>

          {/* Right Column: Checkmark list */}
          <div className="lg:w-3/12 z-10 space-y-4 text-left w-full sm:w-auto mt-6 lg:mt-0">
            
            <div className="flex items-center space-x-3">
              <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="text-xs font-semibold text-slate-200">Best Interest Rates</span>
            </div>

            <div className="flex items-center space-x-3">
              <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="text-xs font-semibold text-slate-200">Flexible EMI Options</span>
            </div>

            <div className="flex items-center space-x-3">
              <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="text-xs font-semibold text-slate-200">Quick Loan Approval</span>
            </div>

            <div className="flex items-center space-x-3">
              <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="text-xs font-semibold text-slate-200">Trusted Bank Partners</span>
            </div>

          </div>

        </div>

      </section>
      {/* Eligibility Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm transition-opacity">
          <div className="bg-white w-full max-w-xl rounded-3xl p-8 shadow-2xl relative border border-slate-100 flex flex-col max-h-[90vh]">
            
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-900 font-serif">Check Finance Eligibility</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-900 text-2xl font-semibold focus:outline-none"
              >
                &times;
              </button>
            </div>

            {/* Status alerts */}
            {success ? (
              <div className="text-center py-12 text-emerald-600 font-bold flex flex-col items-center">
                <svg className="w-16 h-16 mb-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h4 className="text-lg font-bold text-slate-950 mb-1">Application Submitted!</h4>
                <p className="text-xs text-slate-500 font-normal">Our loan approval experts will review your request shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto pr-1">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Full Name</label>
                  <input 
                    type="text" 
                    name="fullName"
                    required
                    placeholder="Arjun Mehta" 
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400 focus:bg-white transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      placeholder="arjun@example.com" 
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400 focus:bg-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      placeholder="+91 98765 43210" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Requested Loan Amount (INR)</label>
                    <input 
                      type="number" 
                      name="loanAmount"
                      required
                      placeholder="e.g. 5000000" 
                      value={formData.loanAmount}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400 focus:bg-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tenure (Months)</label>
                    <select 
                      name="tenureMonths"
                      value={formData.tenureMonths}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-slate-400 focus:bg-white transition-colors"
                    >
                      <option value={12}>12 Months</option>
                      <option value={24}>24 Months</option>
                      <option value={36}>36 Months</option>
                      <option value={48}>48 Months</option>
                      <option value={60}>60 Months</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Select Vehicle (Optional)</label>
                  <select 
                    name="carId"
                    value={formData.carId}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-slate-400 focus:bg-white transition-colors"
                  >
                    <option value="">No specific vehicle selected</option>
                    {cars.map(c => (
                      <option key={c.id} value={c.id}>{c.brand} {c.model} ({c.year})</option>
                    ))}
                  </select>
                </div>

                {error && (
                  <div className="p-3 text-xs font-semibold rounded-lg bg-red-50 text-red-600 border border-red-200">
                    {error}
                  </div>
                )}

                <div className="pt-4 flex justify-end space-x-3 border-t border-slate-100">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg uppercase tracking-wider transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={loading}
                    className="px-5 py-2.5 bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold rounded-lg uppercase tracking-wider transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  )
}
