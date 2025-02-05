import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios"

export default function Signup() {
    const { register, handleSubmit, formState } = useForm();

    const submitForm = async (data) => {
        try {
            const response = await axios({ url: "http://localhost:4000/user/register",
                method: "POST",data:data})
            console.log("Registration Successful:", response.data);
        } catch (error) {
            console.error("Error",error);
        }
    };

    return (
        <div className="flex justify-center align-center">
            <form onSubmit={handleSubmit(submitForm)} className=" w-[300px] first_bp:w-[350px] second_bp:w-[400px] md:[w-743px] bg-[#FFD689] rounded shadow-xl p-[20px] m-[50px] md:mt-[70px] lg:mt-[120px]">
                <h3 className="text-lg text-center mb-[20px] font-bold text-amber-700 md:text-2xl">Sign Up</h3>
                <div className="flex flex-col mb-[20px]">
                    <label className="mb-[10px] text-md md:text-xl">First Name:</label>
                    <input type="text" name="fname" className=" text-xs rounded px-[10px] py-[5px] md:text-lg"  {...register("fname")}/>
                </div>
                <div className="flex flex-col mb-[20px]">
                    <label className="mb-[10px] text-md md:text-xl">Email:</label>
                    <input type="email"  name="email" className="rounded px-[10px] py-[5px] text-xs md:text-lg" {...register("email")} />
                </div>
                <div className="flex flex-col mb-[20px]">
                    <label className="mb-[10px] text-md md:text-xl">Password:</label>
                    <input type="password" name="password" className="rounded px-[10px] py-[5px] text-xs md:text-lg" {...register("password")} />
                </div>
                <div className="flex mb-[20px] justify-center">
                    <button className="text-md md:text-lg bg-amber-500 hover:bg-amber-700 hover:text-white p-[5px] px-[10px] rounded" >Submit</button>
                </div>
                <div className="flex justify-center">
                    <h7>Are you an existing user ?<a className="text-blue-600 cursor-pointer"> Log in</a></h7>
                </div>
            </form>
        </div>
    )
}


