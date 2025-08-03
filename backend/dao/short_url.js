import shortUrl from "../models/shorturlModel.js";

export const saveShortUrl = async (short_url, long_url, userId) => {
  const newUrl = new shortUrl({
    full_url: long_url,
    short_url: short_url,
  });
  await newUrl.save();
  if (userId) {
    newUrl.user_id = userId;
  }
  await newUrl.save();
};

export const getShortUrl = async (id) => {
  try {
    return await shortUrl.findOne({ short_url: id });
  } catch (error) {
    console.log("Error finding shorturl", error.message);
  }
};
