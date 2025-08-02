import { saveShortUrl } from "../dao/short_url.js";
import { generateNanoId } from "../utils/helper.js";

export const createShortUrlWithoutUserService = async (url) => {
  try {
    const shorturl = generateNanoId(7);
    await saveShortUrl(shorturl, url);
    return shorturl;
  } catch (error) {
    console.log("Error creating short_url", error.message);
  }
};

export const createShortUrlWithUserService = async (url, userId) => {
  try {
    const shorturl = generateNanoId(7);
    await saveShortUrl(shorturl, url, userId);
    return shorturl;
    res.json({ success: true, message: "Short URL Created" });
  } catch (error) {
    console.log("Error creating short_url", error.message);
  }
};
