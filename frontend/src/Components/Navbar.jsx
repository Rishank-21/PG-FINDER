import React ,{useRef} from 'react'
import { IoMdSearch } from "react-icons/io";
import { IoPersonSharp } from "react-icons/io5";
import {useGSAP} from "@gsap/react"
import { gsap } from 'gsap'
const Navbar = () => {
const logoRef = useRef(null)
const linkRef = useRef(null);
useGSAP( ()=>{
  gsap.from(logoRef.current, {
    y: -50,
    duration: 0.5,
    opacity:0,
    
    
  }),
  gsap.from(linkRef.current.children, {
    y: - 50,
    duration: 0.5,
    stagger:0.2
  })
} )

  return (
    <div>
      <nav className='flex h-15 bg-gray-900  justify-between p-2 fixed w-full z-10 top-0 shdaow-lg'>
        <a ref={logoRef} to='/Home' className='w-15 cursor-pointer flex box-border items-center ml-5 space-x-2'> 
          <img className='w-full rounded-full' src="/Images/GetUrStay.png" alt="GetUrStay" />
          <h1 className='text-2xl font-semibold flex py-1'> <span>Get</span><span>Ur</span> <span>Stay</span></h1>
        </a>
        <div className='flex items-center relative -mr-40 '>
          <IoMdSearch className='absolute'></IoMdSearch>
          <input className='border pl-8 w-[20vw] rounded h-9 text-xl' type="text" placeholder=' Search here...' />
        </div>
        <div className=' items-center  justify-center ml-10'>
          <ul ref={linkRef} className='flex text-2xl space-x-5'>
            <li className='cursor-pointer'> Home </li>
            <li className='cursor-pointer'> My booking</li>
            <li className='cursor-pointer'>Favourite</li>
            <li className='cursor-pointer'> About </li>
          </ul>
          
        </div>
        <div className=' flex items-center space-x-6 text-2xl justify-center mr-5 -ml-50'>
          <div>
            <IoPersonSharp className='size-6 ml-3'></IoPersonSharp>
            <p className='text-xl cursor-pointer'>Profile</p>
          </div>
          <button className='border cursor-pointer w-20 h-10 rounded' >Login</button>
        </div>
      </nav>
      
    </div>
  )
}

export default Navbar
