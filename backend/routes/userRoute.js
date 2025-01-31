import express from "express";
import { createUser, loginUser, logout } from "../controllers/userController.js";
import { verifyEmail } from "../middleware/tokenVerify.js"
import { validate } from "../middleware/validateData.js";
import { user_validation_schema, user_validation_schema_login} from "../validators/dataValidation.js";
import { verifyAuthorisation } from "../middleware/verifyAuth.js";



const userRoute = express.Router();

userRoute.post("/register", validate(user_validation_schema),createUser);
userRoute.post("/login",validate(user_validation_schema_login),loginUser);
userRoute.get("/verify", verifyEmail);
userRoute.get("/logout",verifyAuthorisation,logout)

export default userRoute;