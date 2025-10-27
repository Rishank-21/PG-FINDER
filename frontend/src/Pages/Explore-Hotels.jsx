import React, { useState, useRef } from "react";
import { FaSearch, FaHeart } from "react-icons/fa";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useStore } from "../Context/StoreContext";
import { Link } from "react-router-dom";
import { hotels } from "../Temp Data/Data";
import { cities } from "../Temp Data/allCities";
import { allStates } from "../Temp Data/allStates";
gsap.registerPlugin(ScrollTrigger);



const ExploreHotels = () => {
  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [maxPrice, setMaxPrice] = useState(10000);
  const [filtered, setFiltered] = useState(hotels);
  const {favorites, toggleFavorite} = useStore();
  
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  // Filter logic
  const handleFilter = (
    searchValue = search,
    city = cityFilter,
    state = stateFilter,
    price = maxPrice
  ) => {
    const value = searchValue.toLowerCase();
    setFiltered(
      hotels.filter(
        (h) =>
          (h.name.toLowerCase().includes(value) ||
            h.city.toLowerCase().includes(value)) &&
          (city === "" || h.city === city) &&
          (state === "" || h.state === state) &&
          h.price <= price
      )
    );
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    handleFilter(value, cityFilter, stateFilter, maxPrice);
  };

  const handleCity = (e) => {
    const value = e.target.value;
    setCityFilter(value);
    handleFilter(search, value, stateFilter, maxPrice);
  };

  const handleState = (e) => {
    const value = e.target.value;
    setStateFilter(value);
    handleFilter(search, cityFilter, value, maxPrice);
  };

  const handlePrice = (e) => {
    const value = Number(e.target.value);
    setMaxPrice(value);
    handleFilter(search, cityFilter, stateFilter, value);
  };

  const resetFilters = () => {
    setSearch("");
    setCityFilter("");
    setStateFilter("");
    setMaxPrice(10000);
    setFiltered(hotels);
  };

  // GSAP animations
  useGSAP(() => {
    gsap.from(".filter-section", {
      opacity: 0,
      y: -20,
      duration: 0.8,
      ease: "power3.out",
    });
    gsap.from(cardsRef.current, {
      y: 30,
      
      duration: 0.8,
      stagger: 0.1,
      scrollTrigger: { trigger: containerRef.current, start: "top 85%" },
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="my-20 p-4 md:p-8 min-h-screen bg-linear-to-b from-gray-50 to-gray-100 text-black"
    >
      {/* Filters */}
      <div className="filter-section bg-white shadow-md rounded-2xl p-4 md:p-6 max-w-6xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
          {/* Search */}
          <div className="flex items-center w-full md:w-1/4 bg-gray-50 rounded-full px-3 py-2 shadow-sm">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search hotel..."
              className="flex-1 bg-transparent outline-none text-sm md:text-base"
            />
          </div>

          {/* City */}
          <select
            value={cityFilter}
            onChange={handleCity}
            className="w-full md:w-1/4 border border-gray-300 rounded-full px-3 py-2 text-sm md:text-base outline-none"
          >A
            <option value="">All Cities</option>           
             {cities.map((c, i) => (
              <option key={i} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>

          {/* State */}
          <select
            value={stateFilter}
            onChange={handleState}
            className="w-full md:w-1/4 border border-gray-300 rounded-full px-3 py-2 text-sm md:text-base outline-none"
          >
            <option value="">All States</option>
            {allStates.map((s, i) => (
              <option key={i} value={s}>
                {s}
              </option>
            ))}
          </select>

          {/* Price */}
          <div className="flex flex-col w-full md:w-1/4">
            <label className="text-gray-700 text-xs md:text-sm font-medium mb-1">
              Max Price: ₹{maxPrice}
            </label>
            <input
              type="range"
              min="2000"
              max="10000"
              step="100"
              value={maxPrice}
              onChange={handlePrice}
              className="accent-indigo-600 cursor-pointer"
            />
          </div>
        </div>

        <div className="text-right mt-4">
          <button
            onClick={resetFilters}
            className="text-xs md:text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-1.5 rounded-full transition"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Listings */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((hotel, i) => {
          const isFav = (favorites || []).some(f => f.id === hotel.id);

          return(
          <div
            key={hotel.id}
            ref={(el) => (cardsRef.current[i] = el)}
            className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
          >
            <div className="relative">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-48 md:h-56 object-cover"
              />
              <button onClick={()=>toggleFavorite(hotel)} className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:scale-110 transition-transform">
                <FaHeart className={isFav ? "text-red-500" : "text-grey-500 hover:text-red-500"} />
              </button>
            </div>
            <div className="p-4">
              <h3 className="text-base md:text-lg font-semibold text-gray-800">
                {hotel.name}
              </h3>
              <p className="text-sm text-gray-500">
                {hotel.city}, {hotel.state}
              </p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-indigo-600 font-bold text-sm md:text-base">
                  ₹{hotel.price}/night
                </span>
                <Link to={`/property/hotel/${hotel.id}`} className="text-xs md:text-sm bg-indigo-600 text-white px-3 py-1.5 rounded-full hover:bg-indigo-700 transition-all">
                  View
                </Link>
              </div>
            </div>
          </div>
        )
})}
        {filtered.length === 0 && (
          <div className="col-span-full text-center text-gray-500 text-sm md:text-base">
            No hotels found 😕
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreHotels;
