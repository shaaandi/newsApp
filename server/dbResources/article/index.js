const mongoose = require("mongoose");

const Article = mongoose.model("articles");
const Author = mongoose.model("authors");
module.exports = {
  createArticle: async ({ title, content, category }, req) => {
    // title: { type: new GraphQLNonNull(GraphQLString) },
    // content: { type: new GraphQLNonNull(GraphQLString) },
    // authorId: { type: new GraphQLNonNull(GraphQLString) }
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
    return query;
  }
};
