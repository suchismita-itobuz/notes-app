import { Button, Modal } from "flowbite-react";
import { Trash2 } from "lucide-react"
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { axiosInstance } from "../../helper/axiosInstance";


"use client";

export default function DeleteNoteModal({ id, setRefresh, refresh }) {
  const token = localStorage.getItem("accessToken");
  const [openModal, setOpenModal] = useState(false);
  const [del, setDel] = useState(false)


  const deletenote = async () => {
    try {
      setOpenModal(false)
      setRefresh(true)
      const response = await axiosInstance({
        url: `/deleteNote/${id}`,

        method: "DELETE"
      })
      console.log(response)
    }
    catch (error) {
      console.log(error)
    }
  }



  return (
    <>
      <button onClick={() => setOpenModal(true)}><Trash2 /></button>
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={deletenote}>
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



