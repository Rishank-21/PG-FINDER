import { ExpressValidator, validationResult } from "express-validator";
import Room from "../models/roomModel.js";
import Booking from "../models/bookingModel.js";

export const findAllPgs = async ( req , res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors : errors.array()})
    }
    try {
        const pgs = await Room.find({ category: "PG" });
        if (!pgs) {
            return res.status(404).json({ message: "No PGs found" });
        }
        return res.status(200).json({ pgs });
    } catch (error) {
        return res.status(500).json({ message : "Internal server error" })
    }
}

export const findAllHotels = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors : errors.array()})
    }
    try {
        const hotels = await Room.find({ category: "Hotel" });
        if (!hotels) {
            return res.status(404).json({ message: "No hotels found" });
        }
        return res.status(200).json({ hotels });
    } catch (error) {
        return res.status(500).json({ message : "Internal server error" })
    }
}


export const findAllRooms = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors : errors.array()})
    }
    try {
        const rooms = await Room.find({ category: "Room" });
        if (!rooms) {
            return res.status(404).json({ message: "No rooms found" });
        }
        return res.status(200).json({ rooms });
    } catch (error) {
        return res.status(500).json({ message : "Internal server error" })
    }
}



export const findPgsByCity = async ( req , res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors : errors.array()})
    }
    try {
        const { city } = req.params;
        const pgs = await Room.find({ category: "PG", city });
        if (!pgs) {
            return res.status(404).json({ message: "No PGs found in this city" });
        }
        return res.status(200).json({ pgs });
    } catch (error) {
        return res.status(500).json({ message : "Internal server error" })
    }
}

export const findHotelsByCity = async ( req , res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors : errors.array()})
    }
    try {
        const { city } = req.params;
        const hotels = await Room.find({ category: "Hotel", city });
        if (!hotels) {
            return res.status(404).json({ message: "No hotels found in this city" });
        }
        return res.status(200).json({ hotels });
    } catch (error) {
        return res.status(500).json({ message : "Internal server error" })
    }
}

export const findRoomsByCity = async ( req , res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors : errors.array()})
    }
    try {
        const { city } = req.params;
        const rooms = await Room.find({ category: "Room", city });
        if (!rooms) {
            return res.status(404).json({ message: "No rooms found in this city" });
        }
        return res.status(200).json({ rooms });
    } catch (error) {
        return res.status(500).json({ message : "Internal server error" })
    }
}

export const findPgByLocation = async ( req , res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors : errors.array()})
    }
    try {
        const { location } = req.params;
        const pgs = await Room.find({ category: "PG", location });
        if (!pgs) {
            return res.status(404).json({ message: "No PGs found in this location" });
        }
        return res.status(200).json({ pgs });
    } catch (error) {
        return res.status(500).json({ message : "Internal server error" })
    }
}

export const findHotelByLocation = async ( req , res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors : errors.array()})
    }
    try {
        const { location } = req.params;
        const hotels = await Room.find({ category: "Hotel", location });
        if (!hotels) {
            return res.status(404).json({ message: "No hotels found in this location" });
        }
        return res.status(200).json({ hotels });
    } catch (error) {
        return res.status(500).json({ message : "Internal server error" })
    }
}

export const findRoomByLocation = async ( req , res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors : errors.array()})
    }
    try {
        const { location } = req.params;
        const rooms = await Room.find({ category: "Room", location });
        if (!rooms) {
            return res.status(404).json({ message: "No rooms found in this location" });
        }
        return res.status(200).json({ rooms });
    } catch (error) {
        return res.status(500).json({ message : "Internal server error" })
    }
}

export const findInCity = async (req ,res) => {
    const errorss = validationResult(req)
    if(!errorss.isEmpty()){
        return res.status(400).json({ errors : errorss.array()})
    }
    try {
        const { city } = req.params;
        const result = await Room.find({ city : city });
        if (!result) {
            return res.status(404).json({ message: "No accommodations found in this city" });
        }
    } catch (error) {
        return res.status(500).json({ message : "Internal server error" })
    }
}

export const findInState = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors : errors.array()})
    }
    try {
        const { state } = req.params;
        const result = await Room.find({ state : state });
        if (!result) {
            return res.status(404).json({ message: "No accommodations found in this state" });
        }
        return res.status(200).json({ result });
    } catch (error) {
        return res.status(500).json({ message : "Internal server error" })
    }
}


export const userBookings = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors : errors.array()})
    }
    try {
        const userId = req.user.id;
        const bookings = await Booking.find({ user: userId }).populate('room');
        if (!bookings) {
            return res.status(404).json({ message: "No bookings found" });
        }
        return res.status(200).json({ bookings });
    } catch (error) {
        return res.status(500).json({ message : "Internal server error" })
    }
}