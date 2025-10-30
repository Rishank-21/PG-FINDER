import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Riya Sharma",
    text: "Finding a safe PG near my college was super easy here. The interface is smooth and clear!",
    image:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&q=80",
    rating: 5,
  },
  {
    name: "Amit Patel",
    text: "Booked a short stay for my family in Mumbai — smooth process, verified rooms and great support.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
    rating: 4,
  },
  {
    name: "Sneha Verma",
    text: "Loved how I could compare PGs, rooms, and hotels in one place. Totally recommend it!",
    image:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=400&q=80",
    rating: 5,
  },
];

const Testimonials = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {
    gsap.from(cardsRef.current, {
      opacity: 0,
      y: 60,
      stagger: 0.3,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 90%",
        end:"top 20%",
        scrub:true,
        
      },
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <h2 className="text-4xl font-bold text-center mb-14 text-gray-800">
        What Our Users Say 💬
      </h2>

      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
        {testimonials.map((t, i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={t.image}
              alt={t.name}
              className="w-20 h-20 rounded-full mb-4 object-cover"
            />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {t.name}
            </h3>
            <p className="text-gray-600 mb-4 text-sm">{t.text}</p>

            <div className="flex gap-1">
              {Array.from({ length: t.rating }).map((_, idx) => (
                <Star key={idx} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-20 text-center">
        <h3 className="text-3xl font-bold text-gray-800 mb-6">
          Ready to Book Your Perfect Stay? 🏡
        </h3>
        <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition duration-300">
          Start Booking Now
        </button>
      </div>
    </section>
  );
};

export default Testimonials;
