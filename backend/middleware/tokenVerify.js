import jwt from "jsonwebtoken";
import User_details from "../models/userSchema.js";

import dotenv from "dotenv";
dotenv.config({ path: ".env" });


export const verifyEmail = async (req, res) => {
    const authHeader = req.headers.authorization;
    // console.log("authheader",authHeader)
    if (authHeader && authHeader.startsWith("Bearer")) {
        const token = authHeader.split(" ")[1]
        // console.log("token",token);
        jwt.verify(token, `${process.env.MY_SECRET_KEY}`, async (err) => {
            if (err) {
                console.log(err)
            }
            else {
                console.log("token is correct")
                const userData = await User_details.findOne({ token: `${token}` });
                userData.token = "";
                userData.verified = true;
                await userData.save();
            }
        });
    }
    else {
        res.status(404).json({
            success: false,
            message: "Token wasn't present in headers",
        })
    }
};



