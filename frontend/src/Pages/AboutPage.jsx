import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const container = useRef(null);

  useGSAP(() => {
    const sections = gsap.utils.toArray(".fade-up");
    sections.forEach((sec) => {
      gsap.fromTo(
        sec,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sec,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (
    <div ref={container} className="sm:my-18 my-12 min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <section className="text-center py-16 bg-linear-to-r from-blue-600 to-indigo-600 text-white fade-up">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">About GetUrStay</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Your one-stop platform to find the perfect stay — Hotels, PGs, and Rooms for Rent across India.
        </p>
      </section>

      {/* Mission Section */}
      <section className="py-14 px-6 md:px-20 fade-up">
        <h2 className="text-3xl font-semibold text-center mb-6">Our Mission</h2>
        <p className="text-center max-w-3xl mx-auto text-gray-600 text-lg">
          At <span className="font-semibold text-blue-600">GetUrStay</span>, we aim to simplify the process of finding
          accommodation. Whether you're a student looking for a PG, a traveler booking a hotel, or someone searching for
          a room on rent — we’ve got you covered.
        </p>
      </section>

      {/* Why Choose Us */}
      <section className="py-14 px-6 md:px-20 bg-white fade-up">
        <h2 className="text-3xl font-semibold text-center mb-10">Why Choose Us</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Verified Listings",
              desc: "Every property listed on GetUrStay is verified to ensure your safety and comfort.",
            },
            {
              title: "Affordable Prices",
              desc: "We offer transparent pricing with no hidden costs — get the best deals instantly.",
            },
            {
              title: "Easy Booking",
              desc: "Book your stay in just a few clicks — fast, secure, and hassle-free.",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="p-6 bg-gray-100 rounded-2xl shadow hover:shadow-lg transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-3 text-blue-700">{card.title}</h3>
              <p className="text-gray-600">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Vision / Closing Section */}
      <section className="py-16 bg-gray-100 text-center fade-up">
        <h2 className="text-3xl font-semibold mb-4">Our Vision</h2>
        <p className="max-w-3xl mx-auto text-lg text-gray-600">
          To become India’s most trusted platform for finding comfortable and budget-friendly stays — built with
          technology, transparency, and trust.
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
