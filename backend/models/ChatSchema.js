import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    message:{
        type:String
    },
    fname:{
        type:String
    }

},{timestamp:true})

export default mongoose.model("chatHistory", chatSchema);
