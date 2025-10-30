import React, { useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { hotels, pgs, rooms } from "../Temp Data/Data";
import { reviews } from "../Temp Data/reviews";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

gsap.registerPlugin(ScrollTrigger);

const PropertyDetails = () => {
  const { id, category } = useParams();
  const containerRef = useRef(null);

  let dataset = [];
  if (category === "hotel") dataset = hotels;
  else if (category === "pg") dataset = pgs;
  else if (category === "room") dataset = rooms;

  const property = dataset.find((item) => item.id === Number(id));


  useGSAP(() => {
    gsap.from(".fade-up", {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power3.out",
      stagger: 0.25,
      scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
    });

    gsap.from(".main-img", {
      scale: 0.95,
      opacity: 0,
      duration: 1.2,
      ease: "power2.out",
    });
  }, []);

  if (!property) {
    return (
      <div className="text-center py-20 text-gray-600">
        Property not found
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-linear-to-b from-gray-50 my-20 to-gray-100 py-10 px-4 md:px-12 lg:px-20"
    >
      
      <div className="main-img relative rounded-3xl overflow-hidden shadow-2xl mb-10">
        <img
          src={property.image}
          alt={property.name}
          className="w-full h-64 md:h-96 object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/10 to-transparent"></div>
        <h1 className="absolute bottom-6 left-6 text-white text-3xl md:text-4xl font-bold drop-shadow-lg">
          {property.name}
        </h1>
      </div>

      {/* ✅ Swiper Slider */}
      <div className="fade-up mb-14">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1.2}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          className="rounded-2xl"
        >
          {property.sampleImages.map((img, i) => (
            <SwiperSlide key={i}>
              <div className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                <img
                  src={img}
                  alt={`sample-${i}`}
                  className="w-full h-52 md:h-64 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ✅ Property Info Section */}
      <div className="fade-up bg-white shadow-xl rounded-2xl p-6 md:p-10 mb-12">
        <h2 className="text-3xl font-bold text-indigo-700">{property.name}</h2>
        <p className="text-gray-500 mt-1 capitalize">{property.category}</p>

        <p className="text-gray-700 mt-4 leading-relaxed">
          {property.description}
        </p>

        <div className="mt-6 flex items-center gap-2 text-gray-700">
          <FaMapMarkerAlt className="text-indigo-600" />
          <span>{property.address}</span>
        </div>

        <div className="mt-5 flex items-center justify-between flex-wrap">
          <p className="text-2xl font-semibold text-indigo-700">
            ₹{property.price}
            <span className="text-gray-500 text-base font-normal">
              {" "}
              / night
            </span>
          </p>

          <Link to={`/book/${category}/${property.id}`} className="mt-4 md:mt-0 px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-md hover:bg-indigo-700 transition-transform hover:scale-105">
            Book Now
          </Link>
        </div>
      </div>

      {/* ✅ Reviews Section */}
      <div className="fade-up bg-white shadow-lg rounded-2xl p-6 md:p-10">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800">Reviews</h3>

        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet. Be the first!</p>
        ) : (
          <div className="space-y-5">
            {reviews.map((r, i) => (
              <div
                key={i}
                className="bg-gray-50 hover:bg-gray-100 transition p-5 rounded-xl shadow-sm flex flex-col md:flex-row md:items-center justify-between"
              >
                <div>
                  <p className="font-semibold text-gray-800">{r.name}</p>
                  <p className="text-gray-600 text-sm md:text-base mt-1">
                    {r.comment}
                  </p>
                </div>
                <div className="flex items-center gap-1 mt-3 md:mt-0">
                  {[...Array(r.rating)].map((_, idx) => (
                    <FaStar key={idx} className="text-yellow-400 text-lg" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyDetails;
