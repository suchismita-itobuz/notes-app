import { z } from "zod";

export const validationSchema = z.object({
email:z.email({message:"invalid email address"}),
password:z.string().min(3,{message:"Password must have 3 characters minimum"}).max(10,{message:"Password cannot be greater than 10 characters"})
});

