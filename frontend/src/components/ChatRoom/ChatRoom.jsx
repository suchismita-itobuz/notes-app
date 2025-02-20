// import React, { useEffect, useState } from 'react'
// import { message_validation_schema } from '../../validation/dataValidation';
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useForm } from "react-hook-form";
// import { axiosInstance } from '../../helper/axiosInstance';

// export default function ChatRoom({socket}) {

//     const [message,setMessage] = useState("")
//     const [chathistory,setChathistory] = useState("")
//     const [fname, setFname] = useState("");


//     useEffect(() => {
//         const fetchUser = async () => {
//           try {
//             const response = await axiosInstance.get("/getUser")
//             setFname(response.data.data.user[0].fname);

//           } catch (error) {
//             console.error(error);
//           }
//         };
//         fetchUser();
//       }, []);


//     useEffect(()=>{
//         socket.emit("send_message",{message,fname})
//     },[message])


//     useEffect(()=>{
//         socket.on("receive_message",(data)=>{
//             alert(fname)
//             console.log(data.message.message)
//             setChathistory(data)
//         })
//     },[socket])

//      const {
//     register,
//     handleSubmit,
//     formState: { errors },reset
//   } = useForm({
//     resolver: yupResolver(message_validation_schema),
//   });

//   const submitForm = async (data) => {
//     try {
//         setMessage(data)
//         reset()
//     } catch (error) {
//         console.log(error)
//     }
//   };

//   return (
//     <form
//     onSubmit={handleSubmit(submitForm)}
//     className=" w-[300px] first_bp:w-[350px] second_bp:w-[400px] md:[w-743px] bg-[#FFD689] rounded shadow-xl p-[20px] m-[50px] md:mt-[20px] lg:mt-[20px]"
//   >
//     <h3 className="text-lg text-center mb-[20px] font-bold text-amber-700 md:text-2xl">
//      Chat
//     </h3>
//     <div className="flex flex-col mb-[20px]">
//       <label className="mb-[10px] text-md md:text-xl">Your Message:</label>
//       <input
//         type="textarea"
//         name="message"
//         className="rounded px-[10px] py-[5px] text-xs md:text-lg"
//         {...register("message")}
//       />
//     </div>
//     <div className="flex mb-[20px] justify-center">
//       <button className="text-md md:text-lg bg-amber-500 hover:bg-amber-700 hover:text-white p-[5px] px-[10px] rounded lg:mt-[20px]">
//         Submit
//       </button>
//     </div>
//   </form>
//   )
// }



import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../helper/axiosInstance';
import { MessageCircle } from 'lucide-react';



export default function ChatRoom({ socket }) {


    const [result, setResult] = useState("")

    function startChat(id){
        console.log(id)
    }


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosInstance.get("/getAllUsers")
                setResult(response)

            }
            catch (error) {
                console.error(error)
            }
        }
        fetchUsers()
    }, [])


    useEffect(() => {
        console.log(result.data ? result.data.data.all_users.length : "")
    }, [result])

    return (
        <div className="p-[50px] flex flex-col flex-wrap justify-center">
            <h2 className='text-center text-xl font-bold mb-5'>List of all users</h2>
            {result.data && result.data.data.all_users.length > 0 ? (
                result.data.data.all_users.map((data, i) => (
                    <div key={data._id} className="flex bg-amber-300 hover:bg-amber-400 cursor-pointer p-4 mb-4 rounded-md shadow-md relative " onClick={()=>{startChat(data._id)}}>
                        <h2 className="text-lg font-semibold">Name: {data.fname}</h2>
                        <MessageCircle className='absolute right-[20px]'/>
                    </div>
                ))
            ) : (
                <div className="text-sm min-w-[100px] md:text-lg font-semibold text-gray-700">
                    No notes exist
                </div>
            )}

        </div>
    )
}
