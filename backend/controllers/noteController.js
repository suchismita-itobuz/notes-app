import notes from "../models/noteSchema.js"

//create a note 
export const createNote = async (req, res) => {
    try {
        const userID = req.id
        const { title, content } = req.body;
        const flag = await notes.find({ userID,title })
        console.log("flag",flag)
        if (flag.length>0) {
            return res.status(404).json({
                success: false,
                message: "note with same title exists",

            })
        }
        const note = await notes.create({ title, content, userID })
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
        const { search_query } = req.body //accepts search query value from request body
        const { sortBy } = req.query //sortBy value from query
        const { pageNum } = req.query //starts from 0 cuz otherwise if it starts from 1 the first ${displayedEntries} will be skipped

        const displayedEntries = 3

        const all_notes = await notes.find({ userID: `${req.id}` }) //find all notes of user
        const len = all_notes.length //find length of all notes


        function page_limit(len) {
            const i = Math.ceil((len / displayedEntries))
            return i
        } //function which calculates max page limit 

        const max_limit = page_limit(len) //storing the value of max page limit

        let sortCriteria = 3

        if (sortBy === "asc") {                         //sortBy values is mapped and stored here.
            sortCriteria = { createdAt: "asc" }
        }
        else if (sortBy === "desc") {
            sortCriteria = { createdAt: "desc" }
        }
        else {
            sortCriteria = { title: "asc" }
        }


        console.log("search_query",search_query)
        
        if (search_query === "") {
            const note = await notes.find({ userID: `${req.id}` }).sort(sortCriteria).limit(displayedEntries).skip(pageNum * displayedEntries);
            // console.log(all_notes.length)
            res.status(200).json({
                data: {
                    "note": note,
                    "max_limit": max_limit
                }
            })
        }
        else{
            console.log("condiiton is wokeing fine")
            const all_notes = await notes.find({userID:req.id,title:{ "$regex": search_query, "$options": "i" } })
            const note = await notes.find({ userID: req.id, title: { "$regex": search_query, "$options": "i" } }).sort(sortCriteria).limit(displayedEntries).skip(pageNum * displayedEntries); //finding notes based on this search
            const len = all_notes.length
            // console.log(len)
            const max_limit = page_limit(len)

            res.status(200).json({
                data: {
                    "note": note,
                    "max_limit": max_limit
                }
            })
        }

    }
    catch (error) {

        console.log(error)
        res.status(404).json({
            message: "Cannot fetch data",
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


