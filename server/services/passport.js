const passport = require("passport");
const mongoose = require("mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const keys = require("../keys");

// Requiring all three types of users we have yet.
const Author = mongoose.model("authors");
const Reader = mongoose.model("readers");
const ContentManager = mongoose.model("contentManagers");

passport.serializeUser((user, done) => {
  let cookieBucket = {
    id: user.id,
    badge: user.badge,
    initialized: user.initialized
  };
  done(null, cookieBucket);
});

passport.deserializeUser(async (cookieBucket, done) => {
  switch (cookieBucket.badge) {
    case "AUTHOR":
      return done(null, await Author.findById(cookieBucket.id));
    case "READER":
      return done(null, await Reader.findById(cookieBucket.id));
    case "CONTENT_MANAGER":
      return done(null, await ContentManager.findById(cookieBucket.id));
    default:
      return done(null, cookieBucket);
  }
});

passport.use(
  new LocalStrategy(
    { usernameField: "username" },
    async (username, password, done) => {
      let userType = null;
      // determining the userType first ;
      let author = await Author.findOne({ username });
      let reader = await Reader.findOne({ username });
      let contentManager = await ContentManager.findOne({ username });
      if (author) userType = "Author";
      if (reader) userType = "Reader";
      if (contentManager) userType = "ContentManager";
      // if nothing comes true that means its not a user the user needs to signup;
      if (!userType) return done(null, false, "Invalid Credentials");
      switch (userType) {
        case "Author":
          // we already have author if this case is true;
          author.comparePassword(password, (err, isMatch) => {
            if (err) {
              return done(err);
            }
            if (isMatch) {
              return done(null, author);
            }
            return done(null, false, "Invalid Credientials");
          });
        case "Reader":
          reader.comparePassword(password, (err, isMatch) => {
            if (err) {
              return done(err);
            }
            if (isMatch) {
              return done(null, reader);
            }
            return done(null, false, "Invalid Credientials");
          });
        case "ContentManager":
          contentManager.comparePassword(password, (err, isMatch) => {
            if (err) {
              return done(err);
            }
            if (isMatch) {
              return done(null, contentManager);
            }
            return done(null, false, "Invalid Credientials");
          });
      }
      // if its a existing username , then we can authenticate the user;
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      if (mongoose.connection.readyState == 0) console.log("DB not connected");

      let existingUser = await Author.findOne({ googleId: profile.id });
      if (existingUser) return done(null, existingUser);
      // or its Reader
      let existingUser2 = await Reader.findOne({ googleId: profile.id });
      if (existingUser2) return done(null, existingUser2);

      let existingUser3 = await ContentManager.findOne({
        googleId: profile.id
      });
      if (existingUser3) return done(null, existingUser3);
      // if the function reaches here , it means its a new user, so we will setup a signup status
      done(null, {
        id: profile.id,
        badge: "NOT_INITIALIZED",
        initialized: false
      });
    }
  )
);
