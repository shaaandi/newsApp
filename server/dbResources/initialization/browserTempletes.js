//  initialization of the mainPages and pre-defined articles;

const mongoose = require("mongoose");
const MainPage = mongoose.model("mainPage");
const CategoryPage = mongoose.model("categoryPages");

//  if there already a mainPage then do nothing else create a new mainPage templete ;
//  multiple templete functionality can be added later;

// nice message implementation is still in progress . Error expected on calling the function in outputs

module.exports = async function templetesInitialization() {
  //  providing a good message after initialization ;
  let newModels = [];
  let existingMain = await MainPage.find({});
  if (existingMain.length < 1) {
    //  there are no mainPage, so create a new one ;
    let newMain = await new MainPage({}).save();
    if (newMain) {
      newModels.push({ name: "main", id: newMain.id });
    }
  }
  //  Seven basic categories of the news paper section for now ;
  let categoriesEnum = [
    "International",
    "US",
    "Politics",
    "Health",
    "Technology",
    "Sports",
    "Opinion"
  ];
  let wait = new Promise(async (resolve, reject) => {
    let resp = categoriesEnum.map(async category => {
      // first checks if there already a category of the same name exists ,
      let existingCategory = await CategoryPage.find({ name: category });
      if (existingCategory.length < 1) {
        return CategoryPage.create({ name: category }).then(newCat => {
          console.log("Adding to models");
          newModels.push({ name: category, id: newCat.id });
          return true;
        });
      } else {
        return false;
      }
      // if so, do nothing,
      // else initialize a new category;
    });
    return resolve(resp);
  });

  return await wait.then(resp => {
    console.log(resp, "true");
    if (newModels.length > 0) {
      return {
        intialization: true,
        models: newModels
      };
    } else {
      return {
        intialization: false,
        models: []
      };
    }
  });
};
