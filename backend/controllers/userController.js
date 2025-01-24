import User_details from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
// const userData = null;
import bcrypt from "bcrypt";
import { sendEmail } from "../emailVerify/verifyEmail.js";

import dotenv from "dotenv";

dotenv.config({path:".env"});


export const createUser = async (req, res) => {
    try {
        const token = jwt.sign({
            data: 'Token Data'
        }, process.env.MY_SECRET_KEY, { expiresIn: '10m' }
        );

        const { email, password } = req.body;

        const userData = await User_details.create({ email, password, token });

        //hashing password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(userData.password, salt);
        userData.password = hash;
        await userData.save();

        res.status(200).json({
            success: true,
            message: "User profile created",
            data: userData,
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

    const { login_email, login_password } = req.body;

    //email verification

    const loginUserDetails = await User_details.findOne({ email: `${login_email}` });
    if (loginUserDetails) {
        if (bcrypt.compareSync(login_password, loginUserDetails.password) && loginUserDetails.verified === true) {
            res.status(200).json({
                success: true,
                message: "You are logged in successfully",
            })
        }
        else {
            res.status(404).json({
                success: false,
                message: "Email not found. Please register yourself first."
            })
        }
    }

}





