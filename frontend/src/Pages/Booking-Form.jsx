import React, { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { hotels, pgs, rooms } from "../Temp Data/Data";
import { developedStates } from "../Temp Data/Places"
gsap.registerPlugin(ScrollTrigger);

const BookingForm = () => {
  const formRef = useRef(null);
  const { id, category } = useParams();
  const navigate = useNavigate();

  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  let dataset = [];
  if (category === "hotel") dataset = hotels;
  else if (category === "pg") dataset = pgs;
  else if (category === "room") dataset = rooms;

  const property = dataset.find((item) => item.id === Number(id));

  useGSAP(() => {
    gsap.from(".form-section", {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power3.out",
      stagger: 0.2,
      scrollTrigger: { trigger: formRef.current, start: "top 85%" },
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/payment", { state: { property } });
  };

  if (!property) {
    return (
      <div className="text-center text-gray-600 py-20">Property not found</div>
    );
  }

  // 🧩 Find the selected state object to get its cities
  const stateObj = developedStates.find((s) => s.state === selectedState);

  return (
    <div className="min-h-screen my-20 p-4 md:p-8 bg-linear-to-b from-gray-50 to-gray-100 text-black">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800">
        Book Your Stay at{" "}
        <span className="text-indigo-600">{property.name}</span>
      </h1>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md space-y-8"
      >
        {/* Personal Details */}
        <div className="form-section">
          <h2 className="text-xl font-semibold text-indigo-600 mb-4">
            Personal Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              required
              className="p-3 rounded-lg border border-gray-300 text-gray-400 text-xl bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="p-3 rounded-lg border border-gray-300 text-gray-400 text-xl bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              required
              className="p-3 rounded-lg border border-gray-300 text-gray-400 text-xl bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none"
            />

            {/* State dropdown */}
            <select
              name="state"
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setSelectedCity(""); // reset city
              }}
              required
              className="p-3 text-xl rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="">Select State</option>
              {developedStates.map((state, i) => (
                <option key={i} value={state.state}>
                  {state.state}
                </option>
              ))}
            </select>

            {/* City dropdown (changes dynamically) */}
            <select
              name="city"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              required
              disabled={!selectedState}
              className="p-3 text-xl rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="">
                {selectedState ? "Select City" : "Select State First"}
              </option>
              {stateObj?.cities.map((city, index) => (
                <option key={index} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Booking Dates */}
        <div className="form-section">
          <h2 className="text-xl font-semibold text-indigo-600 mb-4">
            Booking Dates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 text-xl gap-5">
            <div>
              <label className="block mb-2 text-gray-400 text-xl">
                Check-in Date
              </label>
              <input
                type="date"
                name="checkin"
                required
                className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-400 text-xl">
                Check-out Date
              </label>
              <input
                type="date"
                name="checkout"
                required
                className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* ID Proof */}
        <div className="form-section">
          <h2 className="text-xl font-semibold text-indigo-600 mb-4">
            ID Proof
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <select
              name="idType"
              required
              className="p-3 rounded-lg border border-gray-300 text-xl bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none flex-1"
            >
              <option value="">Select ID Type</option>
              <option value="Aadhar">Aadhar Card</option>
              <option value="PAN">PAN Card</option>
              <option value="Passport">Passport</option>
              <option value="Driving License">Driving License</option>
            </select>

            <label className="w-full sm:w-auto flex-1 text-gray-600 text-sm bg-gray-50 border border-gray-300 rounded-lg cursor-pointer p-3 text-center hover:bg-gray-100 transition">
              Upload ID Proof
              <input
                type="file"
                name="idFile"
                required
                className="hidden"
                accept="image/*,.pdf"
              />
            </label>
          </div>
        </div>

        {/* Special Requests */}
        <div className="form-section">
          <h2 className="text-xl font-semibold text-indigo-600 mb-4">
            Special Requests (Optional)
          </h2>
          <textarea
            name="requests"
            placeholder="Any specific requirements (e.g., extra bed, non-smoking room)"
            rows="4"
            className="w-full text-gray-400 text-xl p-3 rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none"
          ></textarea>
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-full font-semibold text-white shadow-md transition-all duration-300 hover:scale-105"
          >
            Proceed to Payment
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
