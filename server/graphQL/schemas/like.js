// const graphql = require("graphql");

// const ReaderType = require("./reader");
// const ArticleType = require("./article");

// const mongoose = require("mongoose");
// const Authors = mongoose.model("authors");
// const Comments = mongoose.model("comments");
// const Likes = mongoose.model("likes");

// const { GraphQLObjectType, GraphQLString, GraphQLList } = graphql;

// const LikeType = new GraphQLObjectType({
//   name: "LikeType",
//   fields: () => ({
//     readerId: {
//       type: ReaderType,
//       resolve(parentVal, args, req) {
//         //   resolve by finding the reader and returning back
//       }
//     },
//     articleId: {
//       type: ArticleType,
//       resolve(parentVal, args, req) {
//         // resolve by finding the article and returning it
//       }
//     },
//     createdAt: {
//       type: GraphQLString
//     }
//   })
// });

// module.exports = LikeType;
