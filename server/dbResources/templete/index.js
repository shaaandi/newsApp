const mongoose = require("mongoose");

const MainPage = mongoose.model("mainPage");
const CategoryPage = mongoose.model("categoryPages");
// Note :
// For now we have just one mainPage, so we can easily make an assumption that the findOne
// will sufice our needs, but after integrating multiple templetes functionality the user needs
// to provide the templete id too, in the setMainSection mutation

module.exports = {
  setMainSection: async ({ articleId, section }, req) => {
    // setting the section of the mainPage with the provided article
    // and returning the section ;
    // see notes to find out why we are using findOne with no arguments;
    let mainPage = await MainPage.findOne({});
    switch (section) {
      // handling array ref types first
      case "editorsPick":
        mainPage[section].push(articleId);
        break;
      default:
        mainPage[section] = articleId;
    }
    await mainPage.save();
    return mainPage;
  },
  setCategorySection: async ({ articleId, section, name }, req) => {
    let category = await CategoryPage.findOne({ name });
    category[section] = articleId;
    await category.save();
    return category;
  }
};
