const passport = require("passport");
const mongoose = require("mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../keys/dev.js");

// Requiring all three types of users we have yet.
const Author = mongoose.model("authors");
const Reader = mongoose.model("readers");

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
    default:
      return done(null, cookieBucket);
  }
});

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
      // if the function reaches here , it means its a new user, so we will setup a signup status
      done(null, {
        id: profile.id,
        badge: "NOT_INITIALIZED",
        initialized: false
      });
    }
  )
);
