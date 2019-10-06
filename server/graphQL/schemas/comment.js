// const graphql = require("graphql");
// const AuthorType = require("./author");
// const LikeType = require("./like");
// const ReaderType = require("./reader");
// const ArticleType = require("./article");

// const mongoose = require("mongoose");
// const Authors = mongoose.model("authors");
// const Comments = mongoose.model("comments");
// const Likes = mongoose.model("likes");

// const { GraphQLObjectType, GraphQLString, GraphQLList } = graphql;

// const CommentType = new GraphQLObjectType({
//   name: "CommentType",
//   fields: () => ({
//     readerId: {
//       type: ReaderType,
//       resolve(parentVal, args, req) {
//         //  resolving the query by polulating the reader
//       }
//     },
//     content: {
//       type: GraphQLString
//     },
//     articleId: {
//       type: ArticleType,
//       resolve(parentVal, args, req) {
//         //  resolving the request by popluating the article,
//         //  or by findiny the article
//       }
//     },
//     createdAt: {
//       //  Time Stamps will be set later in the graphQL, and the backened mongoose backend
//       type: GraphQLString
//     }
//   })
// });

// module.exports = CommentType;
