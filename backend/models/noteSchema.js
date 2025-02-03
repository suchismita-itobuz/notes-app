import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User_details",
        // required:true
    },
    filePath: {
        type: String,
        default: ""
    }

}, { timestamps: true })

// export const notes = mongoose.model("notes",noteSchema);
export default mongoose.model("notes", noteSchema);