import React from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";

"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function Logout() {
    const token = localStorage.getItem("accessToken");
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate()
    async function confirm_logout(){
        try {
            const response = await axios({
                url: `http://localhost:4000/user/logout`,
                headers: { Authorization: `Bearer ${token}` },
                method: "GET",
                
            });
            console.log(response);
            if(response.data.success)
            {
              navigate("/login")
            }
        } 
        catch(error){
            console.log(error)
        }
        setOpenModal(false)
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
  }
  

  return (
    <>
      <button className="bg-amber-500 hover:bg-amber-700 hover:text-white px-4 py-1 rounded-md" onClick={() => setOpenModal(true)}>Logout</button>
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to logout?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={()=>confirm_logout()}>
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
