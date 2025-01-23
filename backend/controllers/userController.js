import User_details from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
const userData = null;
import bcrypt from "bcrypt";


export const createUser = async (req, res) => {
    try {
        const token = jwt.sign({
            data: 'Token Data'
        }, 'ourSecretKey', { expiresIn: '10m' }
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
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "suchis2002mita@gmail.com",
                pass: "sfdl digo jzxi xdhm"
            }
        });


        const mailConfigurations = {
            from: 'suchis2002mita@gmail.com',

            to: `${userData.email}`,

            subject: 'Email Verification',

            text: `Hi! There, You have recently visited 
                   our website and entered your email.
                   Please follow the given link to verify your email
                   http://localhost:4000/notes/verify/${token} 
                   Thanks`
        };

        transporter.sendMail(mailConfigurations, function (error, info) {
            if (error) throw Error(error);
            console.log('Email Sent Successfully');
            console.log(info);
        });

    }
    catch (error) {
        console.log(error);
        res.status(404).json({
            success: false,
            message: "User profile was not created",
        })
    }
}

//user login

export const loginUser = async (req, res) => {

    const { login_email, login_password } = req.body;
    console.log(login_email, login_password);


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





