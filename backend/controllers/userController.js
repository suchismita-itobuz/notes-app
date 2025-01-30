import User_details from "../models/userSchema.js";
import session from "../models/sessionSchema.js";
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
    
    if (loginUserDetails) {
        if (bcrypt.compareSync(password, loginUserDetails.password) && loginUserDetails.verified === true) {
            const userID = loginUserDetails._id;

            //generation of access token AND refresh token
            const token = jwt.sign({userID}, process.env.MY_SECRET_KEY, { expiresIn: '1s' });
            const refresh_token = jwt.sign({userID}, process.env.MY_SECRET_KEY, { expiresIn: '10h' });

            loginUserDetails.access_token = token;
            loginUserDetails.refresh_token = refresh_token;

            await loginUserDetails.save()

            res.status(200).json({
                success: true,
                data: {"token":token,
                    "refresh_token":refresh_token},
                message: "You are logged in successfully",
            })

            //session creation
            await session.create({userId:`${userID}`});

            
        }
        else {
            res.status(404).json({
                success: false,
                // message: "Wrong password"
                message:"Authentication unsuccessful"
            })
        }
    }
}





