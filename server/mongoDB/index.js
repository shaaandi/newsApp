require("./schemas/articles");
require("./schemas/authors");
require("./schemas/readers");
require("./schemas/comments");
require("./schemas/likes");
const keys = require("../keys/dev");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect(keys.mongoURI);

mongoose.connection
  .once("open", () => console.log("Connected to MongoDB Instance"))
  .on("error", err => console.log("Error connection to MongoDB : ", err));
