import Razorpay from "razorpay";
import crypto from "crypto";
import Payment from "../models/paymentModel.js";
import Booking from "../models/bookingModel.js";
import Room from "../models/roomModel.js";
import dotenv from "dotenv";
dotenv.config();



const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


export const createOrder = async (req, res) => {
  try {
    const { amount, currency = "INR", roomId, ownerId } = req.body;
    if (!amount || !roomId || !ownerId)
      return res.status(400).json({ message: "Missing required fields" });

    const options = {
      amount: amount * 100, // amount in paise
      currency,
      receipt: `receipt_order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Order creation failed:", error);
    res.status(500).json({ message: "Failed to create order" });
  }
};


export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
      roomId,
      ownerId,
      amount,
    } = req.body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !userId ||
      !roomId ||
      !ownerId
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Generate signature to verify payment
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (razorpay_signature !== expectedSign) {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    const payment = await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

   
    const booking = await Booking.create({
      user: userId,
      room: roomId,
      owner: ownerId,
      paymentId: payment._id,
      amount,
      status: "Booked",
    });

    
    await Room.findByIdAndUpdate(roomId, { isBooked: true });

    res.status(200).json({
      success: true,
      message: "Payment verified and booking confirmed",
      booking,
    });
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({ message: "Payment verification failed" });
  }
};


export const getUserBookings = async (req, res) => {
  try {
    const userId = req.user._id; // assuming user is authenticated via middleware
    const bookings = await Booking.find({ user: userId })
      .populate("room")
      .populate("owner")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};
