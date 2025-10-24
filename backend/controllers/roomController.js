import Room from "../models/roomModel.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";


const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "pg_finder_rooms" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};


export const createRoom = async (req, res) => {
  try {
    const { title, rent, location, owner } = req.body;

    const uploadedImages = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await uploadToCloudinary(file.buffer);
        uploadedImages.push({ url: result.secure_url, public_id: result.public_id });
      }
    }

    const room = await Room.create({
      title,
      rent,
      location,
      owner,
      images: uploadedImages,
    });

    res.status(201).json({ message: "Room created successfully", room });
  } catch (error) {
    console.error("Create Room Error:", error);
    res.status(500).json({ message: "Server error while creating room" });
  }
};


export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ owner: req.user._id }).populate("owner", "name email");
    res.status(200).json(rooms);
  } catch (error) {
    console.error("Get Owner's Rooms Error:", error);
    res.status(500).json({ message: "Server error while fetching owner rooms" });
  }
};



export const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id).populate("owner", "name email");
    if (!room) return res.status(404).json({ message: "Room not found" });

    res.status(200).json(room);
  } catch (error) {
    console.error("Get Room By ID Error:", error);
    res.status(500).json({ message: "Server error while fetching room" });
  }
};


export const updateRoom = async (req, res) => {
  try {
    const { title, rent, location } = req.body;
    const room = await Room.findById(req.params.id);

    if (!room) return res.status(404).json({ message: "Room not found" });

    // Update basic info
    if (title) room.title = title;
    if (rent) room.rent = rent;
    if (location) room.location = location;

    // If new images uploaded → upload and append
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await uploadToCloudinary(file.buffer);
        room.images.push({ url: result.secure_url, public_id: result.public_id });
      }
    }

    await room.save();
    res.status(200).json({ message: "Room updated successfully", room });
  } catch (error) {
    console.error("Update Room Error:", error);
    res.status(500).json({ message: "Server error while updating room" });
  }
};


export const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });

    // Delete images from Cloudinary
    for (const img of room.images) {
      if (img.public_id) await cloudinary.uploader.destroy(img.public_id);
    }

    await room.deleteOne();
    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    console.error("Delete Room Error:", error);
    res.status(500).json({ message: "Server error while deleting room" });
  }
};
