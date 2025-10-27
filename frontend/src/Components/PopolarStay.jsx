import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { hotels, pgs, rooms } from "../Temp Data/Data";

gsap.registerPlugin(ScrollTrigger);

// 🔹 Reusable Card Component
const StayCard = ({ stay, category }) => (
  <div className="rounded-xl shadow-lg overflow-hidden bg-white transform hover:scale-105 hover:shadow-2xl transition-all duration-300">
    <div className="relative">
      <img
        src={stay.image}
        alt={stay.name}
        className="h-56 sm:h-64 md:h-72 w-full object-cover object-center"
      />
      <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
        {category}
      </div>
    </div>

    <div className="p-4 sm:p-5">
      <h3 className="text-lg md:text-xl font-semibold text-gray-800">
        {stay.name}
      </h3>
      <p className="text-gray-500 text-sm sm:text-base">
        {stay.city}, {stay.state}
      </p>
      <div className="flex justify-between items-center mt-3">
        <span className="text-blue-600 font-bold text-sm sm:text-base">
          ₹{stay.price} {category === "Hotel" ? "/night" : "/month"}
        </span>

        {/* 🔗 Link to Property Details */}
        <Link
          to={`/property/${
            category === "Hotel"
              ? "hotel"
              : category === "PG for Students"
              ? "pg"
              : "room"
          }/${stay.id}`}
          className="bg-blue-500 text-white px-3 sm:px-4 py-2 rounded-md text-sm sm:text-base hover:bg-blue-600 transition"
        >
          View
        </Link>
      </div>
    </div>
  </div>
);

// 🔹 Category Section Component
const CategorySection = ({ title, data, category, exploreLink }) => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current.querySelector(".section-title"), {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });

      cardsRef.current.forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 80,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 bg-gray-50 flex flex-col items-center overflow-hidden px-4 sm:px-6"
    >
      <h2 className="section-title text-3xl sm:text-4xl font-bold mb-10 text-gray-800 text-center">
        {title}
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
        {data.slice(0, 6).map((stay, i) => (
          <div key={i} ref={(el) => (cardsRef.current[i] = el)}>
            <StayCard stay={stay} category={category} />
          </div>
        ))}
      </div>

      {/* 🔹 Explore All Button */}
      <div className="mt-10">
        <Link
          to={exploreLink}
          className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-md hover:bg-indigo-700 transition-transform hover:scale-105"
        >
          Explore All {category === "Hotel" ? "Hotels" : category === "PG for Students" ? "PGs" : "Rooms"}
        </Link>
      </div>
    </section>
  );
};

// 🔹 Main Component
const PopularStays = () => {
  return (
    <div className="w-full flex flex-col items-center bg-gray-100">
      <CategorySection
        title="Top Hotels"
        data={hotels}
        category="Hotel"
        exploreLink="/explore/hotels"
      />
      <CategorySection
        title="Popular PGs for Students"
        data={pgs}
        category="PG for Students"
        exploreLink="/explore/pgs"
      />
      <CategorySection
        title="Rooms on Rent"
        data={rooms}
        category="Room on Rent"
        exploreLink="/explore/rooms"
      />
    </div>
  );
};

export default PopularStays;
