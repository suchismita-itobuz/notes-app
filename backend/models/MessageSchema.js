import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  sentBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User_details", 
    required: true,
  },
  roomID: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now, 
  },
});

export default mongoose.model("Message", MessageSchema);
