
import { useState, useEffect } from "react";
import { Menu, X, CirclePlus, ChevronRight, ChevronLeft, Trash2, Pencil, Eye} from "lucide-react";
import navbarLogo from "../../assets/book.png";
import man from "../../assets/man.jpg";
import axios from "axios";
import AddNoteModal from "../../components/AddNoteModal/AddNoteModal.jsx";


export default function NotesMainPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [fname, setFname] = useState("");
  const [result, setResult] = useState([]);
  const [sortBy, setSortBy] = useState("desc")
  const [did_user_search, setDid_User_Search] = useState(false)
  const [search_result,setSearch_results] = useState([])
  const [pageNum,setPageNum] =useState(1)
  const [UpdatedPageNum,setUpdatedPageNum] = useState(0)
  const [leftdisablebtn,setLeftDisableBtn] = useState(false)
  const [rightdisablebtn,setRightDisableBtn] = useState(false)
  const [max_limit,setMax_limit] = useState(null)
  const [openModal, setOpenModal] = useState(true);

  const token = localStorage.getItem("accessToken");


  

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:4000/notes/getUser", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFname(response.data.data.user[0].fname);
      } catch (error) {
        // console.error(error);
      }
    };
    if (token) fetchUser();
  }, [token]);

  useEffect(()=>{
    setUpdatedPageNum(pageNum-1)
  },[pageNum])

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        
        const response = await axios.get(`http://localhost:4000/notes/ShowAllNotes?sortBy=${sortBy}&pageNum=${UpdatedPageNum}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setResult(response.data.data.note);
        setMax_limit(response.data.data.max_limit);
        setDid_User_Search(false)
        console.log(response.data.data.note)
        console.log("with api call",UpdatedPageNum)
      } catch (error) {
        // console.error(error);
      }
    };
    if (token) fetchNotes();
  }, [token, sortBy,UpdatedPageNum]);

  async function searchNotes(e) {
    setDid_User_Search(true)
    e.preventDefault()
    const search_query = e.target.search.value
    // console.log(search_query)
    e.target.search.value = ""
    if (token) {
      const response = await axios.post("http://localhost:4000/notes/search",
        { search_query }, { headers: { Authorization: `Bearer ${token}` } }
      )
      setSearch_results(response.data.data)
      // console.log(response)
      
    }

  }

  useEffect(()=>{
    if(pageNum<=1){
      setLeftDisableBtn(true)
      setRightDisableBtn(false)
    }
    if(pageNum>1){
      setLeftDisableBtn(false)
    }
    if(pageNum===max_limit){
      setRightDisableBtn(true)
    }
  },[pageNum,max_limit])

  function Previous_page(){
    setPageNum(pageNum-1)
  }
  function Next_page(){
    setPageNum(pageNum+1)
  }
  

  
  return (
    <>
      <div className="min-h-screen bg-beige">
        {/* Navbar */}
        <nav className="bg-purple-900 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src={navbarLogo} alt="Logo" className="h-[50px] w-[50px] ml-[15px] p-[10px] lg:ml-[20px]" />
            <span className="font-serif text-lg italic text-[#FFD789] md:text-2xl lg:text-[20px] ml-[10px]">Note It Down</span>
          </div>

          {/* Desktop View */}
          <div className="hidden md:flex items-center space-x-6">
            <span className="font-serif text-lg italic text-[#FFD789] md:text-2xl lg:text-[20px] cursor-pointer">My Notes</span>
          </div>

          <div className="hidden md:flex items-center space-x-2 cursor-pointer">
            <img src={man} alt="Profile Pic" className="h-[50px] w-[50px] ml-[15px] p-[10px] lg:ml-[20px] rounded-full" />
            <span className="font-serif text-lg italic text-[#FFD789] md:text-2xl lg:text-[20px] pr-[10px]">Hi {fname}</span>
          </div>

          {/* Mobile View */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} color="#FFD789" className="mr-[10px]" /> : <Menu size={24} color="#FFD789" className="mr-[10px]" />}
          </button>
        </nav>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-purple-800 text-white text-center p-4 space-y-3">
            <span className="text-lg font-serif text-[#FFD789] block cursor-pointer">My Notes</span>
            <div className="flex flex-col items-center cursor-pointer">
              <img src={man} alt="Profile Pic" className="h-10 w-10 rounded-full" />
              <span className="font-serif text-lg italic text-[#FFD789]">{fname}</span>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="container mx-auto p-6">
          {/* Search Bar */}
          <form onSubmit={searchNotes}>
            <div className="flex flex-col space-y-3 md:flex-row justify-center md:space-x-2 md:space-y-0 mb-6">
              <input type="textarea" placeholder="Search notes by title..." className="border p-2 rounded-md w-full md:w-2/3" name="search" />
              <button className="bg-amber-500 hover:bg-amber-700 hover:text-white px-4 py-2 rounded-md">Submit</button>
            </div>
          </form>

          {/* Add Note Button */}
          <div className="flex justify-center mb-6">
            <button className="bg-yellow-500 px-4 py-2 rounded-md hover:bg-yellow-600 hover:text-white flex group"  onClick={() => setOpenModal(true)}>
              Add Note <CirclePlus size={24} className="ml-[10px] text-green-700 group-hover:text-green-400" />
            </button>

      <AddNoteModal openModal={openModal} setOpenModal={setOpenModal}/>
          </div>

          {/* Dropdown Menu For Sorting Notes */}

          <div className="flex justify-center">
            <select className="bg-amber-500 hover:bg-amber-700 hover:text-white rounded-full p-[10px] text-sm" onChange={(e) => { setSortBy(e.target.value) }}>
              <option value="desc">Sort By:Newest first</option>
              <option value="asc">Sort By:Oldest first</option>
              <option value="title">Sort By:Title</option>
            </select>
          </div>

          {/* Notes Section */}
          <div className="p-[50px] flex flex-wrap justify-center gap-10">
            {!did_user_search ? (
              result.length > 0 ? (
                result.map((data, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-3 bg-amber-300 hover:bg-amber-400 cursor-pointer p-4 mb-4 h-[200px] w-[200px] rounded-md shadow-md relative"
                  >
                    <h2 className="text-lg font-semibold">Title: {data.title}</h2>
                    <p className="text-sm">Content: {data.content}</p>
                    <div className="flex gap-3 absolute bottom-[20px] right-[20px]"><Trash2 /><Pencil /><Eye /></div>
                  </div>
                ))
              ) : (
                <div className="text-sm min-w-[100px] md:text-lg font-semibold text-gray-700">
                  No notes exist
                </div>
              )
            ) : (
              <div className="text-lg font-semibold text-gray-700 p-[50px] flex flex-wrap justify-center gap-10">
                {
               search_result.length > 0 ? (
                search_result.map((data, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-3 bg-amber-300 hover:bg-amber-400 cursor-pointer p-4 mb-4 h-[200px] w-[200px] rounded-md shadow-md"
                  >
                    <h2 className="text-lg font-semibold">Title: {data.title}</h2>
                    <p className="text-sm">Content: {data.content}</p>
                  </div>
                ))
              ) : (
                <div className="text-sm min-w-[100px] md:text-lg font-semibold text-gray-700">
                No notes exist based on this search
              </div>
              )
            }
              </div>
            )}
          </div>
          <div className="flex justify-center items-center text-green-600"><button onClick={Previous_page} disabled={leftdisablebtn}><ChevronLeft/></button>{pageNum}<button onClick={Next_page} disabled={rightdisablebtn}><ChevronRight/></button></div>
        </div>
     
      </div>
     
    </>
  );
}




