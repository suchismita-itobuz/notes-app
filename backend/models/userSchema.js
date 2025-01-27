import mongoose, { Schema } from 'mongoose';

const newSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
    },
    verified: {
        type: Boolean,
        default: false
    }

})


export default mongoose.model("User_details", newSchema);


const noteSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    body:{
        type:String
    }
})

export const notes = mongoose.model("notes",noteSchema);

