import * as yup from "yup";

export const note_validation_schema = yup.object({
    title:yup.string().trim().min(1,"Title cannot be empty"),
    content:yup.string().trim().min(1,"Content cannot be empty")
})