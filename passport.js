import passport from "passport";
import GithubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";
import Google from "passport-google-oauth20";
import LinkedIn from "passport-linkedin-oauth2";
import routes from "./routers";
import User from "./models/User";
import {
  githubLoginCallback,
  facebookLoginCallback,
  googleLoginCallback,
  linkedinLoginCallback
} from "./controllers/userController";

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

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_ID,
      clientSecret: process.env.FB_SECRET,
      callbackURL: `https://soft-bat-45.localtunnel.me${routes.facebookCallback}`,
      profileFields: ["id", "displayName", "photos", "email"],
      scope: ["public_profile", "email"]
    },
    facebookLoginCallback
  )
);

const GoogleStrategy = Google.Strategy;
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GG_ID,
      clientSecret: process.env.GG_SECRET,
      callbackURL: `http://localhost:5000${routes.googleCallback}`
    },
    googleLoginCallback
  )
);

const LinkedInStrategy = LinkedIn.Strategy;
passport.use(
  new LinkedInStrategy(
    {
      clientID: process.env.LI_ID,
      clientSecret: process.env.LI_SECRET,
      callbackURL: `http://localhost:5000${routes.linkedinCallback}`,
      scope: ["r_emailaddress", "r_liteprofile"]
    },
    linkedinLoginCallback
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
