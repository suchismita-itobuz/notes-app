import { Modal } from "flowbite-react";
import {Eye} from "lucide-react"
import { useEffect, useState } from "react";
import axios from "axios";


"use client";

export default function ViewNoteModal({id}) {
    const token = localStorage.getItem("accessToken");
    const [openModal, setOpenModal] = useState(false);
    const [resultTitle,setResultTitle] = useState([])
    const [resultContent,setResultContent] = useState([])

    useEffect(()=>{
        const viewnote = async() => {
        try{
            const response = await axios({
                url:`http://localhost:4000/notes/ShowNoteByID/${id}`,
                headers: { Authorization: `Bearer ${token}` },
                method: "GET"
            })
            setResultTitle(response.data.data[0].title)
            setResultContent(response.data.data[0].content)

            // console.log("title",response.data.data.title)
            // console.log("content",response.data.data.content)


        }
        catch(error){
            console.log(error)
        }
      }
    if(token) viewnote()},[openModal])
  
 
  

  return (
    <>
      <button onClick={() => setOpenModal(true)}><Eye/></button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Title: {resultTitle}</Modal.Header>
        <Modal.Footer> {resultContent}</Modal.Footer>
      </Modal>
    </>
  );
}



