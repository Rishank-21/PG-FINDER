import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaHome, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const Profile = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from(".fade-up", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.15,
      scrollTrigger: { trigger: containerRef.current, start: "top 85%" },
    });
  }, []);

  // Dummy data — replace with user data from context or API
  const user = {
    name: "Rupesh Raz",
    email: "user@gmail.com",
    phone: "+91 9876543210",
    address: "123 MG Road, Pune, Maharashtra, 411001",
    profileImg:
      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen my-10 bg-gray-50 py-16 px-4 md:px-10 text-gray-800"
    >
      {/* Header */}
      <h1 className="text-3xl font-bold text-center mb-10 text-indigo-700">
        My Profile
      </h1>

      {/* Profile Info */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-6 md:p-8 fade-up">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={user.profileImg}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-indigo-500 object-cover"
          />
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold">{user.name}</h2>
            <p className="flex items-center justify-center md:justify-start gap-2 text-gray-600">
              <FaEnvelope /> {user.email}
            </p>
            <p className="flex items-center justify-center md:justify-start gap-2 text-gray-600">
              <FaPhone /> {user.phone}
            </p>
          </div>
        </div>

        {/* Address */}
        <div className="mt-6 border-t pt-4">
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <FaMapMarkerAlt className="text-indigo-600" /> Address
          </h3>
          <p className="text-gray-700">{user.address || "Address not added yet"}</p>
          <button className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
            Edit Address
          </button>
        </div>
      </div>

      {/* My Bookings Section */}
      <div className="max-w-4xl mx-auto mt-10 bg-white rounded-2xl shadow-md p-6 fade-up">
        <h2 className="text-xl font-semibold mb-3">My Bookings</h2>
        <p className="text-gray-600">You have no current bookings.</p>
      </div>

      {/* Transactions Section */}
      <div className="max-w-4xl mx-auto mt-10 bg-white rounded-2xl shadow-md p-6 fade-up">
        <h2 className="text-xl font-semibold mb-3">Transactions</h2>
        <p className="text-gray-600">No transactions found.</p>
      </div>

      {/* Help Section */}
      <div className="max-w-4xl mx-auto mt-10 bg-white rounded-2xl shadow-md p-6 fade-up">
        <h2 className="text-xl font-semibold mb-3">Need Help?</h2>
        <p className="text-gray-600 mb-4">
          If you have any issues, reach out to our support team.
        </p>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
          Contact Support
        </button>
      </div>

      {/* List Property Section */}
      <div className="max-w-4xl mx-auto mt-10 bg-indigo-50 border border-indigo-200 rounded-2xl p-6 text-center fade-up">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700">
          List Your Property
        </h2>
        <p className="text-gray-700 mb-4">
          Have a home, PG, or hotel to rent? List it on{" "}
          <span className="font-bold">GetUrStay</span> and reach thousands of
          users.
        </p>
        <Link to={'/profile/list-your-place'} className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition">
          List Property
        </Link>
      </div>
    </div>
  );
};

export default Profile;
