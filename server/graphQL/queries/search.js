const graphql = require("graphql");
const {
  GraphQLList,
  GraphQLEnumType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull
} = graphql;

const { ArticleType } = require("../types");

const { categoryNameEnum } = require("../ENUMS");

const sortEnum = new GraphQLEnumType({
  name: "sortEnum",
  values: {
    Asc: { value: "asc" },
    Desc: { value: "desc" }
  }
});

const searchArticlesSortOpts = new GraphQLInputObjectType({
  name: "searchArticlesSortOpts",
  fields: {
    createdAt: {
      type: sortEnum
    },
    likes: {
      type: sortEnum
    }
  }
});

const searchArticlesInputType = new GraphQLInputObjectType({
  name: "searchArticlesInputType",
  fields: {
    title: { type: GraphQLString },
    authorUsername: { type: GraphQLString },
    sortOpts: { type: searchArticlesSortOpts },
    category: {
      type: categoryNameEnum
    }
  }
});

module.exports = {
  searchArticle: {
    type: new GraphQLList(ArticleType),
    args: {
      input: {
        type: searchArticlesInputType
      }
    },
    resolve(parentVal, { input }, req) {
      //  use dbResources to find article and return it
      return;
    }
  }
};
