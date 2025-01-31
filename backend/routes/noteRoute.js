import express from "express";
import { verifyAuthorisation } from "../middleware/verifyAuth.js";
import { createNote, deleteNote, searchNote, showNote, showNoteById, updateNote} from "../controllers/noteController.js"
import { note_validation_schema } from "../validators/noteValidation.js";
import { validate } from "../middleware/validateData.js";
import { resendAccessToken } from "../helper/resendAccessToken.js"



const noteRoute = express.Router();

noteRoute.post("/addNote",verifyAuthorisation,validate(note_validation_schema),createNote);
noteRoute.get("/ShowAllNotes",verifyAuthorisation,showNote);
noteRoute.get("/ShowNoteByID/:id",verifyAuthorisation,showNoteById)
noteRoute.delete("/deleteNote/:id",verifyAuthorisation,deleteNote);
noteRoute.post("/updateNote/:id",verifyAuthorisation,validate(note_validation_schema),updateNote);
noteRoute.get("/generateNewToken",resendAccessToken)
noteRoute.post("/search",verifyAuthorisation,searchNote)



export default noteRoute;