import "dotenv/config"
import { google } from "googleapis"

const googleId = process.env.GOOGLE_CLIENT_ID;
const googleSecret = process.env.GOOGLE_CLIENT_SECRET;

const google2Auth = new google.auth.OAuth2(
    googleId,
    googleSecret,
    "postmessage"
)

export default google2Auth;