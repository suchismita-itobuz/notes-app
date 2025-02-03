import nodemailer from "nodemailer"
import dotenv from "dotenv";
import hbs from "nodemailer-express-handlebars"
import path from "path";

dotenv.config({ path: ".env" });



export const sendEmail = async (email, token, fname) => {
    try {
        console.log("verify", email);

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.SENDER_EMAIL,
                pass: process.env.SENDER_PWD
            }
        });

        const handlebarOptions = {
            viewEngine: {
                extname: ".handlebars",
                partialsDir: path.resolve("./views/emailTemplates"),
                defaultLayout: false,
            },
            //   viewPath: path.resolve("./views/emailTemplates"),
            viewPath: "/Users/macbookair/Desktop/Suchismita/javascript/notes-app/backend/views/emailTemplates",
            extName: ".handlebars",
        };


        transporter.use("compile", hbs(handlebarOptions));

        const verificationLink = `http://localhost:4000/notes/verify/${token}`


        transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Verify Your Email",
            template: "verificationEmail",
            context: {
                fname: fname,
                verificationLink,
            },
        })
    }
    catch (error) {
        console.log(error)
    }
}
