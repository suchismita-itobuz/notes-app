import mongoose from 'mongoose';

const newSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select:false
    },
    verified: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model("User_details", newSchema);


