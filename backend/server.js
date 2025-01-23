import express from "express";
import route from "./routes/userRoute.js";
import dbConnect from "./config/dbConnection.js";
import dotenv from "dotenv";


const app = express()
dotenv.config({ path: ".env" })

app.use(express.json())
app.use("/notes", route)

const port = process.env.PORT;

let updatedToken;


app.get("/", (req, res) => {
    res.send("hello")
})

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