import express from "express";
import {
  createOrder,
  verifyPayment,
  getUserBookings,
} from "../controllers/paymentController.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import { bookedRoomMail } from "../config/mail.js";

const router = express.Router();

router.post("/create-order", isAuth, createOrder);
router.post("/verify-payment", isAuth, verifyPayment);
router.post("/booking-mail", isAuth, bookedRoomMail);
router.get("/my-bookings", isAuth, getUserBookings);

export default router;
