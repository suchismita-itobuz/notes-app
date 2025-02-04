import dotenv from "dotenv";
import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
dotenv.config({ path: ".env" });


import userSchema from "../models/userSchema.js";
import noteSchema from "../models/noteSchema.js";
import bcrypt from "bcrypt";

const url = process.env.URL
console.log(url)


async function dbConnect() {
    await mongoose.connect(url)
        .then(() => {
            console.log("Mongodb connected");
        }).
        catch((Error) => {
            console.log(Error);
        })
}
dbConnect()

const generateUsers = async (num) => {
    const newUsers = [];
    for (let i = 1; i <= num; i++) {
        let password = "password";
        const hash = await bcrypt.hash(password, 10)
        password = hash
        const email = faker.internet.email();
        const fname = faker.internet.username();
        const verified = true;
        newUsers.push({ password, email, verified, fname });
    }
    return newUsers;
};


const generateNotes = (num) => {
    const newNotes = [];
    for (let i = 1; i <= num; i++) {
        const title = faker.internet.password();
        const content = faker.internet.email();
        const userID = "67a0c3600de5516b3cc2efa6"
        newNotes.push({ title, content, userID });
    }
    return newNotes;
};

const newNotes = generateNotes(10);

const seedUser = async () => {
    const newUsers = await generateUsers(10);
    await userSchema.deleteMany({});
    await userSchema.insertMany(newUsers);
};

const seedNotes = async () => {
    await noteSchema.deleteMany({});
    await noteSchema.insertMany(newNotes);
};

seedUser().then(() => {
    console.log("Successfully Created Users");
    mongoose.disconnect()
});

seedNotes().then(() => {
    console.log("Successfully Created Notes");
    mongoose.disconnect()
});
