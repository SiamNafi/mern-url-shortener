import shortUrl from "../models/shorturlModel.js";
import { createShortUrlWithoutUserService } from "../services/shortUrlServices.js";

const createUrl = async (req, res) => {
  try {
    const { url } = req.body;
    const shortUrl = await createShortUrlWithoutUserService(url);
    res.send(process.env.APP_URL + shortUrl);
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// redirect user to shorturl
const redirectUrl = async (req, res) => {
  try {
    const { id } = req.params;
    const url = await shortUrl.findOne({ short_url: id });
    if (url) {
      res.redirect(url.full_url);
    } else {
      res.status(404).send("Not Found");
    }
  } catch (error) {
    console.log("Error in redirect controller", error.message);
    res.json({ success: false, message: error.message });
  }
};

export { createUrl, redirectUrl };
