import { Router } from "express";
import GoogleLogin from "../controllers/auth/GoogleLogin.js";

const router = Router();


router.get("/auth/login/google-login", GoogleLogin);
export default router;