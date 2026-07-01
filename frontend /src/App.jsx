import React, { useState } from 'react'
import Nav from './components/nav'
import Home from './components/home'
import BuyCar from './components/buycar'
import SellCar from './components/sellcar'
import Finance from './components/finance'
import Blog from './components/blog'
import Contact from './components/contact'
import Footer from './components/footer'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  return (
    <>
      <Nav currentPage={currentPage} onNavigate={setCurrentPage} />
      {currentPage === 'home' && <Home />}
      {currentPage === 'buy' && <BuyCar />}
      {currentPage === 'sell' && <SellCar onNavigate={setCurrentPage} />}
      {currentPage === 'finance' && <Finance />}
      {currentPage === 'blog' && <Blog />}
      {currentPage === 'contact' && <Contact />}
      <Footer />
    </>
  )
}

export default App
