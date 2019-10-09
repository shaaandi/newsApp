const mongoose = require("mongoose");

const Like = mongoose.model("likes");
const Author = mongoose.model("authors");
const Article = mongoose.model("articles");
const Reader = mongoose.model("readers");

module.exports = {
  likeArticle: async ({ articleId }, req) => {
    let userId = req.user.badge.toLowerCase().concat("Id");
    let article = await Article.findById(articleId);
    //  checking that user can't like the same article again ;
    let alreadyLiked = await Like.find({ [userId]: req.user.id, articleId });

    if (alreadyLiked.length > 0) {
      return false;
    }
    //  **************************
    const like = await new Like({ articleId, [userId]: req.user.id });

    let userLikes = [...req.user.likes, like.id];
    req.user.likes = userLikes;

    let articleLikes = [...article.likes, like.id];
    article.likes = articleLikes;

    await like.save();
    await req.user.save();
    await article.save();
    return like;
  },
  unLikeArticle: async ({ articleId }, req) => {
    let userId = req.user.badge.toLowerCase().concat("Id");
    let article = await Article.findById(articleId);
    let user = req.user;
    let like = await Like.findOne({ articleId, [userId]: user.id });
    let filteredArticleLikes = article.likes.filter(likeId => {
      if (like.equals(likeId)) return false;
      else return true;
    });
    let filteredUserLikes = user.likes.filter(likeId => {
      if (like.equals(likeId)) return false;
      else return true;
    });

    article.likes = filteredArticleLikes;
    user.likes = filteredUserLikes;

    await article.save();
    await user.save();

    return await Like.findOneAndDelete(like.id);
  }
};
