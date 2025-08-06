import { registerUser, loginUser } from "../services/authService.js";
import { controllerWrapper } from "../utils/tryCatchWrapper.js";
import { cookieOptions } from "../config/config.js";

//register user
const register = controllerWrapper(async (req, res) => {
  const { name, email, password } = req.body;
  const { token, newUser } = await registerUser(name, email, password);
  const { password: _, ...safeuser } = newUser.toObject()
    ? newUser.toObject()
    : newUser;
  res.cookie("accessToken", token, cookieOptions);
  res.status(200).json({
    user: safeuser,
    success: true,
    message: "User registered successfully",
  });
});

// login a user
const login = controllerWrapper(async (req, res) => {
  const { email, password } = req.body;
  const { token, user } = await loginUser(email, password);
  const { password: _, ...safeuser } = user.toObject() ? user.toObject() : user;
  req.user = safeuser;
  res.cookie("accessToken", token, cookieOptions);
  res
    .status(200)
    .json({ user: safeuser, success: true, message: "Login successfull" });
});

//get current user
const getCurrentUser = controllerWrapper(async (req, res) => {
  const user = req.user;
  const { password: _, ...safeuser } = user.toObject() ? user.toObject() : user;
  res.status(200).json({ user: safeuser });
});

//logout a user
const logoutUser = controllerWrapper(async (req, res) => {
  res.clearCookie("accessToken", cookieOptions);
  res.status(200).json({ success: true, message: "Logged out successfully" });
});

export { register, login, getCurrentUser, logoutUser };
