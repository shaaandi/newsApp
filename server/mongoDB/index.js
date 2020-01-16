require("./schemas/comments");
require("./schemas/likes");
require("./schemas/articles");
require("./schemas/authors");
require("./schemas/readers");
require("./schemas/contentManagers");
require("./schemas/appTemplates/mainPage");
require("./schemas/appTemplates/categoryPages");

const keys = require("../keys");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect(keys.mongoURI,  { useNewUrlParser: true } );

mongoose.connection
  .once("open", () => console.log("Connected to MongoDB Instance"))
  .on("error", err => console.log("Error connection to MongoDB : ", err));
