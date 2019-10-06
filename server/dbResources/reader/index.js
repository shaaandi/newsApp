const mongoose = require("mongoose");

const Reader = mongoose.model("readers");

module.exports = {
  updateReader: async ({ name }, req) => {
    let reader = await Reader.findByIdAndUpdate(
      req.user.id,
      { name },
      {
        new: true,
        omitUndefined: true
      }
    );
    return reader;
  }
};
