const graphql = require("graphql");
const { AuthorType } = require("../types");
const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInputObjectType
} = graphql;

const { updateAuthor } = require("../../dbResources/author");

const updateAuthorInputType = new GraphQLInputObjectType({
  name: "updateAuthorInputType",
  fields: {
    name: { type: GraphQLString }
  }
});

module.exports = {
  updateAuthor: {
    type: AuthorType,
    args: {
      input: { type: updateAuthorInputType }
    },
    resolve(parentVal, { input }, req) {
      // updates the user info and returned the updated data
      return updateAuthor(input, req);
    }
  }
};
