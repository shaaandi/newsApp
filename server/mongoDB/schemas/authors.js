const mongoose = require("mongoose");

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

module.exports = mongoose.model("authors", authorSchema);
