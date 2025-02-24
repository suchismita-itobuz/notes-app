// import React, { useEffect, useState } from 'react'
// import { axiosInstance } from '../../helper/axiosInstance';
// import { MessageCircle } from 'lucide-react';
// import ChatModal from '../ChatModal.jsx/ChatModal';



// export default function ChatRoom({ socket }) {

//     const [openModal, setOpenModal] = useState(false);
//     const [result, setResult] = useState("")
//     const [reciever_id,setReciever_id] = useState("")
//     const [fname,setFname] = useState("")
//     const [sender_id,setSender_id] = useState("")

//     const messages = [
//         { sender: "me", text: "Hey! How's it going?" },
//         { sender: "receiver", text: "Hey! I'm good, how about you?" },
//         { sender: "me", text: "Doing well! Just working on my project." },
//         { sender: "receiver", text: "That sounds great! What are you building?" },
//         { sender: "me", text: "A notes app with real-time messaging. 🚀" },
//         { sender: "receiver", text: "Wow, that’s awesome! Keep going! 💪" }
//       ];

    

//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const response = await axiosInstance.get("/getAllUsers")
//                 setResult(response)

//             }
//             catch (error) {
//                 console.error(error)
//             }
//         }
//         fetchUsers()
//     }, [])


//     useEffect(() => {
//         console.log(result.data ? result.data.data.all_users.length : "")
//         result.data ?  setSender_id(result.data.sender_id.userID) : "" //found sender_id here 
//     }, [result])

//     //this function will always run after result value comes so sender id will be available
    
//     function startChat(reciever_id,fname){
//         console.log(reciever_id)//here only room joining needs to be done 
//         setReciever_id(reciever_id)
//         setFname(fname)
//         setOpenModal(true)  
//         const roomID = [sender_id,reciever_id].sort().join("_")
//         socket.emit("joinRoom",{sender_id,reciever_id})
//     }



//     return (
//         <div className="p-[50px] flex flex-col flex-wrap justify-center">
//             <h2 className='text-center text-xl font-bold mb-5'>List of all users</h2>
//             {result.data && result.data.data.all_users.length > 0 ? (
//                 result.data.data.all_users.map((data) => (
//                     <div key={data._id} className="flex bg-amber-300 hover:bg-amber-400 cursor-pointer p-4 mb-4 rounded-md shadow-md relative " onClick={()=>{startChat(data._id,data.fname)}}>
//                         <h2 className="text-lg font-semibold">Name: {data.fname}</h2>
//                         <MessageCircle className='absolute right-[20px]'/>
//                     </div>
//                 ))
//             ) : (
//                 <div className="text-sm min-w-[100px] md:text-lg font-semibold text-gray-700">
//                     No users exist
//                 </div>
//             )}
//             {
//                 openModal && <ChatModal setOpenModal={setOpenModal} openModal={openModal} messages={messages} receiverName={fname}/>
//             }

//         </div>
//     )
// }


import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../helper/axiosInstance';
import { MessageCircle } from 'lucide-react';
import ChatModal from '../ChatModal/ChatModal.jsx';

export default function ChatRoom({ socket }) {
    const [openModal, setOpenModal] = useState(false);
    const [users, setUsers] = useState([]);
    const [receiverID, setReceiverID] = useState("");
    const [receiverName, setReceiverName] = useState("");
    const [senderID, setSenderID] = useState("");
    const [roomID, setRoomID] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosInstance.get("/getAllUsers");
                setUsers(response.data.data.all_users);
                setSenderID(response.data.sender_id.userID); // Set sender ID
            } catch (error) {
                console.error(error);
            }
        };
        fetchUsers();
    }, []);

    const startChat = async (receiverID, receiverName) => {
        setReceiverID(receiverID);
        setReceiverName(receiverName);
        setOpenModal(true);

        const generatedRoomID = [senderID, receiverID].sort().join("_");
        console.log("roomid",generatedRoomID)
        setRoomID(generatedRoomID);
        socket.emit("joinRoom", { senderID, receiverID });

        // Fetch existing messages for this room
        try {
            const response = await axiosInstance.get(`/GetChatHistory/${generatedRoomID}`);
            if(response){
            setMessages(response.data.messages); 
            }
            else{

            }
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    useEffect(() => {
        socket.on("receive_message", (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => {
            socket.off("receive_message");
        };
    }, [socket]);

    return (
        <div className="p-[50px] flex flex-col flex-wrap justify-center">
            <h2 className='text-center text-xl font-bold mb-5'>List of all users</h2>
            {users.length > 0 ? (
                users.map((user) => (
                    <div 
                        key={user._id} 
                        className="flex bg-amber-300 hover:bg-amber-400 cursor-pointer p-4 mb-4 rounded-md shadow-md relative" 
                        onClick={() => startChat(user._id, user.fname)}
                    >
                        <h2 className="text-lg font-semibold">Name: {user.fname}</h2>
                        <MessageCircle className='absolute right-[20px]'/>
                    </div>
                ))
            ) : (
                <div className="text-sm min-w-[100px] md:text-lg font-semibold text-gray-700">
                    No users exist
                </div>
            )}
            {openModal && (
                <ChatModal 
                    setOpenModal={setOpenModal} 
                    openModal={openModal} 
                    messages={messages} 
                    senderID={senderID} 
                    roomID={roomID} 
                    receiverName={receiverName} 
                    socket={socket} 
                />
            )}
        </div>
    );
}

