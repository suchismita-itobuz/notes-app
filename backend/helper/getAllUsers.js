import User_details from "../models/userSchema.js";


export const getAllUsers = async(req,res) => {
    try{
    const all_users = await User_details.find({})
    res.status(200).json({
        data:{all_users}
    })
    }
    catch(error){
        console.log(error)
        res.status(400).json({
            message:"Users not found"
        })
    }
}