import multer from "multer"
import path from "path"
import noteSchema from "./models/noteSchema.js";


const storage = multer.diskStorage({
    destination: "./uploads",
    filename: function (req, file, cb) {
        cb(null,file.fieldname+"-"+Date.now() + path.extname(file.originalname)); 
    }
});


export const upload = multer({storage});

export const uploadNotes = async(req,res) => {
    const id = req.params.id
    if(!req.file){
        return res.status(400).json({
            message:"No file present"
        })
    }
    const Note = await noteSchema.findById(id)
    if(Note)
    {
        Note.filePath = "http://localhost:4000/uploads/" + req.file.filename;
        await Note.save();
        return res.status(200).json({
            success:true,
            message:`file uploaded successfully ${req.file.filename}`
        })
    }
    else{
        return res.status(400).json({
            success:false,
            message:"file not uploaded"
        })
    }
}