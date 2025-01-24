import express from "express";
import route from "./routes/userRoute.js";
import dbConnect from "./config/dbConnection.js";
import dotenv from "dotenv";


const app = express()
dotenv.config({ path: ".env" })

app.use(express.json())
app.use("/user", route)

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