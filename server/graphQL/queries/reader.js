const graphql = require("graphql");
const mongoose = require("mongoose");

const Reader = mongoose.model("readers");
const { GraphQLID } = graphql;

const { ReaderType } = require("../types");

module.exports = {
  reader: {
    type: ReaderType,
    args: {
      id: { type: GraphQLID }
    },
    resolve(parentVal, args, req) {
      // finding the correct reader and returning it.
      return Reader.get(args.id);
    }
  }
};
