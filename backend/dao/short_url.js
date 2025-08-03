import shortUrl from "../models/shorturlModel.js";
import { createError } from "../utils/errorHandler.js";

export const saveShortUrl = async (short_url, long_url, userId) => {
  try {
    //check if short url already exist
    const exist = await shortUrl.findOne({ full_url: long_url });
    if (exist) {
      throw createError("Short URL already exist", 400);
    }

    const newUrl = new shortUrl({
      full_url: long_url,
      short_url: short_url,
    });
    if (userId) {
      newUrl.user_id = userId;
    }
    await newUrl.save();
  } catch (error) {
    throw createError(error.message || "Failed to save short_url", 500);
  }
};

export const getShortUrl = async (id) => {
  return await shortUrl.findOneAndUpdate(
    { short_url: id },
    { $inc: { clicks: 1 } }
  );
};
