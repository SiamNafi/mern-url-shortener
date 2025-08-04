import { registerUser, loginUser } from "../services/authService.js";
import { controllerWrapper } from "../utils/tryCatchWrapper.js";
import { cookieOptions } from "../config/config.js";

//register user
const register = controllerWrapper(async (req, res) => {
  const { name, email, password } = req.body;
  const token = await registerUser(name, email, password);
  res.cookie("accessToken", token, cookieOptions);
  res
    .status(200)
    .json({ success: true, message: "User registered successfully" });
});

// login a user
const login = controllerWrapper(async (req, res) => {
  const { email, password } = req.body;
  const { token, user } = await loginUser(email, password);
  req.user = user;
  res.cookie("accessToken", token, cookieOptions);
  res.status(200).json({ success: true, message: "Login successfull" });
});

export { register, login };
