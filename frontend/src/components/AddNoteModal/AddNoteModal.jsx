import React from 'react'

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { note_validation_schema } from "../../validation/dataValidation";
import axios from "axios";





"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { axiosInstance } from '../../helper/axiosInstance';

export default function AddNoteModal({refresh,setRefresh}) {

    function ErrorsTitle() {
        if (errors.title && errors.title != null) {
          return (
            <div className="text-sm text-red-900 mt-[5px] min-h-[20px]">
              {errors.title.message}
            </div>
          );
        } else {
          return <div className="text-sm text-red-900 mt-[5px] min-h-[20px]"></div>;
        }
      }

      function ErrorsContent() {
        if (errors.content && errors.content != null) {
          return (
            <div className="text-sm text-red-900 mt-[5px] min-h-[20px]">
              {errors.content.message}
            </div>
          );
        } else {
          return <div className="text-sm text-red-900 mt-[5px] min-h-[20px]"></div>;
        }
      }

      function ErrorSameTitle() {
        if (error) {
          return (
            <div className="flex justify-center text-sm text-red-900 mt-[5px] min-h-[20px]">
              {"Cannot Add Note With Same Title"}
            </div>
          );
        } else {
          return <div className="text-sm text-red-900 mt-[5px] min-h-[20px]"></div>;
        }
      }

    
    const [openModal, setOpenModal] = useState(false);
    const [error,setError] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },reset
    } = useForm({
        resolver: yupResolver(note_validation_schema),
    });


    const submitForm = async (data) => {
        
        try {
            
            const response = await axiosInstance({
                url: `/addNote`,
                method: "POST",
                data: data,
            });
            console.log("data", data);
            setOpenModal(false)
            setRefresh(true)
            setError(false)
            reset()

        } catch (error) {
            console.log("error",error.response.data.message)
            if(error.response.data.message==="note with same title exists"){
            setError(true)
            console.log("true")
            }
        };
    }
    return (
        <>
            <Button onClick={() => setOpenModal(true)}>Add Note</Button>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Add New Note:</Modal.Header>
                <Modal.Body>
                    <div className="flex justify-center align-center">
                        <form
                            onSubmit={handleSubmit(submitForm)}
                            className=" w-[300px] first_bp:w-[350px] second_bp:w-[400px] md:[w-743px] bg-[#FFD689] rounded shadow-xl p-[20px] m-[50px] md:mt-[20px] lg:mt-[20px]"
                        >

                            <div className="flex flex-col mb-[20px]">
                                <label className="mb-[10px] text-md md:text-xl">Title:</label>
                                <input
                                    type="textarea"
                                    name="title"
                                    className="rounded px-[10px] py-[5px] text-xs md:text-lg"
                                    {...register("title")}
                                />
                                <ErrorsTitle/>

                            </div>
                            <div className="flex flex-col mb-[20px]">
                                <label className="mb-[10px] text-md md:text-xl">Content:</label>
                                <input
                                    type="textarea"
                                    name="content"
                                    className="rounded px-[10px] py-[5px] text-xs md:text-lg"
                                    {...register("content")}
                                />
                            <ErrorsContent/>
                            </div>
                            <div className="flex mb-[20px] justify-center">
                                <button className="text-md md:text-lg bg-amber-500 hover:bg-amber-700 hover:text-white p-[5px] px-[10px] rounded lg:mt-[20px]">
                                    Submit
                                </button>
                            </div>
                            <ErrorSameTitle/>
                        </form>
                        
                    </div>
                </Modal.Body>

            </Modal>
        </>
    );
}

