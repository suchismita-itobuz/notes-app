import jwt from "jsonwebtoken";
import User_details from "../models/userSchema.js";

import dotenv from "dotenv";
dotenv.config({path:".env"});


export const verifyEmail = async (req, res) => {
    const { token } = req.params;

    jwt.verify(token, `${process.env.MY_SECRET_KEY}`, async (err, decoded)=> {
        if (err) {
            console.log(err);
            res.send("Email verification failed, possibly the link is invalid or expired");
        }
        else {
            res.send("Email verified successfully");
            console.log("server", token);
            const userData = await User_details.findOne({ token: `${token}` });
            userData.token = "";
            userData.verified = true;
            await userData.save();
        }
    });
};

//verify with email and token both