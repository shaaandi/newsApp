const mongoose = require("mongoose");

const Author = mongoose.model("authors");

module.exports = {
  updateAuthor: async ({ name }, req) => {
    let author = await Author.findByIdAndUpdate(
      req.user.id,
      { name },
      {
        new: true,
        omitUndefined: true
      }
    );
    return author;
  }
};
