const graphql = require("graphql");
const { CommentType } = require("../schemas/rootQuery");
const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLEnumType
} = graphql;

const { createComment, deleteComment } = require("../../dbResources/comment");

const createCommentInputType = new GraphQLInputObjectType({
  name: "createCommentInputType",
  fields: {
    content: { type: new GraphQLNonNull(GraphQLString) },
    articleId: { type: new GraphQLNonNull(GraphQLID) }
  }
});

const deleteCommentInputType = new GraphQLInputObjectType({
  name: "deleteCommentInputType",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  }
});

module.exports = {
  createComment: {
    type: CommentType,
    args: {
      input: {
        type: new GraphQLNonNull(createCommentInputType)
      }
    },
    resolve(parentVal, { input }, req) {
      // resolve by creating a new comment and returning the new created comment
      return createComment(input, req);
    }
  },
  deleteComment: {
    type: CommentType,
    args: {
      input: {
        type: new GraphQLNonNull(deleteCommentInputType)
      }
    },
    resolve(parentVal, { input }, req) {
      //  resolve by deleting the comment and returning the comment ;
      return deleteComment(input, req);
    }
  }
};
