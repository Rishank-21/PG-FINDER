import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const categories = {
  Hotels: [
    "https://cdn.audleytravel.com/2071/1480/79/453802-superior-deluxe-manila-hotel-manila.jpg",
    "https://tse3.mm.bing.net/th/id/OIP.vIj86j0YcOmPfu39vjnl0gHaEK?cb=12ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
    "https://agbrief.com/wp-content/uploads/2023/10/PH-hotel-Philippines.jpg",
    "https://business.inquirer.net/files/2020/02/sot1.jpg",
    "https://pix10.agoda.net/hotelImages/294085/-1/fe633a5135f010f307a6bbb11007cf8f.jpg?ce=0&s=450x450",
  ],
  "PG For Students": [
    "https://tse3.mm.bing.net/th/id/OIP.w1znmUvfu1zoKUftkiQ0ewHaE8?cb=12ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
    "https://img.staticmb.com/mbphoto/pg/grd2/cropped_images/2024/Aug/31/Photo_h400_w540/GR2-461367-2239367_400_540.jpg",
    "https://housing-images.n7net.in/01c16c28/9ab124ee69e03ff046622313a48ffd49/v0/large/3_rk_-for-rent-punjabi_bagh-New+Delhi-living_room.jpg",
    "https://img.staticmb.com/mbphoto/pg/grd2/cropped_images/2024/Mar/11/Photo_h400_w540/GR2-428753-2068521_400_540.jpg",
    "https://img.staticmb.com/mbphoto/pg/grd2/cropped_images/2022/Dec/29/Photo_h400_w540/GR2-339163-1599915_400_540.jpg",
  ],
  "Room Rent": [
    "https://www.ilivesg.com/sites/default/files/room/img/a/room-for-rent-avqe7v9rxl03536.jpeg",
    "https://photos.spareroom.com/images/flatshare/listings/large/20/46/204638461.jpg",
    "https://photos.spareroom.com/images/flatshare/listings/large/20/72/207232729.jpg",
    "https://tse1.mm.bing.net/th/id/OIP.yybcqRgNMqR4nuYP-xa3AQAAAA?cb=12ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
    "https://d1bvpoagx8hqbg.cloudfront.net/originals/rooms-rent-shared-flat-fully-renovated-1st-floor-athens-4deabc1ae8ba9507f4e3599200398982.jpg",
  ],
};

const FeaturedSection = () => {
  const containerRef = useRef(null);
  const [indices, setIndices] = useState({ Hotels: 0, "PG For Students": 0, "Room Rent": 0 });

  useGSAP(() => {
    gsap.to({}, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 30%",
        end: "bottom 70%",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const totalImages = 5;
          setIndices({
            Hotels: Math.min(Math.floor(progress * totalImages), totalImages - 1),
            "PG For Students": Math.min(Math.floor(progress * totalImages), totalImages - 1),
            "Room Rent": Math.min(Math.floor(progress * totalImages), totalImages - 1),
          });
        },
      },
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative py-20 flex flex-col items-center bg-gray-100 px-4 sm:px-6"
    >
      <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold mb-10 text-center">Find Your Stay</h2>

      <div className="flex flex-col sm:flex-row sm:flex-wrap md:flex-nowrap gap-6 md:gap-8 justify-center w-full">
        {Object.keys(categories).map((category, idx) => (
          <div
            key={idx}
            className="w-full sm:w-[45%] md:w-[300px] h-64 sm:h-72 md:h-96 rounded-xl shadow-lg bg-cover bg-center relative transition-all duration-500"
            style={{ backgroundImage: `url(${categories[category][indices[category]]})` }}
          >
            <div className="absolute w-full h-full bg-black/25 flex items-center justify-center rounded-xl">
              <h3 className="text-white text-xl sm:text-2xl md:text-2xl font-semibold text-center px-2">
                {category}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedSection;
