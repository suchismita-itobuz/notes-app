import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User_details",
        required:true
    },
},{timestamps:true});

export default mongoose.model("session",sessionSchema);