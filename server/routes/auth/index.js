const passport = require("passport");

const mongoose = require("mongoose");
const Author = mongoose.model("authors");
const Reader = mongoose.model("readers");

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      if (req.user.badge === "NOT_INITIALIZED") {
        res.redirect("/user/initialze");
      } else {
        res.redirect("/");
      }
    }
  );

  app.post("/auth/setUserBadge", async (req, res) => {
    if (req.user.initialized) {
      return res.send("Already Initialized").status(404);
    }
    let user;
    const badge = req.body.badge;
    if (badge === "AUTHOR") {
      user = await new Author({
        googleId: req.user.id,
        badge,
        initialized: true
      }).save();
      if (user) {
        req.logOut();
        req.login(user, function(err) {
          if (err) {
            return next(err);
          }
          return res.send(user);
        });
      }
    } else if (badge === "READER") {
      user = await new Reader({
        googleId: req.user.id,
        badge,
        initialized: true
      }).save();
      if (user) {
        req.logOut();
        req.login(user, function(err) {
          if (err) {
            return next(err);
          }
          return res.send(user);
        });
      }
    }
  });
};
