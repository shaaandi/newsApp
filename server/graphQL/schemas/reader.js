// const graphql = require("graphql");
// const CommentType = require("./comment");
// const LikeType = require("./like.js");
// const AuthorType = require("./author.js");
// const mongoose = require("mongoose");
// const Authors = mongoose.model("authors");
// const Comments = mongoose.model("comments");
// const Likes = mongoose.model("likes");

// const { GraphQLObjectType, GraphQLString, GraphQLList } = graphql;

// const ReaderType = new GraphQLObjectType({
//   name: "ReaderType",
//   fields: () => ({
//     name: { type: GraphQLString },
//     username: { type: GraphQLString },
//     likes: {
//       type: new GraphQLList(LikeType),
//       resolve(parentVal, args, req) {
//         //  resolving the query by populating all the likes
//       }
//     },
//     comments: {
//       type: new GraphQLList(CommentType),
//       resolve(parentVal, args, req) {
//         //  populating the comments of the readers
//       }
//     }

//     //  We will add the view finctionality later,
//   })
// });

// module.exports = ReaderType;
