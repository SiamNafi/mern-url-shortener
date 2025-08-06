import axiosInstance from "../utils/axiosInstance";

export const createUrl = async (url, slug) => {
  const { data } = await axiosInstance.post("/api/url/create", { url, slug });
  return data.short_Url;
};
