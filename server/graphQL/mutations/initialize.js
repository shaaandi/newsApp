const templeteInitialization = require("../../dbResources/initialization/browserTempletes");
const graphql = require("graphql");

const {
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLID
} = graphql;

const modelsType_templeteInitializeResponse = new GraphQLObjectType({
  name: "modelsType_templeteInitializeResponse",
  fields: {
    name: { type: GraphQLString },
    id: { type: GraphQLID }
  }
});

const templeteInitializeResponse = new GraphQLObjectType({
  name: "templeteInitializeResponse",
  fields: {
    initialization: { type: GraphQLBoolean },
    models: { type: new GraphQLList(modelsType_templeteInitializeResponse) }
  }
});

module.exports = {
  templetesInitialize: {
    type: templeteInitializeResponse,
    async resolve(parentVal, args, req) {
      return await templeteInitialization();
    }
  }
};
