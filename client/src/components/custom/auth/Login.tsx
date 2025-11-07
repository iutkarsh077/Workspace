import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
const Login = () => {
  const handleLogin = async (authResult: any) =>{
    try {
      if(authResult["code"]){
        const code = authResult["code"];
        const result = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/login/google-login?code=${code}`, {
          withCredentials: true
        })
        // console.log("The result is: ", result);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleResponse = useGoogleLogin({
    onSuccess: handleLogin,
    onError: handleLogin,
    flow: "auth-code"
  })
  return (
    <div className="flex justify-center items-center h-screen overflow-y-hidden">
      <p onClick={handleResponse} className="bg-linear-to-br w-60 from-gray-900 to-gray-800 text-white flex gap-x-2 items-center justify-center h-[55px] text-xl font-medium rounded-md hover:rounded-br-4xl transition-all ease-in-out duration-300 hover:cursor-pointer hover:scale-110 hover:h-[60px]"><FcGoogle className="w-8 h-auto text-white" />
      Login With Google</p>
    </div>
  )
}

export default Login
