import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Auth",
        required : true
    },

    room : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Room",
        required : true
    },

    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Auth",
        required : true
    },

    paymentId : {
        type : String,
        required : true
    },
    amount : {
        type : Number,
        required : true
    },
    status : {
        type : String,
        enum : ['Booked', 'Cancelled', 'Completed'],
        default : 'Booked'
    }   
}, { timestamps : true });


const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;