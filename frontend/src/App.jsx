import React from 'react'
import Home from './Pages/Home.jsx'
import Navbar from './Components/Navbar.jsx'
import Footer from './Components/Footer.jsx'
import { Routes, Route, useLocation } from 'react-router-dom'
import LoginPage from './Pages/Login.jsx'
import RegisterPage from './Pages/Register.jsx'
import ExploreHotels from './Pages/Explore-Hotels.jsx'
import ExplorePGs from './Pages/Explore-Pg.jsx'
import ExploreRooms from './Pages/Explore-room_On_Rent.jsx'
import FavoritesPage from './Pages/FavouritePage.jsx'
import AboutPage from './Pages/AboutPage.jsx'
import Profile from './Pages/Profile.jsx'
import PropertyDetails from './Pages/DetailsPage.jsx'
import CityPage from './Pages/CityPage.jsx'
import MyBookings from './Pages/My-Bookings.jsx'
import BookingForm from './Pages/Booking-Form.jsx'
import PaymentPage from './Pages/PayMent-Page.jsx'
import ListYourPlace from './Pages/list-ur-property.jsx'
function App() {
  const loaction = useLocation();
  const hideLayout = loaction.pathname === '/login'|| location.pathname === '/register';
  return (

    <div className='text-2xl text-white '>

     {!hideLayout &&  <Navbar/>}
<Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/login' element={<LoginPage/>}/>
  <Route path='/register' element={<RegisterPage />}></Route>
  <Route path='/explore/hotels' element={< ExploreHotels/>}></Route>
  < Route path='/explore/pgs' element={< ExplorePGs/>}/>
  < Route path='/explore/rooms' element={< ExploreRooms/>}/>
  < Route path='/favorites' element={<FavoritesPage />}/>
  < Route path='/about' element={< AboutPage />}/>
  < Route path='/profile' element={< Profile />}/>
  <Route path='/property/:category/:id' element={< PropertyDetails/>} />
  <Route path='/city/:cityName' element={< CityPage/>}/>
  < Route path='/my-bookings' element={< MyBookings/>}/>
  < Route path='/book/:category/:id' element={< BookingForm/>}/>
  < Route path='/payment' element={<PaymentPage/>}/>
  < Route path='/profile/list-your-place' element={<ListYourPlace/>}/>
  < Route path='/list-your-place' element={< ListYourPlace/>}/>
</Routes>

      <Footer></Footer>
    </div>
  )
}

export default App
