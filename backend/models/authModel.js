import mongoose from "mongoose";
const authSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
        unique: true,
    },
    password : {
        type: String,
        select : false,
    },
    role : {
        type: String,
        enum: ['user', 'owner'],
        default: 'user',
    }
},{timestamps: true});

const Auth = mongoose.model('Auth', authSchema);
export default Auth;