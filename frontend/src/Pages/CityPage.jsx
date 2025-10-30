import React, { useState, useMemo, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { hotels, pgs, rooms } from "../Temp Data/Data";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CityPage = () => {
  const { cityName } = useParams();
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const containerRef = useRef(null);

  // combine all datasets
  const allProperties = useMemo(() => {
    const merged = [
      ...hotels.map((h) => ({ ...h, category: "Hotel" })),
      ...pgs.map((p) => ({ ...p, category: "PG" })),
      ...rooms.map((r) => ({ ...r, category: "Room" })),
    ];
    return merged.filter(
      (item) => item.city.toLowerCase() === cityName.toLowerCase()
    );
  }, [cityName]);

  const filtered = useMemo(() => {
    return allProperties.filter(
      (item) =>
        (filter === "All" || item.category === filter) &&
        item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [filter, search, allProperties]);

  useGSAP(() => {
    gsap.from(".fade-up", {
      opacity: 0,
      y: 40,
      stagger: 0.2,
      duration: 0.8,
      scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gray-50 py-16 px-5 md:px-16"
    >
      <h1 className="text-3xl md:text-4xl font-bold text-indigo-700 text-center mb-10">
        Explore Stays in {cityName}
      </h1>

      {/* 🔍 Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
        <input
          type="text"
          placeholder="Search stays..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <div className="flex gap-3">
          {["All", "Hotel", "PG", "Room"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                filter === cat
                  ? "bg-indigo-600 text-white"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 🏠 Properties Grid */}
      {filtered.length === 0 ? (
        <p className="text-center text-gray-500 mt-20 text-lg">
          No properties found in {cityName}.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 fade-up">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-5">
                <h3 className="font-bold text-lg text-gray-800">
                  {item.name}
                </h3>
                <p className="text-gray-500 text-sm">{item.category}</p>
                <p className="text-gray-700 mt-2 line-clamp-2">
                  {item.description}
                </p>
                <p className="text-indigo-600 font-semibold mt-3">
                  ₹{item.price}{" "}
                  <span className="text-gray-500 text-sm">
                    {item.category === "Hotel" ? "/night" : "/month"}
                  </span>
                </p>
                <Link
                  to={`/property/${item.category.toLowerCase()}/${item.id}`}
                  className="mt-4 inline-block px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CityPage;
