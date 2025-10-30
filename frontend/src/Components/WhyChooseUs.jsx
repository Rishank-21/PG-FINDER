import React, { useRef } from "react";
// import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle, Shield, Headphones, Home } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: <Shield className="text-blue-500 w-10 h-10" />,
    title: "Verified Properties",
    desc: "Every hotel, PG & room is verified to ensure safety and authenticity.",
  },
  {
    icon: <Home className="text-blue-500 w-10 h-10" />,
    title: "Affordable & Clean Stays",
    desc: "Find budget-friendly options without compromising on comfort.",
  },
  {
    icon: <Headphones className="text-blue-500 w-10 h-10" />,
    title: "24×7 Customer Support",
    desc: "We’re available round-the-clock to help you with your bookings.",
  },
  {
    icon: <CheckCircle className="text-blue-500 w-10 h-10" />,
    title: "Easy Booking Process",
    desc: "Book your preferred stay in just a few clicks — fast and secure.",
  },
];

const WhyChooseUs = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  // useGSAP(() => {
  //   const ctx = gsap.context(() => {
  //     gsap.from(".title", {
  //       opacity: 0,
  //       y: 50,
  //       duration: 1,
  //       scrollTrigger: {
  //         trigger: sectionRef.current,
  //         start: "top 80%",
  //       },
  //     });

  //     gsap.from(cardsRef.current, {
  //       opacity: 0,
  //       y: 60,
  //       duration: 1,
  //       stagger: 0.2,
  //       ease: "power3.out",
  //       scrollTrigger: {
  //         trigger: sectionRef.current,
  //         start: "top 75%",
  //       },
  //     });
  //   }, sectionRef);

  //   return () => ctx.revert();
  // }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-white flex flex-col items-center text-center"
    >
      <h2 className="title text-4xl font-bold mb-12 text-gray-800 px-4 sm:px-6">
        Why Choose <span className="text-blue-600">StayEase</span>?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl px-4 sm:px-6">
        {features.map((item, i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className="p-6 bg-gray-50 rounded-xl shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-2"
          >
            <div className="flex justify-center mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
