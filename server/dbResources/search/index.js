const mongoose = require("mongoose");

const Article = mongoose.model("articles");
const byAuthor = "byAuthor";
const byTitle = "byTitle";

module.exports = {
  searchArticles: async ({
    req: { user },
    input: {
      query,
      searchType,
      sortOpts: { sortField, sortOrder },
      inCategories,
      pageNum
    }
  }) => {
    // finding the articles according to the filters ;
    // determining the search Type
    switch (searchType) {
      case byAuthor:
        // executes author logic
        // it will be implemented in version 2;
        break;

      case byTitle:
        // executes title logic
        // added in v1, as a simple functionality;
        // handling sorting, first initializing a empty string;
        let limitPage = 15;
        let sortString = "";
        if (sortOrder === "desc") sortString += "-";
        sortString += sortField;
        let articles = await Article.find({
          title: { $regex: query, $options: "i" },
          category: inCategories ? { $in: inCategories } : { $nin: ["none"] }
        })
          .sort(sortString)
          .skip((pageNum - 1) * limitPage)
          .limit(limitPage);
        return articles;
        break;
      default:
        return false;
    }
    return false;
  }
};
