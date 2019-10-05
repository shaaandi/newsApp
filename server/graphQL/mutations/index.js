const graphql = require("graphql");
const { setUserBadge } = require("../../dbResources/auth/index");
const { CurrentUserType } = require("../schemas/rootQuery");

const {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull
} = graphql;

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    setUserBadge: {
      type: CurrentUserType,
      args: {
        badge: {
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
  }
});

module.exports = mutation;
