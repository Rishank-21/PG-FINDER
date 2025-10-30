import React, { useEffect, useRef, useState } from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaHotel } from "react-icons/fa";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { hotels, pgs, rooms } from "../Temp Data/Data"

gsap.registerPlugin(ScrollTrigger);

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const cardsRef = useRef([]);

  useEffect(() => {
    // ⚙️ Suppose user booked few items (combine from hotels, pgs, rooms)
    const userBookings = [
      hotels[0],
      pgs[1],
      rooms[2],
      hotels[3],
    ];
    setBookings(userBookings);
  }, []);

  // 🎬 GSAP Animations
  useGSAP(() => {
    // Title animation
    gsap.from(".bookings-title", {
      y: -40,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    // Card animations on scroll
    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: "power2.out",
      });
    });
  }, [bookings]);

  return (
    <div className="min-h-screen mt-10 sm:mt-17  bg-white text-black px-4 sm:px-6 lg:px-12 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-900 bookings-title">
        My Bookings
      </h1>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">No bookings found 😕</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking, i) => (
            <div
              key={booking.id}
              ref={(el) => (cardsRef.current[i] = el)}
              className="bg-white  rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] transition-transform duration-300"
            >
              <img
                src={booking.image}
                alt={booking.name}
                className="w-full h-48 sm:h-56 object-cover"
              />
              <div className="p-5 space-y-2">
                <h2 className="text-lg text-gray-900 md:text-xl font-semibold">
                  {booking.name}
                </h2>
                <p className="flex items-center text-gray-500 text-sm md:text-base">
                  <FaMapMarkerAlt className="mr-2 text-red-400" />
                  {booking.city}, {booking.state}
                </p>
                <p className="flex items-center text-gray-500 text-sm md:text-base">
                  <FaHotel className="mr-2 text-green-400" />
                  {booking.category}
                </p>
                <p className="flex items-center text-gray-500 text-sm md:text-base">
                  <FaCalendarAlt className="mr-2 text-blue-400" />
                  {new Date().toDateString()}
                </p>
                <p className="text-gray-500 font-medium">
                  ₹{booking.price} / night
                </p>
                <button className="w-full mt-3 bg-blue-600 text-white hover:bg-blue-700 rounded-lg py-2 transition-all">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
