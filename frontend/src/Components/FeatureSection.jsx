// import React, { useRef } from "react";
// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger, useGSAP);

// const featuredData = [
//   { title: "Hotels", img: "https://cdn.audleytravel.com/2071/1480/79/453802-superior-deluxe-manila-hotel-manila.jpg", link: "/hotels" },
//   { title: "PG for Students", img: "https://tse3.mm.bing.net/th/id/OIP.w1znmUvfu1zoKUftkiQ0ewHaE8?cb=12ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", link: "/pg" },
//   { title: "Rooms on Rent", img: "https://www.ilivesg.com/sites/default/files/room/img/a/room-for-rent-avqe7v9rxl03536.jpeg", link: "/rent-rooms" },
// ];

// const FeaturedSection = () => {
//   const container = useRef(null);

//   useGSAP(() => {
//     gsap.from(container.current.children, {
//       opacity: 0,
//       y: 50,
//       stagger: 0.3,
//       duration: 0.8,
//       ease: "power3.out",
//       scrollTrigger: {
//         trigger: container.current,
    
//         start: "top 80%", 
//         end: "bottom 30%",
//         scrub:true,
//         toggleActions: "play none none none",
//       },
//     });
//   }, { scope: container });

//   return (
//     <section className="py-20 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-6 text-center mb-12">
//         <h2 className="text-4xl font-bold text-gray-800">Find Your Stay</h2>
//         <p className="text-gray-600 mt-3">
//           Hotels, PGs for boys & girls, or rooms on rent — we have it all.
//         </p>
//       </div>

//       <div
//         ref={container}
//         className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
//       >
//         {featuredData.map((item, idx) => (
//           <a
//             key={idx}
//             href={item.link}
//             className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white"
//           >
//             <img
//               src={item.img}
//               alt={item.title}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4">
//               <h3 className="text-2xl font-semibold text-gray-800">{item.title}</h3>
//             </div>
//           </a>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default FeaturedSection;


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
  PG: [
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
  const [indices, setIndices] = useState({ Hotels: 0, PG: 0, "Room Rent": 0 });

  useGSAP(() => {
    gsap.to({}, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 30%",
        end: "bottom 70%",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;

          // Calculate separate index for each category
          const totalImages = 5; // 5 images per category
          setIndices({
            Hotels: Math.min(Math.floor(progress * totalImages), totalImages - 1),
            PG: Math.min(Math.floor(progress * totalImages), totalImages - 1),
            "Room Rent": Math.min(Math.floor(progress * totalImages), totalImages - 1),
          });
        },
      },
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative py-20 flex flex-col items-center bg-gray-100"
    >
      <h2 className="text-4xl font-bold mb-10">Find Your Stay</h2>

      <div className="flex flex-col md:flex-row gap-8">
        {Object.keys(categories).map((category, idx) => (
          <div
            key={idx}
            className="w-[300px] h-96 rounded-xl shadow-lg bg-cover bg-center relative transition-all duration-500"
            style={{ backgroundImage: `url(${categories[category][indices[category]]})` }}
          >
            <div className="absolute w-full h-full bg-black/25 flex items-center justify-center rounded-xl">
              <h3 className="text-white text-2xl font-semibold">{category}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedSection;
