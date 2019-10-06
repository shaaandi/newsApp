const mongoose = require("mongoose");
const Comment = mongoose.model("comments");
const Like = mongoose.model("likes");

const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "authors"
  },
  // Saving dates in mongoose  , in mongodb .
  //  Taking care of different time zones for different users
  createdAt: {
    type: Date,
    default: "12/12/2000"
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comments"
    }
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "likes"
    }
  ],
  //  Enum categories will be defined so that the user can only choose from that.
  category: String
  //  We will add the hashtag functionality later.
  // We will add views functionality later .
});

articleSchema.statics.get = async function(id) {
  let article = await this.findById(id);
  return article;
};

articleSchema.statics.getAuthor = async function(id) {
  let { authorId } = await this.findById(id).populate("authorId");
  return authorId;
};

articleSchema.statics.getComments = async function(id) {
  let comments = await Comment.find({ articleId: id })
    .populate("authorId")
    .populate("readerId");
  return comments;
};

articleSchema.statics.getLikes = async function(id) {
  let likes = await Like.find({ articleId: id })
    .populate("authorId")
    .populate("readerId");
  return likes;
};

module.exports = mongoose.model("articles", articleSchema);
