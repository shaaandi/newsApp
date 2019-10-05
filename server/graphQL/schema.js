const graphql = require("graphql");
const { GraphQLSchema } = graphql;

const { RootQueryType } = require("./schemas/rootQuery");
const mutation = require("./mutations");
module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation
});
