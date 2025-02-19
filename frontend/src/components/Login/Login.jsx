import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { user_validation_schema_login } from "../../validation/dataValidation";
import { Link, Navigate } from "react-router-dom";


export default function Login() {
  function Valid_user({ error }) {
    if (error === "invalid") {
      return (
        <div className="text-md text-red-900 mt-[5px] min-h-[30px] flex justify-center">
          Incorrect credentials
        </div>
      );
    }
    else if( error==="unverified") {
      return (
        <div className="text-md text-red-900 mt-[5px] min-h-[30px] flex justify-center">Please check your mail for verification email</div>
      );
    }
    else if(error === "logged in"){
      return (
        <div className="text-md text-red-900 mt-[5px] min-h-[30px] flex justify-center">You are already logged in!</div>
      );
    }
    else if(error === "valid"){
          return <Navigate to="/Notes"/>
    }
    else {
      return (
        <div className="text-md text-red-900 mt-[5px] min-h-[30px] flex justify-center"></div>
      );
    }
  }

  const [ValidUserError, setValidUserError] = useState("");

  function ErrorsEmail() {
    if (errors.email && errors.email != null) {
      return (
        <div className="text-sm text-red-900 mt-[5px] min-h-[20px]">
          {errors.email.message}
        </div>
      );
    } else {
      return <div className="text-sm text-red-900 mt-[5px] min-h-[20px]"></div>;
    }
  }

  function ErrorsPwd() {
    if (errors.password && errors.password != null) {
      return (
        <div className="text-sm text-red-900 mt-[5px] min-h-[20px]">
          {errors.password.message}
        </div>
      );
    } else {
      return <div className="text-sm text-red-900 mt-[5px] min-h-[20px]"></div>;
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(user_validation_schema_login),
  });

  const submitForm = async (data) => {
    console.log("data", data);
    try {
      const response = await axios({
        url: `http://localhost:4000/user/login`,
        method: "POST",
        data: data,
      });
      console.log("Login Successful:", response.data);
      
      localStorage.setItem("accessToken",response.data.data.token)
      localStorage.setItem("refreshToken",response.data.data.refresh_token)
      console.log("Access Token:", localStorage.getItem("accessToken"));
      console.log("Refresh Token:", localStorage.getItem("refreshToken"));

      setValidUserError("valid");

     
    } catch (error) {
      console.log("Error", error.response.data.message);
      if (
        error &&
        error.response.data.message === "Authentication unsuccessful"
      ) {
        setValidUserError("invalid");
      }
      else if (
        error &&
        error.response.data.message === "unverified"
      ) {
        setValidUserError("unverified");
      }
      else if(
         error &&
        error.response.data.message ===  "You are already logged in")
        {
          setValidUserError("logged in");
        }
    }
  };

  return (
    <div className="flex justify-center align-center">
      <form
        onSubmit={handleSubmit(submitForm)}
        className=" w-[300px] first_bp:w-[350px] second_bp:w-[400px] md:[w-743px] bg-[#FFD689] rounded shadow-xl p-[20px] m-[50px] md:mt-[20px] lg:mt-[20px]"
      >
        <h3 className="text-lg text-center mb-[20px] font-bold text-amber-700 md:text-2xl">
          Login
        </h3>
        <div className="flex flex-col mb-[20px]">
          <label className="mb-[10px] text-md md:text-xl">Email:</label>
          <input
            type="email"
            name="email"
            className="rounded px-[10px] py-[5px] text-xs md:text-lg"
            {...register("email")}
          />
          <ErrorsEmail />
        </div>
        <div className="flex flex-col mb-[20px]">
          <label className="mb-[10px] text-md md:text-xl">Password:</label>
          <input
            type="password"
            name="password"
            className="rounded px-[10px] py-[5px] text-xs md:text-lg"
            {...register("password")}
          />
          <ErrorsPwd />
        </div>
        <div className="flex mb-[20px] justify-center">
          <button className="text-md md:text-lg bg-amber-500 hover:bg-amber-700 hover:text-white p-[5px] px-[10px] rounded lg:mt-[20px]">
            Submit
          </button>
        </div>
        <Valid_user error={ValidUserError} />
        <div className="flex justify-center items-center">
          <h6 className="text-sm first_bp:text-md lg:text-lg">
            Are you a new user ?
            <Link to="/" className="text-blue-600 cursor-pointer flex justify-center items-center">
              {" "}
              Sign Up
            </Link>
          </h6>
        </div>
      </form>
    </div>
  );
}
