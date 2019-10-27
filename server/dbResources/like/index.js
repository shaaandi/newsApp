const mongoose = require("mongoose");

const Like = mongoose.model("likes");
const Author = mongoose.model("authors");
const Article = mongoose.model("articles");
const Reader = mongoose.model("readers");

module.exports = {
  likeArticle: async ({ articleId }, req) => {
    let userId = req.user.badge.toLowerCase().concat("Id");
    let article = await Article.findById(articleId);
    let user;
    if(userId == 'readerId'){
      user = await Reader.findById(req.user.id);
    }
    else {
      user = await Author.findById(req.user.id)
    }
    //  checking that user can't like the same article again ;
    let alreadyLiked = await Like.find({ [userId]: req.user.id, articleId });

    if (alreadyLiked.length > 0) {
      // here we can unlike the article;
      // removing the like and removing all the references from article and user
      // so if there is already liked, then the already liked have one element in it
      let foundLike = alreadyLiked[0];
      // removing user likes
      let userLikes = user.likes.filter(likeId => {
        if(foundLike.equals(likeId)){
          return false
        } else {
          return true
        }
      });
      let articleLikes = article.likes.filter(likeId => {
        if(foundLike.equals(likeId)){
          return false
        } else {
          return true
        }

      })
      user.likes = userLikes;
      article.likes = articleLikes;
      // saving the user and article, and removing the like . --deleteFoundLike
      await Like.findByIdAndDelete(foundLike.id);
      await user.save()
      await article.save()
      return foundLike
    }
    //  **************************
    const like = await new Like({ articleId, [userId]: req.user.id });
    console.log(user)
    console.log(typeof(user.likes))
    let userLikes = [...user.likes, like.id];
    user.likes = userLikes;

    let articleLikes = [...article.likes, like.id];
    article.likes = articleLikes;

    await like.save();
    await user.save();
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
