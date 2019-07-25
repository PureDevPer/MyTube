import passport from "passport";
import routes from "../routers";
import User from "../models/User";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "join" });
};
export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 }
  } = req;

  if (password !== password2) {
    req.flash("error", `Passwords don't match`);
    res.status(400);
    res.render("join", { pageTitle: "join" });
  } else {
    // To Do: Register User
    // To Do: Log user in

    try {
      const user = await User({
        name,
        email
      });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "login" });

export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
  successFlash: "Welcome",
  failureFlash: "Can't log in. Check email and/or password"
});

export const githubLogin = passport.authenticate("github", {
  successFlash: "Welcome",
  failureFlash: "Can't log in at this time"
});

export const githubLoginCallback = async (_, __, profile, cb) => {
  // console.log(accessToken, refreshToken, profile, cb);
  const {
    _json: { id, avatar_url: avatarUrl, name, email }
  } = profile;

  try {
    const user = await User.findOne({ email });
    // console.log(user);
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      githubId: id,
      avatarUrl
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postGithubLogIn = (req, res) => {
  res.redirect(routes.home);
};

export const facebookLogin = passport.authenticate("facebook", {
  successFlash: "Welcome",
  failureFlash: "Can't log in at this time"
});

export const facebookLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, name, email }
  } = profile;
  // console.log(accessToken, refreshToken, profile, cb);
  try {
    const user = await User.findOne({ email });
    // console.log(user);
    if (user) {
      user.facebookId = id;
      user.avatarUrl = `https://graph.facebook.com/${id}/picture?type=large`;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      facebookId: id,
      avatarUrl: `https://graph.facebook.com/${id}/picture?type=large`
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postFacebookLogin = (req, res) => {
  res.redirect(routes.home);
};

export const googleLogin = passport.authenticate("google", {
  scope: ["profile"]
});

export const googleLoginCallback = async (_, __, profile, cb) => {
  // console.log(profile);
  const {
    _json: { sub, name, picture }
  } = profile;
  console.log(sub, name, picture);
  try {
    const user = await User.findOne({ sub });
    // console.log(user);
    if (user) {
      user.googleId = sub;
      user.save();
      return cb(null, user);
    }

    const newUser = await User.create({
      googleId: sub,
      name,
      avatarUrl: picture
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postGoogleLogin = (req, res) => {
  res.redirect(routes.home);
};

export const linkedinLogin = passport.authenticate("linkedin", {
  state: "SOME STATE"
});

export const linkedinLoginCallback = async (_, __, profile, cb) => {
  // console.log(profile);
  const { id, displayName, photos, emails } = profile;
  // console.log(id, displayName, emails[0].value, photos[0].value);
  const email = emails[0].value;
  const photo = photos[0].value;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.linkedInId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name: displayName,
      linkedInId: id,
      avatarUrl: photo
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postLinkedInLogin = (req, res) => {
  res.redirect(routes.home);
};

export const instagramLogin = passport.authenticate("instagram");

export const instagramLoginCallback = async (_, __, profile, cb) => {
  // console.log(profile);
  const {
    _json: {
      data: { id, username, profile_picture, full_name }
    }
  } = profile;

  // console.log(id, username, profile_picture, full_name);

  const instagramUserID = username;
  const avatarUrl = profile_picture;
  const name = full_name;
  const instagramID = id;

  try {
    const user = await User.findOne({ instagramUserID });
    if (user) {
      user.instagramId = instagramID;
      user.save();
      return cb(null, user);
    }

    const newUser = await User.create({
      instagramId: instagramID,
      name,
      avatarUrl
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postInstagramLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  req.flash("info", "Logged out, see you later");
  req.logout();
  res.redirect(routes.home);
};

export const getMe = async (req, res) => {
  try {
    const {
      user: { id }
    } = req;
    const user = await User.findById(id).populate("videos");
    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const userDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const user = await User.findById(id).populate("videos");
    console.log(user);
    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch (error) {
    req.flash("error", "User not found");
    res.redirect(routes.home);
  }
};
export const getEditProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });

export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file
  } = req;
  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: file ? file.location : req.user.avatarUrl
    });
    req.flash("success", "Profile updated");
    res.redirect(routes.me);
  } catch (error) {
    req.flash("error", "Can't update profile");
    res.redirect(routes.editProfile);
  }
};

export const getChangePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword1 }
  } = req;

  try {
    if (newPassword !== newPassword1) {
      req.flash("error", "Passwords don't match");
      res.status(400);
      res.redirect(`/users/${routes.changePassword}`);
      return;
    }
    await req.user.changePassword(oldPassword, newPassword);
    res.redirect(routes.me);
  } catch (error) {
    req.flash("error", "Can't change password");
    res.status(200);
    res.redirect(`/users/${routes.changePassword}`);
  }
};
