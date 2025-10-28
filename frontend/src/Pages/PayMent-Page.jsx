import React, {  useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaCreditCard, FaWallet, FaGooglePay, FaCheckCircle } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const paymentRef = useRef(null);

  const property = location.state?.property;

  useGSAP(() => {
    gsap.from(".payment-section", {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power3.out",
      stagger: 0.2,
      scrollTrigger: { trigger: paymentRef.current, start: "top 80%" },
    });
  }, []);

  const handlePayment = () => {
    gsap.to(".payment-container", {
      opacity: 0,
      y: -50,
      duration: 0.8,
      onComplete: () => {
        navigate("/my-bookings", { state: { success: true } });
      },
    });
  };

  if (!property) {
    return (
      <div className="text-center text-gray-600 py-20">
        ⚠️ No booking details found. Please go back and select a property.
      </div>
    );
  }

  return (
    <div
      ref={paymentRef}
      className="min-h-screen mt-10 flex flex-col items-center justify-center bg-linear-to-b from-gray-50 to-gray-100 py-10 px-4 text-gray-800"
    >
      <div className="payment-container bg-white shadow-lg rounded-2xl w-full max-w-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-600 mb-2">
            Secure Payment
          </h1>
          <p className="text-gray-500 text-sm">
            Complete your booking for <span className="font-semibold">{property.name}</span>
          </p>
        </div>

        {/* Property Summary */}
        <div className="payment-section mb-6 border border-gray-200 rounded-xl p-4 bg-gray-50">
          <h2 className="text-lg font-semibold mb-2">Booking Summary</h2>
          <p className="text-gray-600">🏨 {property.name}</p>
          <p className="text-gray-600">📍 {property.location}</p>
          <p className="text-gray-600">💰 Price: ₹{property.price || "N/A"}</p>
        </div>

        {/* Payment Methods */}
        <div className="payment-section space-y-4">
          <h2 className="text-lg font-semibold mb-3">Select Payment Method</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 p-4 border border-gray-300 rounded-lg hover:border-indigo-500 transition">
              <FaCreditCard className="text-indigo-500" /> Credit / Debit Card
            </button>
            <button className="flex items-center justify-center gap-3 p-4 border border-gray-300 rounded-lg hover:border-indigo-500 transition">
              <FaWallet className="text-indigo-500" /> UPI / Wallet
            </button>
            <button className="flex items-center justify-center gap-3 p-4 border border-gray-300 rounded-lg hover:border-indigo-500 transition">
              <FaGooglePay className="text-indigo-500" /> Google Pay
            </button>
            <button className="flex items-center justify-center gap-3 p-4 border border-gray-300 rounded-lg hover:border-indigo-500 transition">
              💳 Net Banking
            </button>
          </div>
        </div>

        {/* Confirm Payment Button */}
        <div className="payment-section text-center mt-10">
          <button
            onClick={handlePayment}
            className="bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-full font-semibold text-white text-lg shadow-md transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 mx-auto"
          >
            <FaCheckCircle /> Confirm Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
