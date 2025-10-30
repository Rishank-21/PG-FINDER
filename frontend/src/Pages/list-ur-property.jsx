import React, { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { developedStates } from "../Temp Data/Places";
gsap.registerPlugin(ScrollTrigger);

const ListYourPlace = () => {
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    city: "",
    state: "",
    category: "",
    price: "",
    description: "",
    address: "",
    mainImage: null,
    sampleImages: [],
  });

  const [priceLabel, setPriceLabel] = useState("Price");

  // GSAP Animation
  useGSAP(() => {
    gsap.from(".form-section", {
      opacity: 0,
      y: 40,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: { trigger: formRef.current, start: "top 80%" },
    });
  }, []);

  // handle category selection
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, category: value });

    if (value === "Hotel") setPriceLabel("Price (₹ / Night / Person)");
    else setPriceLabel("Price (₹ / Month)");
  };

  // handle image uploads
  const handleMainImage = (e) => {
    setFormData({ ...formData, mainImage: e.target.files[0] });
  };

  const handleSampleImages = (e) => {
    const files = Array.from(e.target.files).slice(0, 4); // max 4
    setFormData({ ...formData, sampleImages: files });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // prepare formData to send to backend
    const dataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "sampleImages") {
        value.forEach((file) => dataToSend.append("sampleImages", file));
      } else {
        dataToSend.append(key, value);
      }
    });

    console.log("Listing Data:", Object.fromEntries(dataToSend));
    alert("✅ Property Listed Successfully!");
  };

  return (
    <div className="min-h-screen md:mt-10 bg-linear-to-b from-gray-50 to-gray-100 py-16 px-4 md:px-10 text-gray-800">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-indigo-700 mb-12">
        🏠 List Your Place
      </h1>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-8"
      >
        {/* Basic Info */}
        <div className="form-section">
          <h2 className="text-xl font-semibold text-indigo-600 mb-4">
            Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2  gap-5">
            <input
              type="text"
              placeholder="Property Name"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="p-3 border border-gray-300 rounded-lg bg-gray-50 text-xl text-gray-500 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <select
              required
              value={formData.category}
              onChange={handleCategoryChange}
              className="p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-indigo-500 text-xl text-gray-500 outline-none"
            >
              <option value="">Select Category</option>
              <option value="Hotel">Hotel</option>
              <option value="PG">PG</option>
              <option value="Room">Room</option>
            </select>
          </div>
        </div>

       {/* Location */}
<div className="form-section">
  <h2 className="text-xl font-semibold text-indigo-600 mb-4">
    Location Details
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xl text-gray-500">
    {/* Select State */}
   <select
  value={formData.state}
  onChange={(e) => setFormData({ ...formData, state: e.target.value, city: "" })}
>
  <option value="">Select State</option>
  {developedStates.map((st, idx) => (
    <option key={idx} value={st.state}>
      {st.state}
    </option>
  ))}
</select>

<select
  value={formData.city}
  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
  disabled={!formData.state}
>
  <option value="">Select City</option>
  {developedStates
    .find((s) => s.state === formData.state)
    ?.cities.map((c, idx) => (
      <option key={idx} value={c.name}>
        {c.name}
      </option>
    ))}
</select>
  </div>

  <textarea
    placeholder="Full Address"
    required
    rows="3"
    value={formData.address}
    onChange={(e) =>
      setFormData({ ...formData, address: e.target.value })
    }
    className="mt-4 w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 text-xl text-gray-500 focus:ring-indigo-500 outline-none"
  ></textarea>
</div>


        {/* Price */}
        {formData.category && (
          <div className="form-section">
            <h2 className="text-xl font-semibold text-indigo-600 mb-4">
              Pricing
            </h2>
            <input
              type="number"
              placeholder={priceLabel}
              required
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="p-3 w-full border border-gray-300  rounded-lg bg-gray-50 focus:ring-2 text-xl text-gray-500 focus:ring-indigo-500 outline-none"
  
            />
          </div>
        )}

        {/* Description */}
        <div className="form-section">
          <h2 className="text-xl font-semibold text-indigo-600 mb-4">
            Description
          </h2>
          <textarea
            placeholder="Write about your property (facilities, nearby area, etc.)"
            rows="4"
            required
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full p-3 border border-gray-300 text-xl text-gray-500 rounded-lg bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none"
          ></textarea>
        </div>

        {/* Images */}
        <div className="form-section">
          <h2 className="text-xl font-semibold text-indigo-600 mb-4">
            Upload Images
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <label className="flex-1 p-3 border border-gray-300 rounded-lg bg-gray-50 cursor-pointer text-xl text-gray-500 hover:bg-gray-100 text-center">
              Main Image
              <input
                type="file"
                accept="image/*"
                required
                onChange={handleMainImage}
                className="hidden"
              />
            </label>

            <label className="flex-1 p-3 border border-gray-300 rounded-lg bg-gray-50 cursor-pointer text-xl text-gray-500 hover:bg-gray-100 text-center">
              Upload 3–4 Sample Images
              <input
                type="file"
                accept="image/*"
                multiple
                required
                onChange={handleSampleImages}
                className="hidden"
              />
            </label>
          </div>

          {/* preview sample images */}
          {formData.sampleImages.length > 0 && (
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {formData.sampleImages.map((img, idx) => (
                <img
                  key={idx}
                  src={URL.createObjectURL(img)}
                  alt="sample"
                  className="w-full h-32 object-cover rounded-lg shadow"
                />
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105"
          >
            Submit Property
          </button>
        </div>
      </form>
    </div>
  );
};

export default ListYourPlace;
