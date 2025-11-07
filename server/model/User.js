import mongoose, { Schema } from "mongoose";

const User = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  picture: {
    type: String,
  },

  refreshToken: {
    type: String,
    required: true,
  },
});


const WorkspaceUser = mongoose.model("WorkspaceUser", User);
export default WorkspaceUser;