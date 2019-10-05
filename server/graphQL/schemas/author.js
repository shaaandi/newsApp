// const graphql = require("graphql");
// const mongoose = require("mongoose");
// const Articles = mongoose.model("articles");
// const Authors = mongoose.model("authors");
// const Comments = mongoose.model("comments");
// const { GraphQLObjectType, GraphQLString, GraphQLList } = graphql;

// const ArticleType = require("./article");
// const CommentType = require("./comment");
// const LikeType = require("./like");

// const AuthorType = new GraphQLObjectType({
//   name: "AuthorType",
//   fields: () => ({
//     name: { type: GraphQLString },
//     username: { type: GraphQLString },
//     articles: {
//       // adding article type in the GraphQLList function
//       type: new GraphQLList(ArticleType),
//       resolve(parentVal, args, req) {
//         //  handling the requested query,
//         // populating the articles section of the user
//       }
//     },
//     comments: {
//       // adding comments type in the following function
//       type: new GraphQLList(CommentType),
//       resolve(parentVal, args, req) {
//         // resolving the comments by populating them .
//       }
//     },
//     likes: {
//       type: new GraphQLList(LikeType),
//       resolve(parentVal, args, req) {
//         // resolving the query by populating the likes prop
//       }
//     }
//   })
// });

// module.exports = AuthorType;
