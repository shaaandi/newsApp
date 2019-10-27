const graphql = require("graphql");
const mongoose = require("mongoose");

const Article = mongoose.model("articles");
const Like = mongoose.model("likes");

const { GraphQLObjectType, GraphQLID, GraphQLBoolean } = graphql;

const { ArticleType } = require("../types");

const articleResponseType = new GraphQLObjectType({
  name: "articleResponseType",
  fields: {
    article: { type: ArticleType },
    isLiked: { type: GraphQLBoolean }
  }
});

module.exports = {
  article: {
    type: articleResponseType,
    args: {
      id: { type: GraphQLID }
    },
    async resolve(parentVal, args, req) {
      //  finding the correct the article.
      let article = await Article.get(args.id);
      if (!req.user)
        return {
          article,
          isLiked: null
        };
      let foundLike = await Like.findOne({
        articleId: article.id,
        readerId: req.user.id
      });
      if (foundLike) {
        return {
          article,
          isLiked: true
        };
      } else {
        return {
          article,
          isLiked: false
        };
      }
    }
  }
};
