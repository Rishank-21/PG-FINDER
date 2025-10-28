import React, { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import { developedStates } from "../Temp Data/Places"; // your file

gsap.registerPlugin(ScrollTrigger);

const ExploreCities = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  // 🔹 Flatten all cities from developedStates into one array
  const allCities = developedStates.flatMap((st) =>
    st.cities.map((city) => ({
      ...city,
      state: st.state, // keep state info (for routing/filter if needed)
    }))
  );

  // 🔥 Responsive limit
  const [limit, setLimit] = useState(window.innerWidth < 768 ? 6 : 10);

  // Resize listener for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setLimit(window.innerWidth < 768 ? 6 : 10);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // GSAP animation
  useGSAP(() => {
    gsap.from(cardsRef.current, {
      y: 60,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "top 20%",
        scrub: true,
      },
    });
  }, []);

  // Cities to show
  const displayedCities = showAll ? allCities : allCities.slice(0, limit);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-white flex flex-col items-center px-4 sm:px-6"
    >
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-12 text-center">
        Explore by City 🌆
      </h2>

      {/* City Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 max-w-6xl w-full">
        {displayedCities.map((city, i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            onClick={() => navigate(`/city/${city.name}`)}
            className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer hover:shadow-2xl transition-all duration-300"
          >
            <img
              src={city.image}
              alt={city.name}
              className="w-full h-40 sm:h-48 md:h-56 object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-500"></div>
            <h3 className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 text-lg sm:text-2xl font-semibold text-white drop-shadow-lg">
              {city.name}
            </h3>
            <span className="absolute top-3 right-3 bg-white/80 text-indigo-700 text-xs font-semibold px-2 py-1 rounded-full">
              {city.state}
            </span>
          </div>
        ))}
      </div>

      {/* See All Button */}
      {!showAll && allCities.length > limit && (
        <button
          onClick={() => setShowAll(true)}
          className="mt-10 px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-md hover:bg-indigo-700 hover:scale-105 transition"
        >
          See All Cities
        </button>
      )}
    </section>
  );
};

export default ExploreCities;
