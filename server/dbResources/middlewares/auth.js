module.exports = {
  checkUserLogin: req => {
    if (req.user) {
      return true;
    } else {
      return false;
    }
  },

  checkUserInitialized: req => {
    if (req.user.badge === "NOT_INITIALIZED") {
      return false;
    } else {
      return true;
    }
  }
};
