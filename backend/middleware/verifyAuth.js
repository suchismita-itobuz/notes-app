import jwt from "jsonwebtoken";

export const verifyAuthorisation = async(req,res,next) => {
    //from headers take in the auth token and decode 
    const authHeader = req.headers.authorization;
    // console.log(authHeader)
    if (authHeader && authHeader.startsWith("Bearer")) {
        const token = authHeader.split(" ")[1]
        console.log("token", token)
        jwt.verify(token, `${process.env.MY_SECRET_KEY}`, async (error, decoded) => {
            if(error.message==="jwt expired"){
                res.status(403).json({
                    success:false,
                    message:"Token has expired"
                })
            }
            // elif(error.message===jwt token invalid??) ----->HANDLE CASE!!
            else{ 
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