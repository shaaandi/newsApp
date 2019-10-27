const graphql = require("graphql");
const { LikeType } = require("../types");

const { GraphQLInputObjectType, GraphQLID, GraphQLNonNull } = graphql;

const { likeArticle, unLikeArticle } = require("../../dbResources/like");

const likeArticleInputType = new GraphQLInputObjectType({
  name: "likeArticleInputType",
  fields: {
    articleId: { type: new GraphQLNonNull(GraphQLID) }
  }
});

const unLikeArticleInputType = new GraphQLInputObjectType({
  name: "unLikeArticleInputType",
  fields: {
    articleId: { type: new GraphQLNonNull(GraphQLID) }
  }
});

module.exports = {
  likeArticle: {
    type: LikeType,
    args: {
      input: {
        type: likeArticleInputType
      }
    },
    resolve(parentVal, { input }, req) {
      //  resolve by using likeArticle func in the dbResources helpers
      if (!req.user) return false;

      return likeArticle(input, req);
    }
  },
  unLikeArticle: {
    type: LikeType,
    args: {
      input: {
        type: unLikeArticleInputType
      }
    },
    resolve(parentVal, { input }, req) {
      return unLikeArticle(input, req);
    }
  }
};
