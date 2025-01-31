import express from "express";
import userRoute from "./routes/userRoute.js";
import noteRoute from "./routes/noteRoute.js";
import dbConnect from "./config/dbConnection.js";
import dotenv from "dotenv";


const app = express()


app.use(express.json())
app.use("/user", userRoute)
app.use("/notes",noteRoute)
app.use('/uploads', express.static('uploads'));

const port = process.env.PORT;

app.listen(port, () => {
    try {
        console.log(`Server is running on ${port}`);
    }
    catch (error) {
        res.send(error);
    }
}
)


dbConnect()