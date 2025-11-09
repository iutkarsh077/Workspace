import { Router } from "express";
import GoogleLogin from "../controllers/auth/GoogleLogin.js";
import UserInfo from "../controllers/UserInfo.js";
import Auth from "../middlewares/refreshtoken.js";


const router = Router();


router.get("/auth/login/google-login", GoogleLogin);
router.get("/userinfo", Auth, UserInfo);
export default router;