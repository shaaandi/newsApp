const mongoose = require("mongoose");

const Article = mongoose.model("articles");

module.exports = {
  searchArticles: async ({
    req: { user },
    input: {
      title,
      authorUsername,
      sortOpts: { likes: likesOrder, createdAt: createdAtOrder },
      category
    }
  }) => {
    console.log(
      user,
      title,
      authorUsername,
      likesOrder,
      createdAtOrder,
      category
    );
    return false;
  }
};
