import express from "express";
import { createUser } from "../controllers/controller.js";
const route = express.Router();

route.post("/create",createUser);

export default route;