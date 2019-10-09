const mongoose = require("mongoose");

const Article = mongoose.model("articles");
module.exports = {
  createArticle: async ({ title, content, category }, req) => {
    let authorId = req.user.id;
    const article = await new Article({ title, content, authorId, category });
    //  the req.user have the author object from mongoose;
    let articles = [...req.user.articles, article.id];
    req.user.articles = articles;
    await req.user.save();
    await article.save();
    return article;
  },
  updateArticle: async ({ id, title, content }, req) => {
    // id: { type: new GraphQLNonNull(GraphQLID) },
    // title: { type: GraphQLString },
    // content: { type: GraphQLString }
    let article = await Article.findByIdAndUpdate(
      id,
      { title, content },
      { new: true, omitUndefined: true }
    );
    return article;
  },
  deleteArticle: async ({ id }, req) => {
    let query = await Article.findByIdAndDelete(id);
    //  needed to delete the reference of teh article and its related all comments and likes;
    return query;
  }
};
