const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  readerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "readers"
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "authors"
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

module.exports = mongoose.model("likes", likeSchema);
