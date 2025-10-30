import Room from "../models/roomModel.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";
import { validationResult } from "express-validator";

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
    const { name, price, adress, city, state, category, description } = req.body;
    const owner = req.user._id;

    
    let mainImageUrl = null;
    if (req.files && req.files.mainImage && req.files.mainImage[0]) {
      const result = await uploadToCloudinary(req.files.mainImage[0].buffer);
      mainImageUrl = result.secure_url;
    }

    
    const uploadedImages = [];
    if (req.files && req.files.images) {
      for (const file of req.files.images) {
        const result = await uploadToCloudinary(file.buffer);
        uploadedImages.push({ url: result.secure_url, public_id: result.public_id });
      }
    }

    const room = await Room.create({
      name,
      price,
      adress,
      owner,
      city,
      state,
      category,
      description,
      mainImage: mainImageUrl,
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
    if (!rooms) {
      return res.status(404).json({ message: "No rooms found for this owner" });
    }
    res.status(200).json(rooms);
  } catch (error) {
    console.error("Get Owner's Rooms Error:", error);
    res.status(500).json({ message: "Server error while fetching owner rooms" });
  }
};



export const getRoomById = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const room = await Room.findById(req.params.id).populate("owner", "name email mobile");
    if (!room) return res.status(404).json({ message: "Room not found" });

    res.status(200).json(room);
  } catch (error) {
    console.error("Get Room By ID Error:", error);
    res.status(500).json({ message: "Server error while fetching room" });
  }
};


export const updateRoom = async (req, res) => {
  try {
    const { name, price, adress, city, state, category, description } = req.body;
    const room = await Room.findById(req.params.id);

    if (!room) return res.status(404).json({ message: "Room not found" });

   
    if (name) room.name = name;
    if (price) room.price = price;
    if (adress) room.adress = adress;
    if (city) room.city = city;
    if (state) room.state = state;
    if (category) room.category = category;
    if (description) room.description = description;

    
    if (req.files?.mainImage?.[0]) {
      
      const oldMain = room.mainImage;
      const oldMainPublicId = room.images.find((img) => img.url === oldMain)?.public_id;
      if (oldMainPublicId) {
        await cloudinary.uploader.destroy(oldMainPublicId);
      }

      const result = await uploadToCloudinary(req.files.mainImage[0].buffer);
      room.mainImage = result.secure_url;

      
      if (oldMainPublicId) {
        const index = room.images.findIndex((img) => img.public_id === oldMainPublicId);
        if (index !== -1) {
          room.images[index] = { url: result.secure_url, public_id: result.public_id };
        } else {
          room.images.unshift({ url: result.secure_url, public_id: result.public_id });
        }
      }
    }

    
    if (req.files?.images?.length) {
      
      for (const img of room.images) {
        if (img.public_id && img.url !== room.mainImage) {
          await cloudinary.uploader.destroy(img.public_id);
        }
      }

     
      const uploadedImages = [];
      for (const file of req.files.images) {
        const result = await uploadToCloudinary(file.buffer);
        uploadedImages.push({ url: result.secure_url, public_id: result.public_id });
      }

      room.images = [
        { url: room.mainImage, public_id: room.images.find((img) => img.url === room.mainImage)?.public_id },
        ...uploadedImages,
      ];
    }

    await room.save();

    res.status(200).json({
      message: "Room updated successfully",
      room,
    });
  } catch (error) {
    console.error("Update Room Error:", error);
    res.status(500).json({ message: "Server error while updating room" });
  }
};


export const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });


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