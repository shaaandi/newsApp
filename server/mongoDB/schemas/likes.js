const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    readerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "readers"
    },
    // generally we are faking readers to like articles , author will not like in fake data;
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "authors"
    },
    articleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "articles"
    }
  },
  { timestamps: true }
);

likeSchema.statics.getReader = async function(likeId) {
  let like = await this.findById(likeId).populate("readerId");
  return like.readerId;
};

likeSchema.statics.getAuthor = async function(likeId) {
  let like = await this.findById(likeId).populate("authorId");
  return like.authorId;
};

likeSchema.statics.getArticle = async function(likeId) {
  let like = await this.findById(likeId).populate("articleId");
  return like.articleId;
};

module.exports = mongoose.model("likes", likeSchema);
