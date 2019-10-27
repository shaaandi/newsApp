const graphql = require("graphql");
const mongoose = require("mongoose");

const Article = mongoose.model("articles");
const MainPage = mongoose.model("mainPage");
const CategoryPage = mongoose.model("categoryPages");

const { categoryNameEnum } = require("../ENUMS");

const { GraphQLList, GraphQLInputObjectType, GraphQLNonNull } = graphql;

const { ArticleType, MainPageType, CategoryPageType } = require("../types");

const fetchCategoryTempleteInputType = new GraphQLInputObjectType({
  name: "fetchCategoryTempleteInputType",
  fields: {
    name: { type: new GraphQLNonNull(categoryNameEnum) }
  }
});

module.exports = {
  // seperate queries section for the run time of the browser ,
  // including fetching the templetes;
  fetchMainTemplete: {
    type: MainPageType,
    resolve(parentVal, args, req) {
      return MainPage.findOne({});
    }
  },

  fetchCategoryTemplete: {
    type: CategoryPageType,
    args: {
      input: { type: fetchCategoryTempleteInputType }
    },
    resolve(parentVal, { input }, req) {
      return CategoryPage.findOne({ name: input.name });
    }
  },

  fetchCategoryLatest: {
    type: new GraphQLList(ArticleType),
    args: {
      input: { type: fetchCategoryTempleteInputType }
    },
    resolve(parentVal, { input }, req) {
      return Article.find({ category: input.name })
        .sort("-createdAt")
        .limit(5);
    }
  },

  fetchCategoryHot: {
    type: new GraphQLList(ArticleType),
    args: {
      input: { type: fetchCategoryTempleteInputType }
    },
    resolve(parentVal, { input }, req) {
      return Article.find({ category: input.name })
        .sort("likes")
        .limit(5);
    }
  }
};
