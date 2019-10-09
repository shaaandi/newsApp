const mongoose = require("mongoose");
const passport = require("passport");
const Author = mongoose.model("authors");
const Reader = mongoose.model("readers");
const ContentManager = mongoose.model("contentManagers");
const { checkUserInitialized, checkUserLogin } = require("../middlewares/auth");

const helper_isUsernameUnique = async username => {
  let author = await Author.findOne({ username });
  let contentManager = await ContentManager.findOne({ username });
  let reader = await Reader.findOne({ username });
  if (contentManager) return false;
  else if (author) return false;
  else if (reader) return false;
  else return true;
};

module.exports = {
  async setUserBadge(body, req) {
    if (!checkUserLogin) return false;

    if (req.user.initialized) {
      return false;
    }
    let user;
    const { badge, username } = body;
    // ensuring username uniqueness across all user types ;
    let uniqueUsername = await helper_isUsernameUnique(username);
    if (!uniqueUsername) {
      throw new Error("Username already taken.");
    }

    if (badge === "READER") {
      user = await new Reader({
        googleId: req.user.id,
        badge,
        username,
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
        badge,
        username,
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
    } else if (badge === "CONTENT_MANAGER") {
      user = await new ContentManager({
        googleId: req.user.id,
        badge,
        username,
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
  },
  async login({ username, password }, req) {
    return new Promise((resolve, reject) => {
      passport.authenticate("local", (err, user) => {
        if (!user) {
          reject("Invalid credentials.");
        }

        req.login(user, () => resolve(user));
      })({ body: { username, password } });
    });
  },
  async signup({ username, password, badge }, req) {
    if (!username || !password || !badge) {
      throw new Error(
        "You must provide an username and password and a valid badge."
      );
    }
    //  checking the uniqueness of the username across all usertypes
    let uniqueUsername = await helper_isUsernameUnique(username);
    if (!uniqueUsername) {
      throw new Error("Username already taken.");
    }
    //  the badge can be AUTHOR, READER, AND CONTENT_MANAGER
    let user;
    switch (badge) {
      case "CONTENT_MANAGER":
        // we created a new mongoose user but didn't saved it in the mongoDB server yet.
        user = new ContentManager({
          username,
          password,
          badge,
          initialized: true
        });
        return ContentManager.findOne({ username })
          .then(existingUser => {
            if (existingUser) {
              throw new Error("Username already taken");
            }
            return user.save();
          })
          .then(user => {
            return new Promise((resolve, reject) => {
              req.logIn(user, err => {
                if (err) {
                  reject(err);
                }
                resolve(user);
              });
            });
          });
      case "AUTHOR":
        user = new Author({
          username,
          password,
          badge,
          initialized: true
        });
        return Author.findOne({ username })
          .then(existingUser => {
            if (existingUser) {
              throw new Error("Username already taken");
            }
            return user.save();
          })
          .then(user => {
            return new Promise((resolve, reject) => {
              req.logIn(user, err => {
                if (err) {
                  reject(err);
                }
                resolve(user);
              });
            });
          });
      case "READER":
        user = new Reader({
          username,
          password,
          badge,
          initialized: true
        });
        return Reader.findOne({ username })
          .then(existingUser => {
            if (existingUser) {
              throw new Error("Username already taken");
            }
            return user.save();
          })
          .then(user => {
            return new Promise((resolve, reject) => {
              req.logIn(user, err => {
                if (err) {
                  reject(err);
                }
                resolve(user);
              });
            });
          });
    }
  }
};
