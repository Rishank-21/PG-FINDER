import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auth",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  rent: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  city : {
    type: String,
    required : true
  },
  state : {
    type : String,
    required : true
  },
  category: {
    type: String,
    enum: ["Hotel", "PG", "Room"],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: [
    {
      url: { type: String, required: true },
      public_id: { type: String }, // optional if using Cloudinary
    },
  ],
  mainImage: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Room", roomSchema);
