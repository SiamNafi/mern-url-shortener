import { getShortUrl } from "../dao/short_url.js";
import {
  createShortUrlWithoutUserService,
  createShortUrlWithUserService,
} from "../services/shortUrlServices.js";
import { createError } from "../utils/errorHandler.js";
import { controllerWrapper } from "../utils/tryCatchWrapper.js";

const createUrl = controllerWrapper(async (req, res, next) => {
  const data = req.body;
  let shortUrl;
  if (req.user) {
    shortUrl = await createShortUrlWithUserService(
      data.url,
      req.user._id,
      data.slug
    );
  } else {
    shortUrl = await createShortUrlWithoutUserService(data.url);
  }

  res.status(200).json({ short_Url: process.env.APP_URL + shortUrl });
});

// redirect user to shorturl
const redirectUrl = controllerWrapper(async (req, res, next) => {
  const { id } = req.params;
  const url = await getShortUrl(id);
  if (!url) {
    return next(createError("short URL not found", 404));
  }
  res.redirect(url.full_url);
});

export { createUrl, redirectUrl };
