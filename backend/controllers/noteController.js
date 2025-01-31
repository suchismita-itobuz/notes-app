import notes from "../models/noteSchema.js"

//create a note 
export const createNote = async (req, res) => {
    try { 
        const { title, content } = req.body;
        const note = await notes.create({title,content,userID:`${req.id}`})
        // console.log(note)  

        res.status(200).json({
            success: true,
            message: "new note created",
            data: note
        })
    }

    catch(error){
        console.log(error)
        res.status(404).json({
            success:false,
            message:"note was not created",
        })
    }

}

//Show all notes
export const showNote = async (req, res) => {
    try {
        const note = await notes.find({userID:`${req.id}`});
        res.status(200).json({
            data: note
        })
    }
    catch (error) {
        res.status(404).json({
            message: "Cannot fetch data",
        })
    }
}

//show note by id 
export const showNoteById = async (req, res) => {
    try {
        const note_id = req.params.id;
        const note = await notes.find({userID:`${req.id}`,_id:note_id});
        res.status(200).json({
            data: note
        })
    }
    catch (error) {
        console.log(error)
        res.status(404).json({
            message: "Cannot fetch data",
        })
    }
}



//delete notes

export const deleteNote = async (req, res) => {
    try {
        const note_id = req.params.id;
        const note = await notes.deleteOne({userID:`${req.id}`,_id:note_id});
        res.status(200).json({
            message:"Notes deleted successfully"
        })
    }
    catch (error) {
        console.log(error)
        res.status(404).json({
            message: "Cannot delete data",
        })
    }
}


//update note

export const updateNote = async (req, res) => {
    try {
        const note_id = req.params.id;
        const {title,content} = req.body;
        const note = await notes.findOne({userID:`${req.id}`,_id:note_id});
        console.log("note",note);
        note.title = title;
        note.content = content;
        await note.save();
        res.status(200).json({
            data: note
        })
    }
    catch (error) {
        console.log(error)
        res.status(404).json({
            message: "Cannot fetch data",
        })
    }
}
