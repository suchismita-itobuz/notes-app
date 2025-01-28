import jwt from "jsonwebtoken";


export const verifyAuthorisation = async(req,res,next) => {
    //from headers take in the auth token and decode 
    const authHeader = req.headers.authorization;
    // console.log(authHeader)
    if (authHeader && authHeader.startsWith("Bearer")) {
        const token = authHeader.split(" ")[1]
        jwt.verify(token, `${process.env.MY_SECRET_KEY}`, async (err, decoded) => {
            if(err){
                console.log("token is invalid or expired")
            }
            else{
                // console.log("middleware")
                // next(decoded.userID);
                req.id = decoded.userID
                next()
            }
        });
    }
    else{
        res.status(404).json({
            success: false,
            message: "Token wasn't present in headers",
        })
    }
};