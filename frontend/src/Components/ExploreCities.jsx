import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cities = [
  { name: "Delhi", image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80" },
  { name: "Mumbai", image: "https://tse4.mm.bing.net/th/id/OIP.HVyj8zH7IagO19AGBPb9-QHaD_?rs=1&pid=ImgDetMain&o=7&rm=3" },
  { name: "Bangalore", image: "https://wallpapercave.com/wp/wp7537467.jpg" },
  { name: "Pune", image: "https://i.ytimg.com/vi/oHpVlQ4sEq0/maxresdefault.jpg" },
  { name: "Goa", image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80" },
  { name: "Jaipur", image: "https://www.tripsavvy.com/thmb/Afl1v6bgmGid9kPfseymDiAYWa0=/3595x2397/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-518387310-04a30994bfb1461bb8000f1864ca1fc5.jpg" },
];

const ExploreCities = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {
    gsap.from(cardsRef.current, {
      y: 60,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "top 20%",
        scrub: true,
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-white flex flex-col items-center px-4 sm:px-6"
    >
      <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold text-gray-800 mb-12 text-center">
        Explore by City 🌆
      </h2>

      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl w-full">
        {cities.map((city, i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
          >
            <img
              src={city.image}
              alt={city.name}
              className="w-full h-40 sm:h-48 md:h-64 object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-500"></div>
            <h3 className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 text-lg sm:text-2xl font-semibold text-white">
              {city.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExploreCities;
