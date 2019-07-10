import express from "express";
import passport from "passport";
import routes from "../routers";
import { home, search } from "../controllers/videoController";
import {
  logout,
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  githubLogin,
  postGithubLogIn,
  getMe,
  facebookLogin,
  postFacebookLogin,
  googleLogin,
  postGoogleLogin,
  linkedinLogin,
  postLinkedInLogin
} from "../controllers/userController";
import { onlyPublic, onlyPrivate } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.joins, onlyPublic, getJoin);
globalRouter.post(routes.joins, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, onlyPrivate, logout);

globalRouter.get(routes.gitHub, githubLogin);

globalRouter.get(
  routes.githubCallback,
  passport.authenticate("github", { failureRedirect: "/login" }),
  postGithubLogIn
);

globalRouter.get(routes.me, getMe);

globalRouter.get(routes.facebook, facebookLogin);
globalRouter.get(
  routes.facebookCallback,
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  postFacebookLogin
);

globalRouter.get(routes.google, googleLogin);
globalRouter.get(
  routes.googleCallback,
  passport.authenticate("google", { failureRedirect: "/login" }),
  postGoogleLogin
);

globalRouter.get(routes.linkedin, linkedinLogin);
globalRouter.get(
  routes.linkedinCallback,
  passport.authenticate("linkedin", { failureRedirect: "/login" }),
  postLinkedInLogin
);

export default globalRouter;
