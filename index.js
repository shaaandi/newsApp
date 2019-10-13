const app = require("./server/server");

require("./server/faker/index");

app.listen(4000, () => {
  console.log(`Server is listening on port 4000`);
});
