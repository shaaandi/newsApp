const { GraphQLEnumType } = require("graphql");

const categoryNameEnum = new GraphQLEnumType({
  name: "categoryNameEnum",
  values: {
    International: { value: "International" },
    US: { value: "US" },
    Politics: { value: "Politics" },
    Health: { value: "Health" },
    Technology: { value: "Technology" },
    Sports: { value: "Sports" },
    Opinion: { value: "Opinion" }
  }
});

module.exports = {
  categoryNameEnum
};
