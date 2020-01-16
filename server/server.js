const express = require("express");
const cors = require('cors');
const app = express();
const keys = require('./keys/index');

console.log(keys)

const corsOptions = {
  origin : keys.frontendURL,
  credentials  : true
}
app.use(cors(corsOptions));
//  MongoDB configuration .
require("./mongoDB/index");
//  *******************
// its testing

const expressGraphQL = require("express-graphql");
const schema = require("./graphQL/schema");
const cookieSession = require("cookie-session");
const passport = require("passport");

app.get("/", (req, res) => {
  res.send("I am wokring ");
});

//  Auth Setup
require("./services/passport");
app.use(
  cookieSession({
    maxAge: 15 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/auth/index")(app);
require("./routes/faker/fakerRoute")(app);

// ***************
app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true
  })
);

module.exports = app;
