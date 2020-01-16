const app = require("./server/server");

// require("./server/faker/index");
const PORT  = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is listening on port 4000`);
});
