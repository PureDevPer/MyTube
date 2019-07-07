import express from "express";
import routes from "../routers";
import {
  postRegisterView,
  postAddComment,
  postRemoveComment
} from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterView);
apiRouter.post(routes.addComment, postAddComment);
apiRouter.post(routes.removecomment, postRemoveComment);

export default apiRouter;
