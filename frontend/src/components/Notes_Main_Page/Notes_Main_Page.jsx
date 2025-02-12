import { useState, useEffect } from "react";
import { Menu, X, CirclePlus} from "lucide-react";
import navbarLogo from "../../assets/book.png"
import man from "../../assets/man.jpg"

export default function NotesMainPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const fname = "Suchismita"
  

  useEffect(() => {
    // I will fetch notes from API
  }, []);

  return (
    <div className="min-h-screen bg-beige">
      {/* Navbar */}
      <nav className="bg-purple-900 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src={navbarLogo} alt="Logo" className="h-[70px] w-[70px] ml-[15px] p-[10px] lg:ml-[20px]" />
          <span className="font-serif text-lg italic text-[#FFD789] md:text-2xl lg:text-[30px] ml-[10px]">Note It Down</span>
        </div>
        {/* Desktop View */}
        <div className="hidden md:flex items-center space-x-6">
          <span className="text-lg font-serif text-[#FFD789] md:text-2xl lg:text-[30px] cursor-pointer">My Notes</span>
        </div>

          <div className="hidden md:flex items-center space-x-2 cursor-pointer">
            <img src={man} alt="Profile Pic" className="h-[70px] w-[70px] ml-[15px] p-[10px] lg:ml-[20px] rounded-full" />
            <span className="font-serif text-lg italic text-[#FFD789] md:text-2xl lg:text-[30px] pr-[10px]">{fname}</span>
          </div>
       
        {/* Mobile View */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} color="#FFD789" className="mr-[10px]"/> : <Menu size={24} color="#FFD789" className="mr-[10px]"/>}
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-purple-800 text-white text-center p-4 space-y-3">
          <span className="text-lg font-serif text-[#FFD789] block cursor-pointer">My Notes</span>
          <div className="flex flex-col items-center cursor-pointer">
            <img src={man} alt="Profile Pic" className="h-10 w-10 rounded-full" />
            <span className="font-serif text-lg italic text-[#FFD789] ">{fname}</span>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto p-6">
        {/* Search Bar */}
        <div className="flex flex-col space-y-3 md:flex-row justify-center md:space-x-2 md:space-y-0 mb-6">
          <input
            type="text"
            placeholder="Search notes..."
            className="border p-2 rounded-md w-full md:w-2/3"
          />
          <button className="bg-amber-500 hover:bg-amber-700 hover:text-white px-4 py-2 rounded-md">Submit</button>
        </div>

        {/* Add Note Button */}
        <div className="flex justify-center mb-6">
          <button className="bg-yellow-500 px-4 py-2 rounded-md hover:bg-yellow-600 hover:text-white flex group">
            Add Note <CirclePlus size={24} className="ml-[10px] text-green-700 group-hover:text-green-400 "/>
          </button>
        </div>
      </div>
    </div>
  );
}
