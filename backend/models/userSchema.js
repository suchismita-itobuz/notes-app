import mongoose, { Schema } from 'mongoose';

const newSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select:false
    },
    token: {
        type: String,
    },
    verified: {
        type: Boolean,
        default: false
    },
    access_token: {
        type:String
    },
    refresh_token: {
        type:String
    }

})

export default mongoose.model("User_details", newSchema);


// const noteSchema = new mongoose.Schema({
//     title:{
//         type:String,
//         required:true,
//         unique:true
//     },
//     body:{
//         type:String
//     },
//     userId:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:User_details,
//         required:true
//     }
// })

// export const notes = mongoose.model("notes",noteSchema);

