const graphql = require("graphql");
const { GraphQLObjectType } = graphql;

const { reader } = require("./reader");
const { article } = require("./article");
const { currentUser } = require("./auth");
const { author } = require("./author");
const { searchArticles } = require("./search");

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
    searchArticles,
    fetchMainTemplete,
    fetchCategoryTemplete,
    fetchCategoryHot,
    fetchCategoryLatest
  })
});

module.exports = RootQueryType;
