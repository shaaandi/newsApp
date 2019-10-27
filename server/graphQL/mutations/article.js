const graphql = require("graphql");
const { ArticleType } = require("../types");
const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInputObjectType
} = graphql;

const {
  createArticle,
  updateArticle,
  deleteArticle
} = require("../../dbResources/article");

// createArticle, updateArticle, deleteArticle,

const createArticleInputType = new GraphQLInputObjectType({
  name: "createArticleInputType",
  fields: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    category: { type: new GraphQLNonNull(GraphQLString) },
    createdAt: { type: GraphQLString }
  }
});

const updateArticleInputType = new GraphQLInputObjectType({
  name: "updateArticleInputType",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: GraphQLString },
    content: { type: GraphQLString }
  }
});

const deleteArticleInputType = new GraphQLInputObjectType({
  name: "deleteArticleInputType",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  }
});

module.exports = {
  createArticle: {
    // it will return the new created article;
    type: ArticleType,
    args: {
      input: {
        type: createArticleInputType
      }
    },
    resolve(parentVal, { input }, req) {
      // create Article function from the dbResources helpers
      return createArticle(input, req);
    }
  },
  updateArticle: {
    //  it will return the updated article;
    type: ArticleType,
    args: {
      input: {
        type: updateArticleInputType
      }
    },
    resolve(parentVal, { input }, req) {
      // update the article from the dbResources helpers and return the updated Article
      return updateArticle(input, req);
    }
  },
  deleteArticle: {
    // returning the deleting article means that the article is deleted
    type: ArticleType,
    args: {
      input: {
        type: deleteArticleInputType
      }
    },
    resolve(parentVal, { input }, req) {
      //  delete the article from the dbResources helpers and return the deleted Article
      return deleteArticle(input, req);
    }
  }
};
