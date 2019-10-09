const bcrypt = require("bcrypt-nodejs");
const crypto = require("crypto");
const mongoose = require("mongoose");
const Like = mongoose.model("likes");
const Comment = mongoose.model("comments");
const Article = mongoose.model("articles");

const authorSchema = new mongoose.Schema(
  {
    //  We will add the fName, lName,  mName , functionality later
    name: String,
    username: {
      type: String,
      unique: true
    },
    articles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "articles"
      }
    ],
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

    // Auth Section props
    password: String,
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
  },
  { timestamps: true }
);

// The user's password is never saved in plain text.  Prior to saving the
// user model, we 'salt' and 'hash' the users password.  This is a one way
// procedure that modifies the password - the plain text password cannot be
// derived from the salted + hashed version. See 'comparePassword' to understand
// how this is used.
authorSchema.pre("save", function save(next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

// We need to compare the plain text password (submitted whenever logging in)
// with the salted + hashed version that is sitting in the database.
// 'bcrypt.compare' takes the plain text password and hashes it, then compares
// that hashed password to the one stored in the DB.  Remember that hashing is
// a one way process - the passwords are never compared in plain text form.
authorSchema.methods.comparePassword = function comparePassword(
  candidatePassword,
  cb
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

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
