import nodemailer from "nodemailer"
import dotenv from "dotenv";

dotenv.config({path:".env"});

export const sendEmail = async (email,token) => {
try {
    console.log("verify",email);
    
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PWD
    }
});


const mailConfigurations = {
    from: `${process.env.SENDER_EMAIL}`,

    to: `${email}`,

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

catch(error){
    console.log(error)
}

}