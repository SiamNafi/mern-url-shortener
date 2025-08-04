import axiosInstance from "../utils/axiosInstance";

export const createUrl = async (url) => {
  const { data } = await axiosInstance.post("/api/url/create", { url });
  return data.short_Url;
};
