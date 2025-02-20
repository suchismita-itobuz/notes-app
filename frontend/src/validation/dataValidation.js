import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup);

export const user_validation_schema = yup.object({
    email: yup.string().trim().required("Email is required").email("Invalid email format"),
    password: yup.string().trim().required("Password is required").minLowercase(1, "Minimum 1 lowercase is required").minUppercase(1, "Minimum 1 uppercase character is required").minNumbers(1, "Minimum 1 number is required").minSymbols(1, "Minimum 1 symbol is required").min(3, "minimum 3 characters required"),
    fname:yup.string().required("Name is required").min(3,"Minimum 3 characters required")
})

export const user_validation_schema_login = yup.object({
    email: yup.string().trim().required("Email is required").email("Invalid email format"),
    password: yup.string().trim().required("Password is required").minLowercase(1, "Minimum 1 lowercase is required").minUppercase(1, "Minimum 1 uppercase character is required").minNumbers(1, "Minimum 1 number is required").minSymbols(1, "Minimum 1 symbol is required").min(3, "minimum 3 characters required")
})

export const note_validation_schema = yup.object({
    title:yup.string().trim().min(1,"Title cannot be empty"),
    content:yup.string().trim().min(1,"Content cannot be empty")
})


export const message_validation_schema = yup.object({
    message:yup.string().trim().min(1,"Message cannot be empty")
})






