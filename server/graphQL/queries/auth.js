const { CurrentUserType } = require("../types");

module.exports = {
  currentUser: {
    type: CurrentUserType,
    resolve(parentVal, args, req) {
      return req.user;
    }
  }
};
