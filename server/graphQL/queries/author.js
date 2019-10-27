const graphql = require("graphql");
const mongoose = require("mongoose");

const Author = mongoose.model("authors");

const { GraphQLID } = graphql;

const { AuthorType } = require("../types");

module.exports = {
  author: {
    type: AuthorType,
    args: {
      id: { type: GraphQLID }
    },
    resolve(parentVal, args, req) {
      //  resolving the author query
      return Author.get(args.id);
    }
  }
};
