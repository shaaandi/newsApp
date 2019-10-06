const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  readerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "readers"
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "authors"
  },
  content: {
    type: String
  },
  articleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "articles"
  },
  createdAt: {
    type: Date,
    default: "12/12/2000"
  }
});

module.exports = mongoose.model("comments", commentSchema);
