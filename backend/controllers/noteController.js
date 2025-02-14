import notes from "../models/noteSchema.js"

//create a note 
export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const flag = await notes.findOne({ title })
        if (flag) {
            return res.status(404).json({
                success: false,
                message: "note with same title exists",

            })
        }
        const note = await notes.create({ title, content, userID: `${req.id}` })
        console.log("note", note)

        res.status(200).json({
            success: true,
            message: "new note created",
            data: note
        })
    }

    catch (error) {
        console.log(error)
        res.status(404).json({
            success: false,
            message: "note was not created",
        })
    }

}

//Show all notes and pagination as well 
export const showSortedNote = async (req, res) => {
    try {
        const { search_query } = req.body
        const { sortBy } = req.query
        const { pageNum } = req.query //starts from 0 cuz otherwise if it starts from 1 the first ${displayedEntries} will be skipped

        const displayedEntries = 3

        const all_notes = await notes.find({ userID: `${req.id}` })
        const len = all_notes.length


        function page_limit(len) {
            const i = Math.ceil((len / displayedEntries))
            // console.log(i)
            return i
        }

        const max_limit = page_limit(len)

        let sortCriteria = 3
        if (sortBy === "asc") {
            sortCriteria = { createdAt: "asc" }
        }
        else if (sortBy === "desc") {
            sortCriteria = { createdAt: "desc" }
        }
        else {
            sortCriteria = { title: "asc" }
        }

        const note = await notes.find({ userID: `${req.id}` }).sort(sortCriteria).limit(displayedEntries).skip(pageNum * displayedEntries);
        // console.log(all_notes.length)
        res.status(200).json({
            data: {
                "note": note,
                "max_limit": max_limit
            }
        })
    }
    catch (error) {

        console.log(error)
        res.status(404).json({
            message: "Cannot fetch data",
        })
    }
}



//search note by title 

export const searchNote = async (req, res) => {
    const { sortBy } = req.query
    const { pageNum } = req.query //starts from 0 cuz otherwise if it starts from 1 the first ${displayedEntries} will be skipped

    const displayedEntries = 3

    const all_notes = await notes.find({ userID: `${req.id}` })
    const len = all_notes.length


    function page_limit(len) {
            const i = Math.ceil((len / displayedEntries))
            return i
    }

    const max_limit = page_limit(len)

    let sortCriteria = 3
        if (sortBy === "asc") {
            sortCriteria = { createdAt: "asc" }
        }
        else if (sortBy === "desc") {
            sortCriteria = { createdAt: "desc" }
        }
        else {
            sortCriteria = { title: "asc" }
        }
    const { search_query } = req.body
    const note = await notes.find({ userID: req.id, title: { "$regex": search_query, "$options": "i" } }).sort(sortCriteria).limit(displayedEntries).skip(pageNum * displayedEntries);

    // console.log("notes",note)
    try {
        if (note.length > 0) {
            res.status(200).json({
                success: true,
                data: note
            })
        }
        else {
            res.status(200).json({
                data: note,
                success: true,
                message: "No notes exist in the record"
            })
        }
    }
    catch (error) {
        console.log(error)
        res.status(404).json({
            success: false
        })
    }
}


//show note by id 
export const showNoteById = async (req, res) => {
    try {
        const note_id = req.params.id;
        // console.log("id",note_id)
        const note = await notes.find({ userID: `${req.id}`, _id: note_id });
        // console.log("note",note)
        res.status(200).json({
            data: note,
            success: true,
            message: "Note is displayed"
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
        await notes.deleteOne({ userID: `${req.id}`, _id: note_id });
        res.status(200).json({
            message: "Notes deleted successfully",
            success: true
        })
    }
    catch (error) {
        console.log(error)
        res.status(404).json({
            message: "Cannot delete data",
            success: false
        })
    }
}


//update note

export const updateNote = async (req, res) => {
    try {
        const note_id = req.params.id;
        const { title, content } = req.body;
        const note = await notes.findOne({ userID: `${req.id}`, _id: note_id });
        console.log("note", note);
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


