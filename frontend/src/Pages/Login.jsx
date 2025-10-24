import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { IoPersonSharp, IoLockClosedSharp } from "react-icons/io5";

const LoginPage = () => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const inputsRef = useRef([]);
  const btnRef = useRef(null);
  const footerRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Container fade-in
      gsap.from(containerRef.current, {
        opacity: 0,
        duration: 1,
      });

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
      className="min-h-screen flex items-center justify-center pt-20  px-4 bg-linear-to-b from-blue-50 to-blue-100"
    >
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl  p-8 flex flex-col gap-6">
        {/* Logo & Heading */}
        <div ref={logoRef} className="flex flex-col items-center mb-6">
          <img
            src="/Images/GetUrStay.png"
            alt="Logo"
            className="w-24 h-24 rounded-full mb-4 shadow-md"
          />
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Welcome Back!
          </h2>
          <p className="text-gray-500 mt-2 text-center">
            Sign in to continue to your account
          </p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-5">
          <div ref={(el) => (inputsRef.current[0] = el)} className="relative">
            <IoPersonSharp className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 w-6 h-6" />
            <input
              type="text"
              placeholder="Username or Email"
              className="w-full text-[18px] text-gray-400 border-black pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div ref={(el) => (inputsRef.current[1] = el)} className="relative">
            <IoLockClosedSharp className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 w-6 h-6" />
            <input
              type="password"
              placeholder="Password"
              className="w-full text-[18px] text-gray-400 pl-12 border-black pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div ref={(el) => (inputsRef.current[2] = el)} className="flex justify-between items-center text-sm text-gray-500">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 accent-blue-500" />
              Remember me
            </label>
            <a href="/forgot-password" className="hover:text-blue-600">
              Forgot Password?
            </a>
          </div>

          <button
            ref={btnRef}
            className="w-full py-3 mt-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg transform hover:scale-105"
          >
            Login
          </button>
        </div>

        {/* Footer / Sign Up */}
        <p ref={footerRef} className="text-center text-gray-500 mt-4 text-sm">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-blue-600 font-medium hover:underline"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
