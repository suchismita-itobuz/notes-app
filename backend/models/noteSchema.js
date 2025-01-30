import mongoose, { Schema } from 'mongoose';


const noteSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User_details",
        // required:true
    }
})

// export const notes = mongoose.model("notes",noteSchema);
export default mongoose.model("notes", noteSchema);