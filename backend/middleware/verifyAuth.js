import jwt from "jsonwebtoken";
import session from "../models/sessionSchema.js";

export const verifyAuthorisation = async (req, res, next) => {
    //from headers take in the auth token and decode 
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
        const token = authHeader.split(" ")[1];

        try {
            let decoded = jwt.verify(token, `${process.env.MY_SECRET_KEY}`);
            req.id = decoded.userID;
            console.log("Verify Middleware is working for this user", decoded.userID);

            // Check if session exists
            const userID = decoded.userID;
            const flag = await session.findOne({ userID: userID });

            if (!flag) {
                return res.status(403).json({
                    success: false,
                    message: "You are not logged in. Please log in.",
                });
            }

            next(); // Move to next middleware
        } 
        catch (error) {
            console.error("JWT Verification Error:", error.message);

            if (error.message === "jwt expired") {
                return res.status(403).json({
                    success: false,
                    message: "Token has expired",
                });
            } 
            else if (error.message === "invalid signature") {
                return res.status(401).json({
                    success: false,
                    message: "Token is invalid",
                });
            } 
            else {
                return res.status(401).json({
                    success: false,
                    message: "Authorization failed",
                });
            }
        }
    } 
    else {
        return res.status(404).json({
            success: false,
            message: "Token wasn't present in headers",
        });
    }
};
