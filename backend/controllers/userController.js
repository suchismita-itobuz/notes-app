import User_details from "../models/userSchema.js";
import session from "../models/sessionSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sendEmail } from "../emailVerify/sendMail.js";

let loginUserDetails = null;


export const createUser = async (req, res) => {
    try {

        const { email, password, fname } = req.body;

        try {
            const is_existing_user = await User_details.findOne({ email })
            if (is_existing_user) { throw new Error("user already exists") }
        }
        catch (error) {
            console.log("error", error);
            return res.status(400).json({
                success: false,
                message: "user already exists"
            })
        }

        const userData = await User_details.create({ email, password, fname });

        //hashing password

        const hash = await bcrypt.hash(password, 10)

        userData.password = hash;

        await userData.save();


        const userID = userData._id
        const token = jwt.sign({ userID }, process.env.MY_SECRET_KEY, { expiresIn: '10m' });
        await userData.save();
       


        res.status(200).json({
            success: true,
            message: "User profile created",
            data: { verification_token: token },
        })

        //send email
        sendEmail(email, token, fname)
    }
    catch (error) {
        console.log(error);

        res.status(401).json({
            success: false,
            message: "User profile was not created",
        })
    }
}

//user login

export const loginUser = async (req, res) => {

    const { email, password } = req.body;

    //email verification
    try {
        loginUserDetails = await User_details.findOne({ email: `${email}` }, { password: 1, email: 1, verified: 1 }).exec();

        if (loginUserDetails === null) {
            throw Error;
        }
    }
    catch (Error) {
        res.status(404).json({
            success: false,
            // message:"Email not found. Please register yourself first."
            message: "Authentication unsuccessful"
        })
    }

    if (loginUserDetails) {
       
        try {
            if (bcrypt.compareSync(password, loginUserDetails.password)){

            }
                
            else {
                throw new Error("pwd wrong")
            }
        }
        catch (error) {
            return res.status(401).json({
                message: "Authentication unsuccessful"
            })
        }

        try {
            if (loginUserDetails.verified === true)
            {
                const userID = loginUserDetails._id;

                        //generation of access token AND refresh token
                        const token = jwt.sign({ userID }, process.env.MY_SECRET_KEY, { expiresIn: '10m' });
                        const refresh_token = jwt.sign({ userID }, process.env.MY_SECRET_KEY, { expiresIn: '30d' });
        
                        await loginUserDetails.save()
        
                        const is_session_active = await session.findOne({ userID: `${userID}` })
        
                        try {
                            if (is_session_active) {
                                throw Error;
                            }
                            else {
                                await session.create({ userID: `${userID}` });
                                res.status(200).json({
                                    success: true,
                                    data: {
                                        "token": token,
                                        "refresh_token": refresh_token
                                    },
                                    message: "You are logged in successfully",
                                })
        
                            }
        
                        }
                        catch (error) {
                            res.status(404).json({
                                success: false,
                                message: "You are already logged in"
                            })
                        }
        
            }
            else {
                throw new Error("unverified")
            }
        }
        catch (error) {
            return res.status(401).json({
                message: "unverified"
            })
        }
    }
}
   
//user logout 

export const logout = async (req, res) => {
    try {
        const userID = req.id
        try {
            const flag = await session.findOne({ userID: `${userID}` })
            if (flag === null) {
                throw Error
            }
            else {
                await session.deleteOne({ userID })
                res.status(200).json({
                    success: true,
                    message: "You are logged out."
                })

            }

        }
        catch (error) {
            console.log(error)
            res.status(403).json({
                success: false,
                message: "You are already logged out."
            })
        }

    }
    catch (error) {
        // console.log(error.message)
        if (error && error.message === "jwt expired") {
            res.status(403).json({
                success: false,
                message: "Token is expired"
            })
        }
        else (error && error.message === "invalid signature")
        res.status(401).json({
            success: false,
            message: "Token is invalid"
        })

    }
}






