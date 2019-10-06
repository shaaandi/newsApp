const graphql = require("graphql");

const { GraphQLObjectType } = graphql;

const { setUserBadge, logout } = require("./auth");
const { createArticle, updateArticle, deleteArticle } = require("./article");
const { updateAuthor } = require("./author");
const { updateReader } = require("./reader");
const { createComment, deleteComment } = require("./comment");
const { likeArticle } = require("./like");
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    setUserBadge,
    logout,
    createArticle,
    updateArticle,
    deleteArticle,
    updateAuthor,
    updateReader,
    createComment,
    deleteComment,
    likeArticle
  }
});

module.exports = mutation;
