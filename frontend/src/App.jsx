// import { useState } from 'react'
import Navbar from './components/Navbar/Navbar.jsx'
import Signup from './components/Signup/Signup.jsx'
import Login from './components/Login/Login.jsx'
import {BrowserRouter,Routes,Route}from "react-router-dom"



export default function App() {
  return (
    <>
        <div className='bg-[#FEF0D7] min-h-screen flex flex-col'>
        <BrowserRouter>
        <Routes>
            <Route path='/' element= {<><Navbar/><Signup/></>}></Route>
        </Routes>
        </BrowserRouter>
        </div>
   </>
    
  )
}