import { sendEmail } from "../emailVerify/sendMail.js";
import User_details from "../models/userSchema.js"
import jwt from "jsonwebtoken";

export const tokenExp = async (req, res) => {
    try{
    const {email} = req.body
    // console.log(email)
    const is_existing_user = await User_details.findOne({email})
    if(is_existing_user){
        console.log("email",is_existing_user)
        const fname = is_existing_user.fname
        const userID = is_existing_user._id
        // console.log("vfdevfe",fname)
        // console.log("vfdevfe",userID)
        const token = jwt.sign({ userID }, process.env.MY_SECRET_KEY, { expiresIn: '10m' });
        sendEmail(email, token, fname)
        res.status(200).json({
            message:"true"
        })
    }
    else{
        console.log("email doesn't exist in db")
    }
}
catch(error){
    console.log(error)
    res.status(404).json({
        message:"false"
    })
}
}