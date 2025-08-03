import { getShortUrl } from "../dao/short_url.js";
import { createShortUrlWithoutUserService } from "../services/shortUrlServices.js";
import { createError } from "../utils/errorHandler.js";

const createUrl = async (req, res, next) => {
  try {
    const { url } = req.body;
    const shortUrl = await createShortUrlWithoutUserService(url);
    res.send(process.env.APP_URL + shortUrl);
  } catch (error) {
    next(error);
  }
};

// redirect user to shorturl
const redirectUrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    const url = await getShortUrl(id);
    if (!url) {
      return next(createError("short URL not found", 404));
    }
    res.redirect(url.full_url);
  } catch (error) {
    next(error);
  }
};

export { createUrl, redirectUrl };
