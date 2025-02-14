import {Button,Modal } from "flowbite-react";
import {Trash2} from "lucide-react"
import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import axios from "axios";


"use client";

export default function DeleteNoteModal({id,setRefresh,refresh}) {
    const token = localStorage.getItem("accessToken");
    const [openModal, setOpenModal] = useState(false);
    const [del, setDel] = useState(false)

    useEffect(()=>{
        const deletenote = async() => {
        try{
            console.log(del,"delete")
            const response = await axios({
                url:`http://localhost:4000/notes/deleteNote/${id}`,
                headers: { Authorization: `Bearer ${token}` },
                method: "DELETE"
            })
            setDel(false)
            setRefresh(true)
        }
        catch(error){
            console.log(error)
        }
      }
    if(token) deletenote()},[del])
  
 


  return (
    <>
      <button onClick={() => setOpenModal(true)}><Trash2/></button>
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => {setOpenModal(false); setDel(true)}}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}



