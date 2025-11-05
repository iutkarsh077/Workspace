import { GoogleOAuthProvider } from "@react-oauth/google"
import Login from "./Login"

const AuthWrapper = () =>{
    return (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}><Login/></GoogleOAuthProvider>
    )
}
export default AuthWrapper;