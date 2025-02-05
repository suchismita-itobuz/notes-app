import navbarLogo from "../../assets/book.png"


export default function Navbar() {
    return (
        <div className="flex justify-start items-center bg-purple-900">
            <img src={navbarLogo} className="h-[70px] w-[70px] ml-[15px] p-[10px] lg:ml-[20px]"></img>
            <h2 className="font-serif text-lg italic text-[#FFD789] md:text-2xl lg:text-[30px] ml-[10px]">Note It Down</h2>
        </div>
    )
}