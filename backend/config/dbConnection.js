import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.URL;

async function dbConnect() {
    await mongoose.connect(url)
        .then(() => {
            console.log("Mongodb connected");
        }).
        catch((Error) => {
            console.log(Error);
        })
}


export default dbConnect;
