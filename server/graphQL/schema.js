const graphql = require("graphql");
const { GraphQLSchema } = graphql;

const RootQueryType = require("./queries/rootQuery");
const mutation = require("./mutations");
module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation
});
