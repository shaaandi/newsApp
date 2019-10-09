const graphql = require("graphql");

const mongoose = require("mongoose");

const MainPage = mongoose.model("mainPage");
const CategoryPage = mongoose.model("categoryPages");

const { MainPageType, CategoryPageType } = require("../schemas/rootQuery");
const {
  setCategorySection,
  setMainSection
} = require("../../dbResources/templete");
const {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLEnumType
} = graphql;

const mainSectionEnum = new GraphQLEnumType({
  name: "mainSectionEnum",
  values: {
    headline1: { value: "headline1" },
    headline2: { value: "headline2" },
    headline3: { value: "headline3" },
    headline4: { value: "headline4" },
    headline5: { value: "headline5" },
    editorsPick: { value: "editorsPick" }
  }
});

const setMainSectionInputType = new GraphQLInputObjectType({
  name: "setMainSectionInputType",
  fields: {
    articleId: { type: new GraphQLNonNull(GraphQLID) },
    section: { type: new GraphQLNonNull(mainSectionEnum) }
  }
});

const categorySectionEnum = new GraphQLEnumType({
  name: "categorySectionEnum",
  values: {
    headline1: { value: "headline1" },
    headline2: { value: "headline2" },
    headline3: { value: "headline3" }
  }
});

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

const setCategorySectionInputType = new GraphQLInputObjectType({
  name: "setCategorySectionInputType",
  fields: {
    articleId: { type: new GraphQLNonNull(GraphQLID) },
    section: { type: new GraphQLNonNull(categorySectionEnum) },
    name: { type: new GraphQLNonNull(categoryNameEnum) }
  }
});

module.exports = {
  //  the array section of the mainPage will be set using one article at a time,
  //  its like pushing one article on at a  time, as the user inputing it.
  setMainSection: {
    type: MainPageType,
    args: {
      input: { type: setMainSectionInputType }
    },
    resolve(parentVal, { input }, req) {
      //  resolve by using bdResources templete  helpers;
      return setMainSection(input, req);
    }
  },
  setCategorySection: {
    type: CategoryPageType,
    args: {
      input: { type: setCategorySectionInputType }
    },
    resolve(parentVal, { input }, req) {
      //  resolve by using dbResources templete helpers
      return setCategorySection(input, req);
    }
  }
};
