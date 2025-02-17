// import React from 'react'
// import { Button, Modal } from "flowbite-react";
// import { useState } from "react";
// import { ImageUp } from "lucide-react"
// import { useForm } from "react-hook-form";
// import axios from "axios";



// export default function FileUpload({id}) {
//     const {
//         register,
//         handleSubmit,
//         formState: { errors },reset
//     } = useForm();
   

//     const submitForm = async (data) => {
//         console.log(data)
//         try {
            
//             const response = await axios({
//                 url: `http://localhost:4000/notes/upload/${id}`,
//                 headers: { Authorization: `Bearer ${token}` },
//                 method: "POST",
                
//             });
//             console.log("data", data);

//         } catch (error) {
//             console.log("error",error)
//             }
//         };
    

//     "use client";


//     const [openModal, setOpenModal] = useState(false);

//     return (
//         <>
//             <ImageUp onClick={() => setOpenModal(true)} />
//             <Modal show={openModal} onClose={() => setOpenModal(false)}>
//                 <Modal.Header>Upload File</Modal.Header>
//                 <Modal.Body>
//                     <form onSubmit={handleSubmit(submitForm)}>
//                     <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload file</label>
//                     <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" name="file_input"   {...register("file_input")}/>
//                     <Button onClick={() => setOpenModal(false)}>Upload file</Button>
//                     </form>
//                 </Modal.Body>
//                 <Modal.Footer>
                   
//                     <Button color="gray" onClick={() => setOpenModal(false)}>
//                         Decline
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </>
//     );

// }


import {React,useRef} from 'react'
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { ImageUp } from "lucide-react"
import { useForm } from "react-hook-form";
import axios from "axios";



export default function FileUpload({id}) {
   
    const token = localStorage.getItem("accessToken")

    const submitForm = async(event) => {
      try{
        const formData = new FormData();

        console.log(event.target.files)
        formData.append("filePath",event.target.files[0])

        const response = await axios.post(`http://localhost:4000/notes/upload/${id}`, formData,{
          headers:{
            Authorization: `Bearer ${token}`
          }
        })

        console.log(response)
        setOpenModal(false)
    }
    catch(error){
      console.log(error)
    }
  }
    

    "use client";


    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <ImageUp onClick={() => setOpenModal(true)} />
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Upload File</Modal.Header>
                <Modal.Body>
                   
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload file</label>
                    <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" name="filePath" onChange={submitForm}/>
                   
                </Modal.Body>
                <Modal.Footer>
                    <Button color="gray" onClick={() => setOpenModal(false)}>
                        Decline
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );

}
