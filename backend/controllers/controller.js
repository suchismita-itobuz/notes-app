import schema from "../models/schema.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
const userData = null;



export const createUser = async (req, res) => {
    try {
        const token = jwt.sign({
            data: 'Token Data'  
        }, 'ourSecretKey', { expiresIn: '10m' }  
        );     

        const { username, email, password } = req.body;
        const userData = await schema.create({ username, email, password, token});
        res.status(200).json({
            success: true,
            message: "User profile created",
            data: userData,
        })

        const transporter = nodemailer.createTransport({
            service:"gmail",
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
                   http://localhost:4000/verify/${token} 
                   Thanks`
        };
        
        transporter.sendMail(mailConfigurations, function(error, info){
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
   





