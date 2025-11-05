import axios from "axios";
import google2Auth from "../../utils/Auth.js";

const GoogleLogin = async (req, res) =>{
    try {
        const code = req.query.code;

        const getToken = await google2Auth.getToken(code);
        google2Auth.setCredentials(getToken.tokens);

        const userDetails = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${getToken.tokens.access_token}`);

        const {name, email, picture} = userDetails.data;
        // console.log(name, email, picture);

        const data = {
            name,
            email,
            picture
        }

        return res.status(200).json({mesage: "Login Successfull", data: data, status: true})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Authentication failed, Please try again after some time", status: false});
    }
}

export default GoogleLogin;