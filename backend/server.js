import express from "express";
import mongoose from "mongoose";
import route from "../backend/routes/route.js"
import jwt from "jsonwebtoken";
import schema from "./models/schema.js";
import dbConnect from "./config.js";
import dotenv from "dotenv";

const app = express()
dotenv.config({path:".env"})

app.use(express.json())
app.use("/notes", route)

const port = process.env.PORT;

let updatedToken;


app.get("/", (req, res) => {
    res.send("hello")
})

app.listen(port, () => {
    try{
    console.log(`Server is running on ${port}`);
    }
    catch(error){
        res.send(error);
    }
}
)
//verify token
app.get('/verify/:token', async (req, res) => {
    const { token } = req.params;

    jwt.verify(token, 'ourSecretKey', async (err, decoded)=> {
        if (err) {
            console.log(err);
            res.send("Email verification failed, possibly the link is invalid or expired");
        }
        else {
            res.send("Email verified successfully");
            console.log("server", token);
            const userData = await schema.findOne({ token: `${token}` });
            userData.token = "";
            userData.verified = true;
            await userData.save();
        }
    });
});


dbConnect()