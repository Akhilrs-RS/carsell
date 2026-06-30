import React, { useState } from 'react'
import Nav from './components/nav'
import Home from './components/home'
import BuyCar from './components/buycar'
import Footer from './components/footer'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  return (
    <>
      <Nav currentPage={currentPage} onNavigate={setCurrentPage} />
      {currentPage === 'home' ? <Home /> : <BuyCar />}
      <Footer />
    </>
  )
}

export default App
