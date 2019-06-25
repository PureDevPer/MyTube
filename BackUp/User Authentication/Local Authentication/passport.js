import passport from "passport";
import User from "./models/User";

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// http://www.passportjs.org/docs/username-password/
// Serialization: Which fields include
// https://github.com/saintedlama/passport-local-mongoose
