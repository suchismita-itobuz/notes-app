import express from "express";
import { createUser, loginUser } from "../controllers/userController.js";
import { verifyEmail } from "../emailVerify/emailverified.js";
const route = express.Router();

route.post("/create", createUser);
route.post("/login", loginUser);
route.get("/verify/:token", verifyEmail);

export default route;