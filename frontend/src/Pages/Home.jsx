import React from 'react'
import HeroSection from '../Components/HeroSection'
import FeaturedSection from '../Components/FeatureSection'
import PopularStays from '../Components/PopolarStay'
import WhyChooseUs from '../Components/WhyChooseUs'
import ExploreCities from '../Components/ExploreCities'
import Testimonials from '../Components/TestMonials'
import HowItWorks from '../Components/HowitWorks'
import FAQ from '../Components/FNQ'
const Home = () => {
  return (
    <div className='text-black '>
  <HeroSection></HeroSection>
      <FeaturedSection></FeaturedSection>
      <PopularStays></PopularStays>
      <WhyChooseUs></WhyChooseUs>
      <ExploreCities></ExploreCities>
      <Testimonials></Testimonials>
      <HowItWorks></HowItWorks>
      <FAQ></FAQ>
    </div>
  )
}

export default Home
