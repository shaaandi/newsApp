const mongoose = require("mongoose");
const Comment = mongoose.model("comments");
const Like = mongoose.model("likes");

const articleSchema = new mongoose.Schema(
  {
    title: String,
    // later scaling will include the multiple images in the content and links facility,
    content: [String],
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "authors"
    },
    // Saving dates in mongoose  , in mongodb .
    //  Taking care of different time zones for different users
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
    category: {
      type: String,
      enum: [
        "International",
        "US",
        "Politics",
        "Health",
        "Technology",
        "Sports",
        "Opinion"
      ]
    }
    //  We will add the hashtag functionality later.
    // We will add views functionality later .
  },
  { timestamps: true }
);

//  plugins
// articleSchema.plugin(timestamps);

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
