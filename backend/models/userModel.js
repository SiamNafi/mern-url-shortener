import mongoose from "mongoose";
import { getGravatarUrl } from "../utils/gravatar.js";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: function () {
      return getGravatarUrl(this.email);
    },
  },
});

const User = mongoose.model("User", userSchema);

export default User;
