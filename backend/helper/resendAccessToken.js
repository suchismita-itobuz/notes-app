import jwt from "jsonwebtoken";

export const resendAccessToken = async(req,res) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        const token = authHeader.split(" ")[1]
        console.log("token", token)
        jwt.verify(token, `${process.env.MY_SECRET_KEY}`, async (error, decoded) => {
            if(error.message==="jwt expired"){
                res.status(403).json({
                    success:false,
                    message:"Refresh Token has expired"
                })
            }
            // elif(error.message===jwt token invalid??) ----->HANDLE CASE!!
            else{ 
                console.log(decoded)
                userid = decoded.userID
                //send access token to user
                const token = jwt.sign({userid}, process.env.MY_SECRET_KEY, { expiresIn: '10m' });
                res.status(200).json({
                    success:true,
                    data:{token},
                    message:"Refresh token is sent"
                })
            }
        });
    }
    else {
        res.status(404).json({
            success: false,
            // message: "Wrong password"
            message:"Token wasn't present in header"
        })
    }
}