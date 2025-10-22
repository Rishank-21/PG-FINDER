import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();
export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    } catch (error) {
        console.error("MongoDB connection failed:", error);
    }
}