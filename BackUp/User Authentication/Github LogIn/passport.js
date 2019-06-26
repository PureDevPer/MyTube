import passport from "passport";
import GithubStrategy from "passport-github";
import routes from "./routers";
import User from "./models/User";
import { githubLoginCallback } from "./controllers/userController";

passport.use(User.createStrategy());

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://localhost:5000${routes.githubCallback}`
    },
    githubLoginCallback
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
