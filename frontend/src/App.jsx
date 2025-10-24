import React from 'react'
import Home from './Pages/Home.jsx'
import Navbar from './Components/Navbar.jsx'
import Footer from './Components/Footer.jsx'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './Pages/Login.jsx'
import RegisterPage from './Pages/Register.jsx'
function App() {
  return (
    <div className='text-2xl text-white '>
      <Navbar></Navbar>
<Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/login' element={<LoginPage/>}/>
  <Route path='/register' element={<RegisterPage />}></Route>
</Routes>

      <Footer></Footer>
    </div>
  )
}

export default App
