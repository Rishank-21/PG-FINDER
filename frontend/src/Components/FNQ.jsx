import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ChevronDown } from "lucide-react";

gsap.registerPlugin(gsap.ScrollTrigger);

const faqs = [
  {
    question: "How do I book a PG or Hotel?",
    answer:
      "Simply browse our listings, check availability, and click 'Book Now'. You can reserve instantly without any hassle.",
  },
  {
    question: "Are all PGs verified?",
    answer:
      "Yes! We verify every listing to ensure safety, cleanliness, and accurate information.",
  },
  {
    question: "Can I cancel my booking?",
    answer:
      "Most listings allow free cancellation before a specific date. Check each listing’s policy before booking.",
  },
  {
    question: "Is payment secure?",
    answer:
      "Absolutely. All payments are encrypted and processed securely through trusted gateways.",
  },
];

const FAQ = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const [openIndex, setOpenIndex] = useState(null);

  useGSAP(() => {
    gsap.from(cardsRef.current, {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
    });
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center mb-14">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Frequently Asked Questions ❓
        </h2>
        <p className="text-gray-600">
          Find answers to common questions about our platform and services.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6 flex flex-col gap-4">
        {faqs.map((faq, i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className="border border-gray-200 rounded-xl p-5 cursor-pointer hover:shadow-md transition-shadow duration-300"
            onClick={() => toggleFAQ(i)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-gray-800 font-semibold">{faq.question}</h3>
              <ChevronDown
                className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${
                  openIndex === i ? "rotate-180" : ""
                }`}
              />
            </div>
            {openIndex === i && (
              <p className="text-gray-600 mt-3 text-sm">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
