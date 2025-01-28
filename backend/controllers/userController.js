import User_details from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sendEmail } from "../emailVerify/verifyEmail.js";

// import dotenv from "dotenv/config";
// // dotenv.config({path:".env"});

let loginUserDetails = null;

export const createUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        const userData = await User_details.create({ email, password });
    
        //hashing password
       
        const hash = await bcrypt.hash(password,10)
 
        userData.password = hash;
        
        await userData.save();
      

        const userID = userData._id
        const token = jwt.sign({userID}, process.env.MY_SECRET_KEY, { expiresIn: '10m' });
        userData.token = token;
        await userData.save();
        
        
        res.status(200).json({
            success: true,
            message: "User profile created",
            data: userData._id,
        })
        
        //send email
        sendEmail(email,token)
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "User profile was not created",
        })
    }
}

//user login

export const loginUser = async (req, res) => {

    const { email, password } = req.body;

    //email verification
    try{
    loginUserDetails = await User_details.findOne({ email: `${email}` },{password:1,email:1,verified:1}).exec();
    console.log("details during login",loginUserDetails);
    if(loginUserDetails===null){
        throw Error;
    }
    }
    catch(Error){
        res.status(404).json({
            success:false,
            // message:"Email not found. Please register yourself first."
            message:"Authentication unsuccessful"
        })
    }
    // console.log("1    ", loginUserDetails.password)
    if (loginUserDetails) {
        if (bcrypt.compareSync(password, loginUserDetails.password) && loginUserDetails.verified === true) {
            res.status(200).json({
                success: true,
                message: "You are logged in successfully",
            })
            //generation of access token
            const userID = loginUserDetails._id;
            // console.log(userID)
            const access_token = jwt.sign({userID}, process.env.MY_SECRET_KEY, { expiresIn: '10000m' });
            loginUserDetails.access_token = access_token;
            await loginUserDetails.save()
            
        }
        else {
            // console.log("hi")
            res.status(404).json({
                success: false,
                // message: "Wrong password"
                message:"Authentication unsuccessful"
            })
        }
    }

}





