import { Modal } from "flowbite-react";
import { Eye, Link } from "lucide-react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../helper/axiosInstance";

"use client";

export default function ViewNoteModal({ id }) {
  const token = localStorage.getItem("accessToken");
  const [openModal, setOpenModal] = useState(false);
  const [resultTitle, setResultTitle] = useState("");
  const [resultContent, setResultContent] = useState("");
  const [resultFile, setResultFile] = useState("");

  useEffect(() => {
    const viewnote = async () => {
      try {
        const response = await axiosInstance({
          url: `/ShowNoteByID/${id}`,
          method: "GET",
        });
        console.log(response);
        setResultTitle(response.data.data[0].title);
        setResultContent(response.data.data[0].content);
        setResultFile(response.data.data[0].filePath); 
      } catch (error) {
        console.log(error);
      }
    };
    if (token) viewnote();
  }, [openModal]);

  // Function to determine file type and render appropriately
  const renderFile = () => {
    if (!resultFile) return <p>No file uploaded.</p>;

    const fileExtension = resultFile.split(".").pop().toLowerCase();

    if (["jpg", "jpeg", "png", "gif"].includes(fileExtension)) {
      return <img src={resultFile} alt="Uploaded file" className="max-w-full h-auto mt-2 rounded-lg" />;
    } else if (fileExtension === "pdf") {
      return <iframe src={resultFile} className="w-full h-64 mt-2 border rounded-lg"></iframe>;
    } else {
      return (
        <a href={resultFile} target="_blank" className="text-blue-500 flex items-center mt-2">
          <Link className="mr-1" /> Download File
        </a>
      );
    }
  };

  return (
    <>
      <button onClick={() => setOpenModal(true)}>
        <Eye />
      </button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Title: {resultTitle}</Modal.Header>
        <Modal.Body>
          <div>
            <p><strong>Content:</strong> {resultContent}</p>
          </div>
          <div>
            <strong>Uploaded File:</strong>
            {renderFile()}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={() => setOpenModal(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
