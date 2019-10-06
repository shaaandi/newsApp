const graphql = require("graphql");
const { setUserBadge } = require("../../dbResources/auth/index");
const { CurrentUserType } = require("../schemas/rootQuery");

const { GraphQLString, GraphQLNonNull } = graphql;

module.exports = {
  setUserBadge: {
    type: CurrentUserType,
    args: {
      badge: {
        type: GraphQLNonNull(GraphQLString)
      },
      username: {
        type: GraphQLNonNull(GraphQLString)
      }
    },
    resolve(parentVal, args, req) {
      return setUserBadge(args, req);
    }
  },
  logout: {
    type: CurrentUserType,
    resolve(parentValue, args, req) {
      const { user } = req;
      req.logout();
      return user;
    }
  }
};
