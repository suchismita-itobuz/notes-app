import express from "express";
import { createUser, loginUser } from "../controllers/userController.js";
import { randomFunc, verifyEmail } from "../middleware/tokenVerify.js"
import { validate } from "../middleware/validateData.js";
import { user_validation_schema, user_validation_schema_login} from "../validators/dataValidation.js";


const route = express.Router();

route.post("/register", validate(user_validation_schema),createUser);
route.post("/login",validate(user_validation_schema_login) ,loginUser);
route.get("/verify/:token", randomFunc);
route.get("/verify", verifyEmail);

export default route;