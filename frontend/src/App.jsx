import React from 'react'
import Home from './Pages/Home.jsx'
import Navbar from './Components/Navbar.jsx'
import Footer from './Components/Footer.jsx'

function App() {
  return (
    <div className='text-2xl text-white '>
      <Navbar></Navbar>

      <Home></Home>

      <Footer></Footer>
    </div>
  )
}

export default App
