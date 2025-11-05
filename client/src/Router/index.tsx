import App from "@/App"
import AuthWrapper from "@/components/custom/auth/AuthWrapper";
import Signup from "@/components/custom/auth/Signup"
import Home from "@/components/custom/Home"
import NotFound from "@/components/custom/NotFound"
import { Route } from "react-router-dom"
import { Routes } from "react-router-dom"

const Router = () =>{
    return (
        <Routes>
            <Route path="/" element={<App/>}>
                <Route index={true} element={<Home/>}/>
            </Route>
            <Route path="/login" element={<AuthWrapper/>}/>
            <Route path="/register" element={<Signup/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    )
}

export default Router;