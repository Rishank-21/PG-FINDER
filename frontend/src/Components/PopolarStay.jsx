import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const stays = [
  // 🏨 Hotels
  {
    name: "Ocean View Resort",
    category: "Hotel",
    location: "Goa, India",
    price: "₹3200/night",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Royal Heritage Hotel",
    category: "Hotel",
    location: "Jaipur, India",
    price: "₹3500/night",
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "City Luxe Hotel",
    category: "Hotel",
    location: "Bangalore, India",
    price: "₹4100/night",
    rating: "4.7",
    image: "https://www.siliconindia.com/travelcity/images/special_images/Tl16p9i5Ho0X84g.jpeg",
  },

  // 🏠 PG for Students
  {
    name: "Student Hub PG",
    category: "PG for Students",
    location: "Delhi, India",
    price: "₹7000/month",
    rating: "4.7",
    image: "https://img.staticmb.com/mbphoto/pg/grd2/cropped_images/2024/Aug/31/Photo_h400_w540/GR2-461367-2239367_400_540.jpg",
  },
  {
    name: "Girls Paradise PG",
    category: "PG for Students",
    location: "Pune, India",
    price: "₹6500/month",
    rating: "4.9",
    image: "https://img.staticmb.com/mbphoto/pg/grd2/cropped_images/2024/Mar/11/Photo_h400_w540/GR2-428753-2068521_400_540.jpg",
  },
  {
    name: "Elite Boys PG",
    category: "PG for Students",
    location: "Chennai, India",
    price: "₹6000/month",
    rating: "4.6",
    image: "https://img.staticmb.com/mbphoto/pg/grd2/cropped_images/2024/Jul/03/Photo_h400_w540/GR2-450739-2179613_400_540.jpeg",
  },

  // 🏡 Room on Rent
  {
    name: "Cozy 1BHK Flat",
    category: "Room on Rent",
    location: "Mumbai, India",
    price: "₹15,000/month",
    rating: "4.6",
    image: "https://www.ilivesg.com/sites/default/files/room/img/a/room-for-rent-avqe7v9rxl03536.jpeg",
  },
  {
    name: "Furnished Room",
    category: "Room on Rent",
    location: "Bangalore, India",
    price: "₹12,000/month",
    rating: "4.8",
    image: "https://photos.spareroom.com/images/flatshare/listings/large/20/72/207232729.jpg",
  },
  {
    name: "Modern Studio Flat",
    category: "Room on Rent",
    location: "Hyderabad, India",
    price: "₹10,500/month",
    rating: "4.7",
    image: "https://lh5.googleusercontent.com/PE2iGt9ktSX76s-s6xm2v4DOd6L9pfH0G32LKGsgt1K1GL-d0Gu0N6RNOqIhUIe1HZpiKWvSAGUIt_H73UqBToCmMhddyhuIBrBSYuVEhXJBF6xEEUjGGy5kwURuihaWvsfBaj6w",
  },
];

// 🔹 Reusable Card Component
const StayCard = ({ stay, refObj }) => (
  <div
    ref={refObj}
    className="rounded-xl shadow-lg overflow-hidden bg-white transform hover:scale-105 hover:shadow-2xl transition-all duration-300"
  >
    <div className="relative">
      <img
        src={stay.image}
        alt={stay.name}
        className="h-56 sm:h-64 md:h-72 w-full object-cover object-center"
      />
      <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
        {stay.category}
      </div>
      <div className="absolute top-3 right-3 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold shadow-md">
        ⭐ {stay.rating}
      </div>
    </div>

    <div className="p-4 sm:p-5">
      <h3 className="text-lg md:text-xl font-semibold text-gray-800">
        {stay.name}
      </h3>
      <p className="text-gray-500 text-sm sm:text-base">{stay.location}</p>
      <div className="flex justify-between items-center mt-3">
        <span className="text-blue-600 font-bold text-sm sm:text-base">
          {stay.price}
        </span>
        <button className="bg-blue-500 text-white px-3 sm:px-4 py-2 rounded-md text-sm sm:text-base hover:bg-blue-600 transition">
          View
        </button>
      </div>
    </div>
  </div>
);

const CategorySection = ({ title, data, exploreLink }) => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current.querySelector(".section-title"), {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          scrub: true,
        },
      });

      cardsRef.current.forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 80,
          duration: 0.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            end: "top 60%",
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 bg-gray-50 flex flex-col items-center overflow-hidden px-4 sm:px-6"
    >
      <h2 className="section-title text-3xl sm:text-4xl font-bold mb-10 text-gray-800 text-center">
        {title}
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
        {data.map((stay, i) => (
          <StayCard key={i} stay={stay} refObj={(el) => (cardsRef.current[i] = el)} />
        ))}
      </div>

      <Link
        to={exploreLink}
        className="m-16 text-center bg-blue-600 text-white px-6 py-3 text-lg rounded-lg hover:bg-blue-700 shadow-lg transition"
      >
        Explore More
      </Link>
    </section>
  );
};

const PopularStays = () => {
  const hotels = stays.filter((s) => s.category === "Hotel");
  const pgs = stays.filter((s) => s.category === "PG for Students");
  const rooms = stays.filter((s) => s.category === "Room on Rent");

  return (
    <div className="w-full flex flex-col items-center bg-gray-100">
      <CategorySection title="Top Hotels" data={hotels} exploreLink="/explore-hotels" />
      <CategorySection title="Popular PGs for Students" data={pgs} exploreLink="/explore-pg" />
      <CategorySection title="Rooms on Rent" data={rooms} exploreLink="/explore-room" />
    </div>
  );
};

export default PopularStays;
