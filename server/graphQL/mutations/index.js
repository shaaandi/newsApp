const graphql = require("graphql");

const { GraphQLObjectType } = graphql;

const { setUserBadge, logout } = require("./auth");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    setUserBadge,
    logout
  }
});

module.exports = mutation;
