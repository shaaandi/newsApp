const mongoose = require("mongoose");

const mainPageSchema = new mongoose.Schema(
  {
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
    },
    headline4: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "articles"
    },
    headline5: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "articles"
    },
    editorsPick: [
      // only pick aticles with category of opinions
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "articles"
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("mainPage", mainPageSchema);
