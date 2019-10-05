const mongoose = require("mongoose");

const readerSchema = new mongoose.Schema({
  //  We will add the fName, lName,  mName , functionality later
  name: String,
  username: {
    type: String,
    unique: true
  },
  comments: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "comments"
  },
  likes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "likes"
  },

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

module.exports = mongoose.model("readers", readerSchema);
