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





// const token = authHeader.split(" ")[1]
// // console.log("token", token)
// jwt.verify(token, `${process.env.MY_SECRET_KEY}`, async (error, decoded) => {
//     // if(error.message==="jwt expired"){
//     if(error){
//         res.status(403).json({
//             success:false,
//             message:"Refresh Token has expired"
//         })
//     }
//     // elif(error.message===jwt token invalid??) ----->HANDLE CASE!!
//     else{
//         console.log("decoded",decoded)
//         const userID = decoded.userID
//         //send access token to user
//         const token = jwt.sign({userID}, process.env.MY_SECRET_KEY, { expiresIn: '10m' });
//         res.status(200).json({
//             success:true,
//             data:{token},
//             message:"New Access token is sent"
//         })
//     }
// });