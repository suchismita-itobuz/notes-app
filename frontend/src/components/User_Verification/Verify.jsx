
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";

export default function Verify() {
    const { register, handleSubmit } = useForm();
    const { token } = useParams();
    const [tokenExpired, setTokenExpired] = useState(false);

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const response = await axios.get("http://localhost:4000/user/verify", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log("Verification successful", response.data);
            } catch (error) {
                console.error("Verification failed", error.response.data.data.error);
                if (error.response.data.data.error === "TokenExpiredError") {
                    setTokenExpired(true);
                }
            }
        };
        verifyUser();
    }, [token]);

    const submitForm = async (data) => {
        try {
            const response = await axios.post("http://localhost:4000/user//tokenExp", data);
            console.log("Resent verification email", response.data);
        } catch (error) {
            console.log("Error resending verification email:", error);
        }
    };

    return (
       
            tokenExpired ? (
              <div className="flex justify-center pt-[10px]">
                <form
                    onSubmit={handleSubmit(submitForm)}
                    className="w-[300px] first_bp:w-[350px] second_bp:w-[400px] md:w-[743px] bg-[#FFD689] rounded shadow-xl p-[20px] m-[50px] md:mt-[70px] lg:mt-[120px]"
                >
                    <h3 className="text-lg text-center mb-[20px] font-bold text-amber-700 md:text-2xl">
                        Enter your email again to get a new verification link
                    </h3>

                    <div className="flex flex-col mb-[20px]">
                        <label className="mb-[10px] text-md md:text-xl">Email:</label>
                        <input
                            type="email"
                            name="email"
                            className="rounded px-[10px] py-[5px] text-xs md:text-lg"
                            {...register("email", { required: true })}
                        />
                    </div>

                    <div className="flex mb-[20px] justify-center">
                        <button className="text-md md:text-lg bg-amber-500 hover:bg-amber-700 hover:text-white p-[5px] px-[10px] rounded">
                            Submit
                        </button>
                    </div>
                </form>
                </div>
            ) : (
              <div className="flex justify-center pt-[50px] flex-col">
                <p className="text-center text-amber-600 font-bold mb-[50px]">Verifying your account...</p>
               <Link to="/login"><p className="text-center text-amber-800 font-bold underline text-2xl">Click here to login</p></Link>
                </div>
            )
       
    );
}
