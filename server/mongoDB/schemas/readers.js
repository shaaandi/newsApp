const bcrypt = require("bcrypt-nodejs");
const crypto = require("crypto");
const mongoose = require("mongoose");
const Comment = mongoose.model("comments");
const Like = mongoose.model("likes");

const readerSchema = new mongoose.Schema(
  {
    //  We will add the fName, lName,  mName , functionality later
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
    password: String,
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
    },

    //  ***************
    // WE WILL ADD THE VIEW FUNCTIONALITY LATER ;
    fName: String,
    lName: String,
    // Image are stored in links type, in version 3 we ,will use the amazon S3 to save files
    //  and many other data, including files and videos;
    profileImg: String,
    phoneNumber: String,
    email: String,
    address: {
      city: String,
      street: String,
      country: String
    }
  },
  { timestamps: true }
);

// The user's password is never saved in plain text.  Prior to saving the
// user model, we 'salt' and 'hash' the users password.  This is a one way
// procedure that modifies the password - the plain text password cannot be
// derived from the salted + hashed version. See 'comparePassword' to understand
// how this is used.
readerSchema.pre("save", function save(next) {
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
readerSchema.methods.comparePassword = function comparePassword(
  candidatePassword,
  cb
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

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
