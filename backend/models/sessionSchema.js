import mongoose, {Schema} from 'mongoose';

const sessionSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User_details",
        required:true
    },
},{timestamps:true});

export default mongoose.model("session",sessionSchema);