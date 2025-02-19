import { AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Not_found() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <AlertCircle className="w-16 h-16 text-red-500" />
      <h1 className="text-4xl font-bold mt-4">404 - Page Not Found</h1>
      <p className="text-gray-600 mt-2">The page you are looking for does not exist.</p>
      <Link  to="/">
        <button className="bg-amber-500 hover:bg-amber-700 hover:text-white px-4 py-2 rounded-md mt-[20px]">Go Home</button>
      </Link>
    </div>
  );
}

