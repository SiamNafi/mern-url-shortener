import axiosInstance from "../utils/axiosInstance";

// register user api call
export const registerUser = async (name, email, password) => {
  const { data } = await axiosInstance.post("/api/auth/register", {
    name,
    email,
    password,
  });
  return data;
};

//login user api call
export const loginUser = async (email, password) => {
  const { data } = await axiosInstance.post("/api/auth/login", {
    email,
    password,
  });
  return data;
};

// get current user
export const getCurrentUser = async () => {
  const { data } = await axiosInstance.get("/api/auth/me");
  return data;
};

// logout user api call
export const logoutUser = async () => {
  const { data } = await axiosInstance("/api/auth/logout");
  return data;
};
