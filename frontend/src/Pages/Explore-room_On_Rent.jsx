import React, { useState, useRef } from "react";
import { FaSearch, FaHeart } from "react-icons/fa";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useStore } from "../Context/StoreContext";
gsap.registerPlugin(ScrollTrigger);

// Example Rooms on Rent
const rooms = [
  { id: 1, name: "Cozy Apartment", city: "Mumbai", state: "Maharashtra", price: 12000, image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: 2, name: "Sunny Room", city: "Delhi", state: "Delhi", price: 9000, image: "https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: 3, name: "Central Studio", city: "Bengaluru", state: "Karnataka", price: 10000, image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: 4, name: "Budget Room", city: "Chennai", state: "Tamil Nadu", price: 7000, image: "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: 5, name: "Downtown Room", city: "Pune", state: "Maharashtra", price: 11000, image: "https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: 6, name: "Comfort Stay", city: "Goa", state: "Goa", price: 8000, image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800" },
];


// Full India city/state lists
const allStates = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana",
  "Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur",
  "Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana",
  "Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Delhi","Jammu and Kashmir","Ladakh"
];

const allCities = [
  "Mumbai","Delhi","Bengaluru","Chennai","Kolkata","Hyderabad","Pune","Jaipur","Goa","Manali",
  "Chandigarh","Lucknow","Varanasi","Ahmedabad","Indore","Surat","Coimbatore","Nagpur","Patna",
  "Bhubaneswar","Thiruvananthapuram","Dehradun"
];

const ExploreRooms = () => {
  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [maxPrice, setMaxPrice] = useState(15000);
  const [filtered, setFiltered] = useState(rooms);
  const { favorites, toggleFavorite} = useStore();


  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  // Filter logic
  const handleFilter = (searchValue = search, city = cityFilter, state = stateFilter, price = maxPrice) => {
    const value = searchValue.toLowerCase();
    setFiltered(
      rooms.filter(
        (r) =>
          (r.name.toLowerCase().includes(value) || r.city.toLowerCase().includes(value)) &&
          (city === "" || r.city === city) &&
          (state === "" || r.state === state) &&
          r.price <= price
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
    setMaxPrice(15000);
    setFiltered(rooms);
  };

  // GSAP animations
  useGSAP(() => {
    gsap.from(".filter-section", { opacity: 0, y: -20, duration: 0.8, ease: "power3.out" });
    gsap.from(cardsRef.current, { y: 30, duration: 0.8, stagger: 0.1, scrollTrigger: { trigger: containerRef.current, start: "top 85%" } });
  }, []);

  return (
    <div ref={containerRef} className="my-20 p-4 md:p-8 min-h-screen bg-linear-to-b from-gray-50 to-gray-100 text-black">
      {/* Filters */}
      <div className="filter-section bg-white shadow-md rounded-2xl p-4 md:p-6 max-w-6xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
          {/* Search */}
          <div className="flex items-center w-full md:w-1/4 bg-gray-50 rounded-full px-3 py-2 shadow-sm">
            <FaSearch className="text-gray-500 mr-2" />
            <input type="text" value={search} onChange={handleSearch} placeholder="Search room..." className="flex-1 bg-transparent outline-none text-sm md:text-base" />
          </div>

          {/* City */}
          <select value={cityFilter} onChange={handleCity} className="w-full md:w-1/4 border border-gray-300 rounded-full px-3 py-2 text-sm md:text-base outline-none">
            <option value="">All Cities</option>
            {allCities.map((c, i) => <option key={i} value={c}>{c}</option>)}
          </select>

          {/* State */}
          <select value={stateFilter} onChange={handleState} className="w-full md:w-1/4 border border-gray-300 rounded-full px-3 py-2 text-sm md:text-base outline-none">
            <option value="">All States</option>
            {allStates.map((s, i) => <option key={i} value={s}>{s}</option>)}
          </select>

          {/* Price */}
          <div className="flex flex-col w-full md:w-1/4">
            <label className="text-gray-700 text-xs md:text-sm font-medium mb-1">Max Price: ₹{maxPrice}</label>
            <input type="range" min="5000" max="15000" step="500" value={maxPrice} onChange={handlePrice} className="accent-indigo-600 cursor-pointer" />
          </div>
        </div>

        <div className="text-right mt-4">
          <button onClick={resetFilters} className="text-xs md:text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-1.5 rounded-full transition">Reset Filters</button>
        </div>
      </div>

      {/* Listings */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((room, i) => {
         const isFav = (favorites || [] ).some(fav => fav.id === room.id )
        return(
          <div key={room.id} ref={(el) => (cardsRef.current[i] = el)} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
            <div className="relative">
              <img src={room.image} alt={room.name} className="w-full h-48 md:h-56 object-cover" />
              <button onClick={ ()=>toggleFavorite(room)} className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:scale-110 transition-transform">
                <FaHeart  className={isFav ? "text-red-500" : "text-grey-500 hover:text-red-500"} />
              </button>
            </div>
            <div className="p-4">
              <h3 className="text-base md:text-lg font-semibold text-gray-800">{room.name}</h3>
              <p className="text-sm text-gray-500">{room.city}, {room.state}</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-indigo-600 font-bold text-sm md:text-base">₹{room.price}/month</span>
                <button className="text-xs md:text-sm bg-indigo-600 text-white px-3 py-1.5 rounded-full hover:bg-indigo-700 transition-all">View</button>
              </div>
            </div>
          </div>
        )}
        )};
        {filtered.length === 0 && <div className="col-span-full text-center text-gray-500 text-sm md:text-base">No rooms found 😕</div>}
      </div>
    </div>
  );
};

export default ExploreRooms;
