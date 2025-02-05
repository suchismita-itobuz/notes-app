import dotenv from "dotenv";
import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";


import userSchema from "../models/userSchema.js";
import noteSchema from "../models/noteSchema.js";
import dbConnect from "../config/dbConnection.js";

dotenv.config({ path: ".env" });

const generateUsers = async (num) => {
    const newUsers = [];
    for (let i = 1; i <= num; i++) {
        const password = await bcrypt.hash("password", 10);
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
        const title = faker.lorem.words(3);
        const content = faker.lorem.sentence();
        const userID = "67a2a6413018642200432bd1";
        newNotes.push({ title, content, userID });
    }
    return newNotes;
};

const seedDatabase = async () => {
    try {
        await dbConnect(); 
        console.log("Connected to Database");

        // Seed Users
        const newUsers = await generateUsers(10);
        // await userSchema.deleteMany({});
        await userSchema.insertMany(newUsers);
        console.log("Successfully Created Users");

        // Seed Notes
        const newNotes = generateNotes(10);
        await noteSchema.deleteMany({});
        await noteSchema.insertMany(newNotes);
        console.log("Successfully Created Notes");

    } catch (error) {
        console.error("Seeding Error:", error);
    } finally {
        mongoose.disconnect();
        console.log("Database Disconnected");
    }
};

seedDatabase();
