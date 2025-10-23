import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

gsap.registerPlugin(useGSAP);

const HeroSection = () => {
  const container = useRef();

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { duration: 1, ease: 'power3.out' } });

    tl.from('#welcome', { y: 50, opacity: 0 })
      .from('#title span', { 
        y: 80, 
        opacity: 0, 
        stagger: 0.2, 
        ease: 'back.out(1.7)' 
      }, "-=0.5")
      .from('#tagline', { 
        opacity: 0, 
        y: 30, 
        duration: 1 
      }, "-=0.3")
      .from('#exploreBtn', { 
        opacity: 0, 
        scale: 0.8, 
        duration: 0.8 
      }, "-=0.5");
  }, { scope: container });

  return (
    <section 
      ref={container} 
      className="flex  flex-col justify-center items-center text-center min-h-screen  from-blue-50 to-blue-100"
    >
      
      <h2 id="welcome" className="text-3xl z-1 md:text-4xl font-semibold text-gray-700 mb-3">
        Welcome to
      </h2>

      
      <h1 id="title" className="text-6xl md:text-7xl font-bold text-blue-700 mb-4 flex gap-3">
        <span>Get</span>
        <span>Ur</span>
        <span>Stay</span>
      </h1>

      
      <p id="tagline" className="text-lg md:text-xl text-gray-600 max-w-xl mb-8">
        Find your perfect place — book hotels, PGs, and rental rooms with ease.
      </p>

      
      <button 
        id="exploreBtn" 
        className="px-8 py-3 bg-blue-600 text-white rounded-full text-lg hover:bg-blue-700 transition-all shadow-md"
      >
        Explore Now
      </button>
    </section>
  )
}

export default HeroSection;
