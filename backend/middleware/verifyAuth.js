import jwt from "jsonwebtoken";
import session from "../models/sessionSchema.js";

export const verifyAuthorisation = async (req, res, next) => {
    //from headers take in the auth token and decode 
    const authHeader = req.headers.authorization;
  
    if (authHeader && authHeader.startsWith("Bearer")) {
        const token = authHeader.split(" ")[1]
      
        try {
            let decoded = jwt.verify(token, `${process.env.MY_SECRET_KEY}`)
            console.log("userID", decoded)
            req.id = decoded.userID
            //req.id will go to the next function
            console.log("fdvfedve", decoded.userID)
            //here session is checked if active or not 
            const userID = decoded.userID
            try {
                const flag = await session.findOne({ userID: `${userID}` })
                console.log("flag", flag)
                if (flag === null) {
                    throw Error
                }
                next()
            }
            catch (error) {
                return res.status(403).json({
                    success: false,
                    message: "You are not logged in. Please log in."
                })
            }

        }
        catch (error) {
            // console.log(error.message)
            if (error && error.message === "jwt expired") {
                return res.status(403).json({
                    success: false,
                    message: "Token has expired {API is called from where it is resent}"
                })
            }
            else (error && error.message === "invalid signature")
            return res.status(401).json({
                success: false,
                message: "Token is invalid"
            })

        }

    }
    else {
        return res.status(404).json({
            success: false,
            message: "Token wasn't present in headers",
        })
    }
}


