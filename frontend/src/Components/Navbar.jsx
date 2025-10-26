import React, { useRef, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { IoPersonSharp } from "react-icons/io5";
import { HiMenu, HiX } from "react-icons/hi";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const logoRef = useRef(null);
  const linkRef = useRef(null);

  useGSAP(() => {
    gsap.from(logoRef.current, { y: -50, duration: 0.5, opacity: 0 });
    if (linkRef.current) {
      gsap.from(linkRef.current.children, {
        y: -50,
        duration: 0.5,
        stagger: 0.2,
      });
    }
  });

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-gray-900 fixed w-full  z-10 top-0 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-wrap md:flex-nowrap items-center justify-between p-2 md:p-3">
        {/* Logo */}
        <a ref={logoRef} href="/" className="flex items-center space-x-1">
          <img
            src="/Images/GetUrStay.png"
            alt="GetUrStay"
            className="w-8 sm:w-10 sm:h-10 h-8 md:w-12 md:h-12 rounded-full object-cover"
          />
          <h1 className=" text-sm sm:text-xl md:text-2xl font-semibold flex py-1">
            <span>Get</span>
            <span>Ur</span>
            <span>Stay</span>
          </h1>
        </a>

        {/* Hamburger menu button (mobile only) */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-white text-3xl focus:outline-none"
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        {/* Desktop Links + Profile + Login */}
        <div className="hidden md:flex md:items-center md:space-x-6">
          <ul ref={linkRef} className="flex text-xl space-x-5">
            <Link to={"/"}>
              <li className="cursor-pointer">Home</li>
            </Link>
            <Link to={"/my-bookings"}>
              <li className="cursor-pointer">My booking</li>
            </Link>
            <Link to={"/favorites"}>
              {" "}
              <li className="cursor-pointer">Favorites</li>
            </Link>
            <Link to={"/about"}>
              <li className="cursor-pointer">About</li>
            </Link>
          </ul>

          <div className="flex items-center space-x-6">
            <div className="items-center">
              <IoPersonSharp className="text-2xl items-center" />
              <p className="text-xs cursor-pointer">Profile</p>
            </div>
            <Link
              to={"/login"}
              className="border w-20 text-xl text-center h-10 rounded cursor-pointer"
            >
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 text-white px-4 py-4 space-y-4 flex flex-col items-start">
          <ul className="flex flex-col space-y-3 w-full text-lg">
            <Link to={"/"}><li className="cursor-pointer">Home</li></Link>
           <Link to={"my-bookings"}> <li className="cursor-pointer">My booking</li></Link>
            
            <Link to={"/favorites"}> <li className="cursor-pointer">Favorites</li></Link>
            <Link to={"/about"}> <li className="cursor-pointer">About</li></Link>
          </ul>
          <div className="flex flex-col space-y-2 w-full">
            <div className="flex items-center space-x-2">
              <IoPersonSharp className="text-2xl text-white" />
              <p className="text-white cursor-pointer">Profile</p>
            </div>
            <Link
              to={"/login"}
              className="border w-25 text-center h-10 rounded cursor-pointer text-white"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
