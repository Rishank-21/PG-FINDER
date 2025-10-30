import express from "express";
import upload from "../middlewares/multer.js";
import {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
} from "../controllers/roomController.js";
import { isAuth } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.use(isAuth);
//owner apne naye room ko add karne ke liye
router.post("/add-room", upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ]), createRoom);



  //owner ke saare rooms jo usne add kiye hain wo show karne ke liye
router.get("/owner/all", getAllRooms);

//jab user kisi room pe click kare to uska details show karne ke liye
router.get("/owner/:id", getRoomById);

//owner apne room ko update karne ke liye
router.put("/owner/:id", upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ]), updateRoom);

//owner apne room ko delete karne ke liye
router.delete("/owner/:id", deleteRoom);

export default router;
