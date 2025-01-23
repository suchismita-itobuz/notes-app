import jwt from "jsonwebtoken";
import User_details from "../models/userSchema.js";


export const verifyEmail = async (req, res) => {
    const { token } = req.params;

    jwt.verify(token, 'ourSecretKey', async (err, decoded)=> {
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