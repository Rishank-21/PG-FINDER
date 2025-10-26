import React, { useRef } from "react";
import { useStore } from "../Context/StoreContext"; // Correct import
import { FaHeart } from "react-icons/fa";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FavoritesPage = () => {
  const { favorites, toggleFavorite } = useStore(); // Use the correct hook
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {
    gsap.from(cardsRef.current, {
      y: 30,
      duration: 0.8,
      stagger: 0.1,
      scrollTrigger: { 
        trigger: containerRef.current,
       start: "top 85%" 
      },
    });
  }, []);

  return (
    <div ref={containerRef} className="my-20 p-4 md:p-8 min-h-screen bg-gray-50">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">My Favorites</h2>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-500">You have no favorites yet 😕</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {favorites.map((hotel, i) => (
            <div
              key={hotel.id}
              ref={(el) => (cardsRef.current[i] = el)}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
            >
              <div className="relative">
                <img src={hotel.image} alt={hotel.name} className="w-full h-48 md:h-56 object-cover" />
                <button
                  onClick={() => toggleFavorite(hotel)}
                  className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:scale-110 transition-transform"
                >
                  <FaHeart className="text-red-500" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-base md:text-lg font-semibold text-gray-800">{hotel.name}</h3>
                <p className="text-sm text-gray-500">{hotel.city}, {hotel.state}</p>
                <span className="text-indigo-600 font-bold text-sm md:text-base">₹{hotel.price}/night</span>
              </div>
              <div> 
                 <button className="text-xs md:text-sm bg-indigo-600 text-white px-3 py-1.5 rounded-full hover:bg-indigo-700 transition-all float-end mb-2 mr-2 ">
                  View
                </button>
                 </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
