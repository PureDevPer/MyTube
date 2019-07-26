import passport from "passport";
import GithubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";
import Instagram from "passport-instagram";
import Google from "passport-google-oauth20";
import LinkedIn from "passport-linkedin-oauth2";
import routes from "./routers";
import User from "./models/User";
import {
  githubLoginCallback,
  facebookLoginCallback,
  googleLoginCallback,
  linkedinLoginCallback,
  instagramLoginCallback
} from "./controllers/userController";

passport.use(User.createStrategy());

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: process.env.PRODUCTION
        ? `https://peaceful-lake-16104.herokuapp.com${routes.githubCallback}`
        : `http://localhost:5000${routes.githubCallback}`
    },
    githubLoginCallback
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_ID,
      clientSecret: process.env.FB_SECRET,
      callbackURL: process.env.PRODUCTION
        ? `https://peaceful-lake-16104.herokuapp.com${routes.facebookCallback}`
        : `http://localhost:5000${routes.facebookCallback}`,
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
      callbackURL: process.env.PRODUCTION
        ? `https://peaceful-lake-16104.herokuapp.com${routes.googleCallback}`
        : `http://localhost:5000${routes.googleCallback}`
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
      callbackURL: process.env.PRODUCTION
        ? `https://peaceful-lake-16104.herokuapp.com${routes.linkedinCallback}`
        : `http://localhost:5000${routes.linkedinCallback}`,
      scope: ["r_emailaddress", "r_liteprofile"]
    },
    linkedinLoginCallback
  )
);

const InstagramStrategy = Instagram;
passport.use(
  new InstagramStrategy(
    {
      clientID: process.env.IG_ID,
      clientSecret: process.env.IG_SECRET,
      callbackURL: process.env.PRODUCTION
        ? `https://peaceful-lake-16104.herokuapp.com${routes.instagramCallback}`
        : `http://localhost:5000${routes.instagramCallback}`
    },
    instagramLoginCallback
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/*
const userSerialize = User.serializeUser();
const userDeserialize = User.deserializeUser();
passport.serializeUser(function(userSerialize, done) {
  // console.log(`User: ${userSerialize}`);
  done(null, userSerialize);
});

passport.deserializeUser(function(userDeserialize, done) {
  // console.log(userDeserialize);
  done(null, userDeserialize);
});
*/
