import { saveShortUrl } from "../dao/short_url.js";
import { createError } from "../utils/errorHandler.js";
import { generateNanoId } from "../utils/helper.js";

export const createShortUrlWithoutUserService = async (url) => {
  const shorturl = generateNanoId(7);
  await saveShortUrl(shorturl, url);
  return shorturl;
};

export const createShortUrlWithUserService = async (url, userId) => {
  const shorturl = generateNanoId(7);
  await saveShortUrl(shorturl, url, userId);
  return shorturl;
};
