import React from 'react'
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { note_validation_schema } from "../../validation/dataValidation";
import { TextInput, Textarea } from "flowbite-react";
import axios from "axios";



export default function AddNoteModal({ openModal, setOpenModal }) {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(note_validation_schema),
    });

    const submitForm = async(data) => {
        setFormData(e.target.value);
        console.log(formData);

        // try {
        //     const response = await axios.post("http://localhost:4000/notes/addNote", {
        //         title,
        //         content,
        //     });

        //     console.log("Note added:", response.data);
        //     setOpenModal(false);
        //     setTitle("");
        //     setContent("");
        // } catch (error) {
        //     console.error("Error adding note:", error);
        // }
    };

    return (
        <div>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Add a New Note</Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Title</label>
                            <TextInput
                                type="text"
                                placeholder="Enter note title"
                                value={title}
                                // onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Content</label>
                            <Textarea
                                placeholder="Enter note content"
                                value={content}
                                // onChange={(e) => setContent(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex justify-end space-x-2">
                            <Button type="submit" onClick={() => setOpenModal(false)}>Save Note</Button>
                            <Button color="gray" onClick={() => setOpenModal(false)}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    )
}



