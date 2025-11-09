import "dotenv/config";
import jwt from "jsonwebtoken";
import WorkspaceUser from "../model/User";
async function Auth(req, res, next) {
  try {
    const access_token = req.cookies.workspace_access_token;

    if (access_token) {
      try {
        const verifiedAccessToken = jwt.verify(
          access_token,
          process.env.JWT_SECRET
        );
        req.user = verifiedAccessToken.id;
        return next();
      } catch (error) {}
    }
    const refresh_token = req.cookies.workspace_refresh_token;
    if (!refresh_token) {
      return res
        .status(401)
        .json({ message: "Unauthorized access denied", statu: false });
    }

    let decodedRefresh;
    try {
      decodedRefresh = jwt.verify(
        refresh_token,
        process.env.JWT_REFRESH_SECRET
      );
    } catch (err) {
      return res
        .status(401)
        .json({ message: "Invalid refresh token", status: false });
    }

    const user = await WorkspaceUser.findById(decodedRefresh.id);

    if (!user || user.refreshToken !== refresh_token) {
      return res
        .status(401)
        .json({ message: "Refresh token mismatch", status: false });
    }

    const newAccessToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.cookie("workspace_access_token", newAccessToken, {
      httpOnly: false,
      maxAge: 60 * 60 * 1000 * 2,
      sameSite: "Lax",
    });
    req.user = { id: user.id };

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized access denied", status: false });
  }
}

export default Auth;
