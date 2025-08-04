import ShortUrl from "../models/shorturlModel.js";
import { createError } from "../utils/errorHandler.js";

//save short url
export const saveShortUrl = async (short_url, long_url, userId) => {
  try {
    //check if short url already exist
    const shorturlExist = await ShortUrl.findOne({ short_url: short_url });
    if (shorturlExist) {
      throw createError("short URL already exist", 400);
    }
    const newUrl = new ShortUrl({
      full_url: long_url,
      short_url: short_url,
    });
    if (userId) {
      newUrl.user = userId;
    }
    await newUrl.save();
  } catch (error) {
    throw createError(error.message || "Failed to save short_url", 500);
  }
};

//get short url
export const getShortUrl = async (id) => {
  try {
    const url = await ShortUrl.findOneAndUpdate(
      { short_url: id },
      { $inc: { clicks: 1 } }
    );
    if (!url) {
      throw createError("short URL not found", 404);
    }
    return url;
  } catch (error) {
    throw createError(error.message || "Failed to fetch short URL", 500);
  }
};

//get custom url
export const getCustomShortUrl = async (slug) => {
  return await ShortUrl.findOne({ short_url: slug });
};
