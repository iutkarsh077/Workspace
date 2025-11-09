import WorkspaceUser from "../model/User.js";

async function UserInfo(req, res){
    try {
        console.log(req.user);
        const findUser = await WorkspaceUser.findById(req.user).select("name email picture");

        console.log(findUser);

        return res.status(200).json({message: "User is verified", data: findUser, status: true});
    } catch (error) {
        return res.status(500).json({status: false, message: "Internal Server error"});
    }
}

export default UserInfo;