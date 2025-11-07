import axios from "axios";
import google2Auth from "../../utils/Auth.js";
import jwt from "jsonwebtoken";
import WorkspaceUser from "../../model/User.js";
const GoogleLogin = async (req, res) => {
  try {
    const code = req.query.code;

    const getToken = await google2Auth.getToken(code);
    google2Auth.setCredentials(getToken.tokens);

    const userDetails = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${getToken.tokens.access_token}`
    );

    const { name, email, picture } = userDetails.data;

    const data = {
      name,
      email,
      picture,
    };

    const access_token = jwt.sign(
      {
        name,
        email,
        picture,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const refresh_token = jwt.sign(
      {
        access_token,
      },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    const findUser = await WorkspaceUser.findOne({ email });

    if (!findUser) {
      await WorkspaceUser.create({
        name,
        email,
        picture,
        refreshToken: refresh_token,
      });
    }
    if(findUser){
        await WorkspaceUser.findByIdAndUpdate(findUser.id, {
            refreshToken: refresh_token
        })
    }

    res.cookie("workspace_access_token", access_token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000 * 2,
      sameSite: "Lax",
    });
    return res
      .status(200)
      .json({ mesage: "Login Successful", data: data, status: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Authentication failed, Please try again after some time",
      status: false,
    });
  }
};

export default GoogleLogin;
