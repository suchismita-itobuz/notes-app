import React from 'react'
import { MessageCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Chat() {
    const navigate = useNavigate();
    async function chatRoom(){
        navigate("/chatRoom")
    }
  return (
    <div><MessageCircle className='w-[60px] h-[60px] text-black-500 absolute bottom-[50px] right-[50px] cursor-pointer' fill='black' onClick={chatRoom}/></div>
  )
}
