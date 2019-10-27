const graphql = require("graphql");
const { GraphQLObjectType } = graphql;

const { reader } = require("./reader");
const { article } = require("./article");
const { currentUser } = require("./auth");
const { author } = require("./author");
const { searchArticle } = require("./search");

const {
  fetchMainTemplete,
  fetchCategoryTemplete,
  fetchCategoryLatest,
  fetchCategoryHot
} = require("./templete");

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    reader,
    article,
    currentUser,
    author,
    searchArticle,
    fetchMainTemplete,
    fetchCategoryTemplete,
    fetchCategoryHot,
    fetchCategoryLatest
  })
});

module.exports = RootQueryType;
