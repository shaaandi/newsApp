const graphql = require("graphql");

const { GraphQLObjectType } = graphql;

const { setUserBadge, logout } = require("./auth");
const { createArticle, updateArticle, deleteArticle } = require("./article");
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    setUserBadge,
    logout,
    createArticle,
    updateArticle,
    deleteArticle
  }
});

module.exports = mutation;
