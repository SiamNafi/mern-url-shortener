import { getUserUrls } from "../dao/userDao.js";
import { controllerWrapper } from "../utils/tryCatchWrapper.js";

const getAllUserUrls = controllerWrapper(async (req, res) => {
  const { _id } = req.user;
  const urls = await getUserUrls(_id);
  res.status(200).json({ success: true, urls });
});

export { getAllUserUrls };
