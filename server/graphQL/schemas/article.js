// const graphql = require("graphql");
// const AuthorType = require("./author");
// const CommentType = require("./comment");
// const LikeType = require("./like");

// const mongoose = require("mongoose");
// const Authors = mongoose.model("authors");
// const Comments = mongoose.model("comments");
// const Likes = mongoose.model("likes");

// const { GraphQLObjectType, GraphQLString, GraphQLList } = graphql;

// const ArticleType = new GraphQLObjectType({
//   name: "ArticleType",
//   fields: () => ({
//     title: { type: GraphQLString },
//     content: { type: GraphQLString },
//     authorId: {
//       type: AuthorType,
//       resolve(parentValue, args, req) {
//         // finding the author of the article and return it
//       }
//     },
//     createdAt: {
//       //  Later be resolved with original dates
//       type: GraphQLString
//     },
//     comments: {
//       type: new GraphQLList(CommentType),
//       resolve(parentValue, args, req) {
//         //  resolve the request by populating the comments
//       }
//     },
//     likes: {
//       type: new GraphQLList(LikeType),
//       resolve(parentValue, args, req) {
//         // resolve by populating the likes of the articles
//       }
//     },
//     category: { type: String }
//   })
// });

// module.exports = ArticleType;
