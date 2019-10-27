const mongoose = require("mongoose");

const Comment = mongoose.model("comments");
const Article = mongoose.model("articles");
const Reader = mongoose.model("readers");
const Author = mongoose.model("authors");

module.exports = {
  createComment: async ({ content, articleId }, req) => {
    // creating a comment in mongoose , saving to mongoDB database later;
    let userId = req.user.badge.toLowerCase().concat("Id");
    let user;
    if(userId == 'readerId'){
      user = await Reader.findById(req.user.id);
    }
    else {
      user = await Author.findById(req.user.id)
    }
    let comment = await new Comment({
      content,
      articleId,
      [userId]: req.user.id
    });
    let userComments = [...user.comments, comment.id];
    user.comments = userComments;
    let article = await Article.findById(articleId);
    articleComments = [...article.comments, comment.id];
    article.comments = articleComments;
    await comment.save();
    await article.save();
    await user.save();
    return comment;
  },
  deleteComment: async ({ id }, req) => {
    //    the function assumes the possibilty that the autorized user can only
    //    delete its comment , no one else .
    let comment = await Comment.findById(id);
    let user;
    if(comment.readerId){
      user = await Reader.findById(req.user.id);
    }
    else {
      user = await Author.findById(req.user.id)
    }
    // removing the reference from the
    let filteredComments = user.comments.filter(commentId => {
      if (comment.equals(commentId)) {
        return false;
      } else return true;
    });
    user.comments = await filteredComments;
    // removing the reference from the article;
    let { articleId } = comment;
    let article = await Article.findById(articleId);

    let articleFilteredComments = article.comments.filter(commentId => {
      if (comment.equals(commentId)) return false;
      else return true;
    });
    article.comments = await articleFilteredComments;
    // saving the referenced documents and deleting the comment
    await user.save();
    await article.save();
    return await Comment.findByIdAndDelete(id);
  }
};
