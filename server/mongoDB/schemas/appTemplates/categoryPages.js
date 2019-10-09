const mongoose = require("mongoose");

const categoryPagesSchema = new mongoose.Schema({
  name: String,
  headline1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "articles"
  },
  headline2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "articles"
  },
  headline3: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "articles"
  }
});

module.exports = mongoose.model("categoryPages", categoryPagesSchema);
