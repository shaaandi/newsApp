const mongoose = require("mongoose");

const Author = mongoose.model("authors");
const Reader = mongoose.model("readers");

const { checkUserInitialized, checkUserLogin } = require("../middlewares/auth");

module.exports = {
  async setUserBadge(body, req) {
    if (!checkUserLogin) return false;
    if (req.user.initialized) {
      return false;
    }
    let user;
    const badge = body.badge;
    if (badge === "READER") {
      user = await new Reader({
        googleId: req.user.id,
        badge: badge,
        initialized: true
      }).save();
      if (user) {
        req.logOut();
        return new Promise((resolve, reject) => {
          req.logIn(user, err => {
            if (err) {
              reject(err);
            }
            resolve(user);
          });
        });
      }
    } else if (badge === "AUTHOR") {
      user = await new Author({
        googleId: req.user.id,
        badge: badge,
        initialized: true
      }).save();
      if (user) {
        req.logOut();
        return new Promise((resolve, reject) => {
          req.logIn(user, err => {
            if (err) {
              reject(err);
            }
            resolve(user);
          });
        });
      }
    } else {
      return false;
    }
  }
};
