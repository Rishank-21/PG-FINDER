import express from "express";
import upload from "../middlewares/multer.js";
import {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
} from "../controllers/roomController.js";

const router = express.Router();


router.post("/add-room", upload.array("images", 5), createRoom);


router.get("/owner/all", getAllRooms);


router.get("/owner/:id", getRoomById);


router.put("/owner/:id", upload.array("images", 5), updateRoom);


router.delete("/owner/:id", deleteRoom);

export default router;
