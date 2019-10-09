const graphql = require("graphql");

const { GraphQLObjectType } = graphql;

const { setUserBadge, logout, login, signup } = require("./auth");
const { createArticle, updateArticle, deleteArticle } = require("./article");
const { updateAuthor } = require("./author");
const { updateReader } = require("./reader");
const { createComment, deleteComment } = require("./comment");
const { likeArticle, unLikeArticle } = require("./like");
const { templetesInitialize } = require("./initialize");
const { setMainSection, setCategorySection } = require("./templete");
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
    likeArticle,
    unLikeArticle,
    login,
    signup,
    templetesInitialize,
    setMainSection,
    setCategorySection
  }
});

module.exports = mutation;
