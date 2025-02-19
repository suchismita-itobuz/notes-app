import Navbar from './components/Navbar/Navbar.jsx'
import Signup from './components/Signup/Signup.jsx'
import Login from './components/Login/Login.jsx'
import {Routes,Route}from "react-router-dom"
import Verify from './components/User_Verification/Verify.jsx'
import NotesMainPage from './components/Notes_Main_Page/Notes_Main_Page.jsx'
import Not_found from './components/Not_found/Not_found.jsx'





export default function App() {
  
  return (
    <>
        <div className='bg-[#FEF0D7] min-h-screen flex flex-col'>
        <Routes>
            <Route path='/' element= {<><Navbar/><Signup/></>}></Route>
            <Route path="/verify/:token" element={<><Navbar/><Verify/></>}></Route>
            <Route path="/login" element={<><Navbar/><Login/></>}></Route>
            <Route path="/Notes" element={<NotesMainPage/>}></Route>
            <Route path="/not-found" element={<><Navbar/><Not_found/></>}></Route>
        </Routes>
        </div>
   </>
    
  )
}