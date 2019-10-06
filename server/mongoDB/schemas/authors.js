const mongoose = require("mongoose");
const Like = mongoose.model("likes");
const Comment = mongoose.model("comments");
const Article = mongoose.model("articles");

const authorSchema = new mongoose.Schema({
  //  We will add the fName, lName,  mName , functionality later
  name: String,
  username: {
    type: String,
    unique: true
  },
  articles: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "articles"
  },
  comments: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "comments"
  },
  likes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "likes"
  },

  // Auth Section props
  badge: {
    type: String,
    default: "AUTHOR"
  },
  initialized: {
    type: Boolean,
    default: false
  },
  googleId: {
    type: String,
    default: null
  }

  // ******************
  //  We will add the personal data later, and other fuctionality later
});

authorSchema.statics.get = async function(id) {
  let author = await this.findById(id);
  return author;
};

authorSchema.statics.getLikes = async function(id) {
  let likes = await Like.find({ authorId: id }).populate("articleId");
  return likes;
};

authorSchema.statics.getComments = async function(id) {
  let comments = await Comment.find({ authorId: id }).populate("articleId");
  return comments;
};

authorSchema.statics.getArticles = async function(id) {
  let articles = await Article.find({ authorId: id });
  return articles;
};

module.exports = mongoose.model("authors", authorSchema);
