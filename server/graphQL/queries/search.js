const graphql = require("graphql");
const {
  GraphQLList,
  GraphQLEnumType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt
} = graphql;

const { ArticleType } = require("../types");

const { categoryNameEnum } = require("../ENUMS");

const { searchArticles } = require("../../dbResources/search");

const sortOrderEnum = new GraphQLEnumType({
  name: "sortOrderEnum",
  values: {
    Asc: { value: "asc" },
    Desc: { value: "desc" }
  }
});

const sortFieldEnum = new GraphQLEnumType({
  name: "sortFieldEnum",
  values: {
    likes: { value: "likes" },
    createdAt: { value: "createdAt" }
  }
});

const searchTypeEnum = new GraphQLEnumType({
  name: "searchTypeEnum",
  values: {
    byAuthor: { value: "byAuthor" },
    byTitle: { value: "byTitle" }
  }
});

const searchArticlesSortOpts = new GraphQLInputObjectType({
  name: "searchArticlesSortOpts",
  fields: {
    sortField: {
      type: sortFieldEnum
    },
    sortOrder: {
      type: sortOrderEnum
    }
  }
});

const searchArticlesInputType = new GraphQLInputObjectType({
  name: "searchArticlesInputType",
  fields: {
    query: { type: GraphQLString },
    searchType: { type: searchTypeEnum },
    sortOpts: { type: searchArticlesSortOpts },
    inCategories: {
      type: new GraphQLList(categoryNameEnum)
    },
    pageNum: { type: new GraphQLNonNull(GraphQLInt) }
  }
});

module.exports = {
  searchArticles: {
    type: new GraphQLList(ArticleType),
    args: {
      input: {
        type: searchArticlesInputType
      }
    },
    resolve(parentVal, { input }, req) {
      //  use dbResources to find article and return it
      return searchArticles({ input, req });
    }
  }
};
