import { getCustomShortUrl, saveShortUrl } from "../dao/short_url.js";
import { createError } from "../utils/errorHandler.js";
import { generateNanoId } from "../utils/helper.js";

//create short url without user
export const createShortUrlWithoutUserService = async (url) => {
  const shorturl = generateNanoId(7);
  await saveShortUrl(shorturl, url);
  return shorturl;
};

// create short url wiht user
export const createShortUrlWithUserService = async (
  url,
  userId,
  slug = null
) => {
  const shorturl = slug || generateNanoId(7);
  const exist = await getCustomShortUrl(slug);
  if (exist) {
    throw createError("This custom url already exist", 409);
  }
  await saveShortUrl(shorturl, url, userId);
  return shorturl;
};
