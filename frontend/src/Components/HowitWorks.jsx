import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CheckCircle, Search, Calendar } from "lucide-react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: <Search className="w-8 h-8 text-blue-600" />,
    title: "Search PG / Room",
    description: "Find verified PGs, hotels, or rental rooms in your city quickly.",
  },
  {
    icon: <Calendar className="w-8 h-8 text-blue-600" />,
    title: "Check Availability",
    description: "See real-time availability and check reviews before booking.",
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-blue-600" />,
    title: "Book Instantly",
    description: "Reserve your room or PG instantly with a few clicks.",
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-blue-600" />,
    title: "Stay Comfortably",
    description: "Enjoy a safe and comfortable stay with verified listings.",
  },
];

const HowItWorks = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {
    gsap.from(cardsRef.current, {
      opacity: 0,
      y: 60,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-14">
        How It Works 🔹
      </h2>

      <div className="grid md:grid-cols-4 gap-10 max-w-6xl mx-auto px-6">
        {steps.map((step, i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className="bg-gray-50 p-6 rounded-2xl flex flex-col items-center text-center shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div className="mb-4">{step.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {step.title}
            </h3>
            <p className="text-gray-600 text-sm">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
