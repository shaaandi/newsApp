const mongoose = require("mongoose");
const Comment = mongoose.model("comments");
const Like = mongoose.model("likes");

const readerSchema = new mongoose.Schema({
  //  We will add the fName, lName,  mName , functionality later
  name: String,
  username: {
    type: String,
    unique: true
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

  // Auth Section
  initialized: {
    type: Boolean,
    default: false
  },
  badge: {
    type: String,
    default: "Reader"
  },
  googleId: {
    type: String,
    default: null
  }

  //  ***************
  // WE WILL ADD THE VIEW FUNCTIONALITY LATER ;
});

readerSchema.statics.get = async function(id) {
  let reader = await this.findById(id);
  return reader;
};

readerSchema.statics.getComments = async function(id) {
  let comments = await Comment.find({ readerId: id }).populate("articleId");
  return comments;
};
readerSchema.statics.getLikes = async function(id) {
  let likes = await Like.find({ readerId: id }).populate("articleId");
  return likes;
};

module.exports = mongoose.model("readers", readerSchema);
