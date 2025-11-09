import { Router } from "express";
import GoogleLogin from "../controllers/auth/GoogleLogin.js";
import Auth from "../middlewares/refreshtoken.js";

const router = Router();


router.get("/auth/login/google-login", Auth, GoogleLogin);
export default router;