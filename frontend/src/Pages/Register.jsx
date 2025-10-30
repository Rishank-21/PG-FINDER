import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { IoPersonSharp, IoMailSharp, IoLockClosedSharp } from "react-icons/io5";

const RegisterPage = () => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const inputsRef = useRef([]);
  const btnRef = useRef(null);
  const footerRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Container fade-in
      gsap.from(containerRef.current, { opacity: 0, duration: 1 });

      // Logo animation
      gsap.from(logoRef.current, {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)",
      });

      // Inputs animation
      inputsRef.current.forEach((el, i) => {
        gsap.from(el, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.2,
          ease: "power3.out",
        });
      });

      // // Button animation
      // gsap.from(btnRef.current, {
      //   scale: 0.8,
      //   opacity: 0,
      //   duration: 0.8,
      //   delay: 0.7,
      //   ease: "back.out(1.7)",
      // });

      // Footer animation
      gsap.from(footerRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className=" flex items-center justify-center px-4 bg-linear-to-b from-purple-50 to-purple-100"
    >
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl px-8 pt-5 mb-8 mt-30 flex flex-col gap-6">
        {/* Logo & Heading */}
        <div ref={logoRef} className="flex flex-col items-center mb-6">
          <img
            src="/Images/GetUrStay.png"
            alt="Logo"
            className="w-24 h-24 rounded-full mb-4 shadow-md"
          />
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Create Account
          </h2>
          <p className="text-gray-500 mt-2 text-center">
            Sign up to start your journey with us
          </p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-5">
          {/* Name */}
          <div ref={(el) => (inputsRef.current[0] = el)} className="relative">
            <IoPersonSharp className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 w-6 h-6" />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full text-[18px] text-gray-400 border-black pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Email */}
          <div ref={(el) => (inputsRef.current[1] = el)} className="relative">
            <IoMailSharp className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 w-6 h-6" />
            <input
              type="email"
              placeholder="Email"
              className="w-full text-[18px] text-gray-400 border-black pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Password */}
          <div ref={(el) => (inputsRef.current[2] = el)} className="relative">
            <IoLockClosedSharp className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 w-6 h-6" />
            <input
              type="password"
              placeholder="Password"
              className="w-full text-[18px] text-gray-400 border-black pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Confirm Password */}
          <div ref={(el) => (inputsRef.current[3] = el)} className="relative">
            <IoLockClosedSharp className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 w-6 h-6" />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full text-[18px] text-gray-400 border-black pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            ref={btnRef}
            className="w-full py-3 mt-2 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-all shadow-lg transform hover:scale-105"
          >
            Sign Up
          </button>
        </div>

        {/* Footer / Sign In */}
        <p ref={footerRef} className="text-center text-gray-500 mt-4 mb-5 text-sm">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-purple-600 font-medium hover:underline"
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
