const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: {
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
  likes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "likes"
  },
  //  Enum categories will be defined so that the user can only choose from that.
  category: String
  //  We will add the hashtag functionality later.
  // We will add views functionality later .
});

module.exports = mongoose.model("articles", articleSchema);
