import express from "express";
import { verifyAuthorisation } from "../middleware/verifyAuth.js";
import { createNote, deleteNote, searchNote, showSortedNote, showNoteById, updateNote} from "../controllers/noteController.js"
import { note_validation_schema } from "../validators/noteValidation.js";
import { validate } from "../middleware/validateData.js";
import { resendAccessToken } from "../helper/resendAccessToken.js"
import { upload, uploadNotes } from "../multerConfig.js";
import { getUser } from "../helper/getUser.js";




const noteRoute = express.Router();

noteRoute.get("/getUser",verifyAuthorisation,getUser)
noteRoute.post("/addNote",verifyAuthorisation,validate(note_validation_schema),createNote);
noteRoute.get("/ShowAllNotes",verifyAuthorisation,showSortedNote);
noteRoute.get("/ShowNoteByID/:id",verifyAuthorisation,showNoteById)
noteRoute.delete("/deleteNote/:id",verifyAuthorisation,deleteNote);
noteRoute.post("/updateNote/:id",verifyAuthorisation,validate(note_validation_schema),updateNote);
noteRoute.get("/generateNewToken",resendAccessToken)
noteRoute.post("/search",verifyAuthorisation,searchNote)
noteRoute.post("/upload/:id",verifyAuthorisation,upload.single("filePath"),uploadNotes)



export default noteRoute;