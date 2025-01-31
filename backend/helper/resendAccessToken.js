import jwt from "jsonwebtoken";

export const resendAccessToken = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        const refreshtoken = authHeader.split(" ")[1]
        try {
            let decoded = jwt.verify(refreshtoken, `${process.env.MY_SECRET_KEY}`)
            console.log("decoded userID", decoded.userID)
            const userID = decoded.userID
            const token = jwt.sign({userID}, process.env.MY_SECRET_KEY, { expiresIn: '10m' });
            // console.log("acctoken   ",token)
            res.status(200).json({
                success: true,
                data: {token},
                message: "New Access token is sent"
            })
        }
        catch(error){
            if (error && error.message === "jwt expired") {
                res.status(403).json({
                    success: false,
                    message: "You are logged out. Please log in again."
                })
            }
            else(error && error.message === "invalid signature") 
                res.status(401).json({
                    success: false,
                    message: "Token is invalid"
                })
        }
    }
    else 
        res.status(404).json({
            success: false,
            message: "Token wasn't present in header"
        })
    
}




