const graphql = require("graphql");
const { ReaderType } = require("../types");
const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInputObjectType
} = graphql;

const { updateReader } = require("../../dbResources/reader");

const updateReaderInputType = new GraphQLInputObjectType({
  name: "updateReaderInputType",
  fields: {
    name: { type: GraphQLString }
  }
});

module.exports = {
  updateReader: {
    type: ReaderType,
    args: {
      input: { type: updateReaderInputType }
    },
    resolve(parentVal, { input }, req) {
      // updates the user info and returned the updated data
      return updateReader(input, req);
    }
  }
};
