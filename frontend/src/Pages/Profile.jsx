import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaRupeeSign, FaHome } from "react-icons/fa";

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
    profileImg: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  };

  // Dummy listed properties — replace with backend data
  const myListings = [
    {
      id: 1,
      name: "Ocean View PG",
      location: "Goa",
      price: "₹8,000/month",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    },
    {
      id: 2,
      name: "Elite Stay Apartment",
      location: "Mumbai",
      price: "₹12,000/month",
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
    },
  ];

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

      {/* Payment Section */}
      <div className="max-w-4xl mx-auto mt-10 bg-white rounded-2xl shadow-md p-6 fade-up text-center">
        <h2 className="text-xl font-semibold mb-3 flex items-center justify-center gap-2">
          <FaRupeeSign className="text-indigo-600" /> Payment
        </h2>
        <p className="text-gray-600 mb-4">
          Manage your payments or check your transaction history.
        </p>
        <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
          Go to Payments
        </button>
      </div>

      {/* My Listed Properties */}
      <div className="max-w-4xl mx-auto mt-10 bg-white rounded-2xl shadow-md p-6 fade-up">
        <h2 className="text-xl font-semibold mb-5 flex items-center gap-2">
          <FaHome className="text-indigo-600" /> My Listed Properties
        </h2>

        {myListings.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {myListings.map((place) => (
              <div
                key={place.id}
                className="border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition"
              >
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{place.name}</h3>
                  <p className="text-gray-600">{place.location}</p>
                  <p className="text-indigo-700 font-medium mt-1">{place.price}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">You haven’t listed any properties yet.</p>
        )}
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
    </div>
  );
};

export default Profile;
