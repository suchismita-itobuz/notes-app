import User_details from "../models/userSchema.js";
// import newSchema from "../models/userSchema.js";

export const getUser = async(req,res) => {
    try{
    const userID = req.id
    const user = await User_details.find({_id:userID})
    res.status(200).json({
        data:{
            user:user
        }
    })
    }
    catch(error){
        console.log(error)
        res.status(400).json({
            message:"User not found"
        })
    }
}