import { MoveLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 overflow-y-hidden px-4">
      <div className="bg-white shadow-md rounded-xl w-full max-w-5xl min-h-[70vh] flex flex-col-reverse md:flex-row-reverse items-center justify-center gap-y-3 md:gap-y-0">
        
        <div className="w-full md:w-1/2 flex justify-center items-center p-6">
          <img
            src="/television404.jpg"
            alt="404"
            className="w-auto h-56 md:h-72 object-contain"
          />
        </div>

        <div className="w-full md:w-1/2  flex justify-center text-center md:text-left">
          <div className="space-y-4">
            <h1 className="font-bold text-5xl text-gray-800">Oops!</h1>
            <p className="text-lg font-semibold text-gray-500 leading-snug">
              We couldn't find the page <br /> you are looking for.
            </p>
            <Button
              className="px-6 py-5 rounded-full flex gap-x-2 items-center font-medium hover:cursor-pointer transition-all text-center w-full md:max-w-fit duration-300 ease-in-out hover:scale-105"
              onClick={() => navigate("/")}
            >
              <MoveLeft className="w-5 h-5" />
              Go Home
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}
