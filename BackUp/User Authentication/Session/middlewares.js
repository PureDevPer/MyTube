import multer from "multer";
import routers from "./routers";

const multerVideo = multer({ dest: "uploads/videos/" });

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "MyTube";
  res.locals.routes = routers;
  res.locals.user = req.user || {};
  console.log(req.user);
  next();
};

export const uploadVideo = multerVideo.single("videoFile");
