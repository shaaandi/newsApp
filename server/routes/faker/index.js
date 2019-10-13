const faker = require("faker");

const bcrypt = require("bcrypt-nodejs");
const crypto = require("crypto");

const mongoose = require("mongoose");
const Author = mongoose.model("authors");
const Reader = mongoose.model("readers");
const ContentManager = mongoose.model("contentManagers");
const Article = mongoose.model("articles");
const Like = mongoose.model("likes");
const Comment = mongoose.model("comments");

const helper_isUsernameUnique = async username => {
  let author = await Author.findOne({ username });
  let contentManager = await ContentManager.findOne({ username });
  let reader = await Reader.findOne({ username });
  if (contentManager) return false;
  else if (author) return false;
  else if (reader) return false;
  else return true;
};

async function generateFakeAuthor() {
  isUnique = false;
  let fName;
  let lName;
  let username;
  while (!isUnique) {
    fName = faker.name.findName();
    lName = faker.name.lastName();
    username = faker.internet.userName(fName.slice(0, 5), lName.slice(0, 3));
    isUnique = await helper_isUsernameUnique(username);
  }

  let email = faker.internet.email(fName, lName);
  let phoneNumber = faker.phone.phoneNumber("(###) ###-####");
  let city = faker.address.city();
  let street = faker.address.streetAddress();
  let country = faker.address.country();
  let profileImg = faker.image.avatar();

  // setting passord to password string ,and pasing initialize to true;
  let password = "password";
  let initialized = true;
  console.log(username, "---username");
  return {
    fName,
    lName,
    username,
    email,
    phoneNumber,
    address: {
      city,
      street,
      country
    },
    profileImg,
    password,
    initialized
  };
}

async function generateFakeReader() {
  isUnique = false;
  let fName;
  let lName;
  let username;
  while (!isUnique) {
    fName = faker.name.findName();
    lName = faker.name.lastName();
    username = faker.internet.userName(fName.slice(0, 5), lName.slice(0, 3));
    isUnique = await helper_isUsernameUnique(username);
  }

  let email = faker.internet.email(fName, lName);
  let phoneNumber = faker.phone.phoneNumber("(###) ###-####");
  let city = faker.address.city();
  let street = faker.address.streetAddress();
  let country = faker.address.country();
  let profileImg = faker.image.avatar();

  // setting passord to password string ,and pasing initialize to true;
  let plainText = "password";
  // generating a hashed password myself, because , we need to save its hashed verison;
  var salt = await bcrypt.genSaltSync(10);
  let password = await bcrypt.hashSync(plainText, salt);
  // **************************************

  let initialized = true;
  return {
    fName,
    lName,
    username,
    email,
    phoneNumber,
    address: {
      city,
      street,
      country
    },
    profileImg,
    password,
    initialized
  };
}

async function generateFakeReaders(count) {
  //  taking a num and then generating a large amount of fake data, and returning the
  // array of the fake data ;
  let readers = [];
  let finished = false;
  for (i = 0; i < count; i++) {
    let reader = await generateFakeReader();
    console.log(`--fakeReaderGenerator : creating reader no : ${i} :)`);
    readers.push(reader);
    if (readers.length === count) finished = true;
  }
  if (finished) return readers;
}

function randomArticleContent() {
  let paragraphCount = Math.floor(Math.random() * 14) + 6;
  let paragraphs = [];
  let complete = false;
  for (i = 0; i < paragraphCount; i++) {
    let words = faker.random.words(40);
    paragraphs.push(words);
    if (paragraphs.length === paragraphCount - 1) complete = true;
  }
  if (complete) {
    return paragraphs;
  }
}

function getRandomCategory() {
  let categories = [
    "International",
    "US",
    "Politics",
    "Health",
    "Technology",
    "Sports",
    "Opinion"
  ];
  let randomNum = Math.floor(Math.random() * categories.length);
  return categories[randomNum];
}

function generateFakeArticle() {
  // returning fake data for the article model;
  let randomTitleSeed = Math.floor(Math.random() * 9) + 1;
  let title = faker.random.words(randomTitleSeed);
  let content = randomArticleContent();
  let category = getRandomCategory();
  let createdAt = faker.date.recent(365);
  return {
    title,
    content,
    category,
    createdAt
  };
}

async function generateFakeLike({ articles, readers }) {
  // faking a createdAt prop, that should be greater than the article createdAt prop thing,
  // so first we need to choose the random article and then create the article;
  let randomArticleNum = Math.floor(Math.random() * articles.length);
  let randomReaderNum = Math.floor(Math.random() * readers.length);
  let { id: aId } = articles[randomArticleNum];
  let { id: rId } = readers[randomReaderNum];

  let article = await Article.findById(aId);
  let reader = await Reader.findById(rId);
  // creating a timeStap for the like ;
  let createdAt = faker.date.between(article.createdAt, new Date());

  // creating the like,
  let like = new Like({
    articleId: article.id,
    readerId: reader.id,
    createdAt
  });

  let readerLikes = [...reader.likes, like.id];
  let articleLikes = [...article.likes, like.id];
  // saving article and reader with updated list of their likes, and the like will be returned and then
  //  bulked saved in the fake likes generation call request ;

  // saving and updating all the documents;
  let updatedReader = await Reader.findByIdAndUpdate(
    reader.id,
    { likes: readerLikes },
    { omitUndefined: true, new: true }
  );
  let updatedArticle = await Article.findByIdAndUpdate(
    article.id,
    { likes: articleLikes },
    { omitUndefined: true, new: true }
  );
  let savedLike = await like.save();
  return { savedLike, updatedArticle, updatedReader };

  // article.createdAt Prop ;
}

async function generateFakeComment({ articles, readers }) {
  // faking a createdAt prop, that should be greater than the article createdAt prop thing,
  // so first we need to choose the random article and then create the article;
  let randomArticleNum = Math.floor(Math.random() * articles.length);
  let randomReaderNum = Math.floor(Math.random() * readers.length);
  let { id: aId } = articles[randomArticleNum];
  let { id: rId } = readers[randomReaderNum];

  let article = await Article.findById(aId);
  let reader = await Reader.findById(rId);
  // creating a timeStap for the like ;
  let createdAt = faker.date.between(article.createdAt, new Date());
  let randomContentCount = Math.floor(Math.random() * 22) + 4;
  let content = faker.random.words(randomContentCount);
  // creating the like,
  let comment = new Comment({
    articleId: article.id,
    readerId: reader.id,
    createdAt,
    content
  });

  let readerComments = [...reader.comments, comment.id];
  let articleComments = [...article.comments, comment.id];
  // saving article and reader with updated list of their likes, and the like will be returned and then
  //  bulked saved in the fake likes generation call request ;

  // saving and updating all the documents;
  let updatedReader = await Reader.findByIdAndUpdate(
    reader.id,
    { comments: readerComments },
    { omitUndefined: true, new: true }
  );
  let updatedArticle = await Article.findByIdAndUpdate(
    article.id,
    { comments: articleComments },
    { omitUndefined: true, new: true }
  );
  let savedComment = await comment.save();
  return { savedComment, updatedArticle, updatedReader };

  // article.createdAt Prop ;
}

module.exports = app => {
  app.get("/fake", (req, res) => {
    let fName = faker.name.findName();
    let lName = faker.name.lastName();
    let email = faker.internet.email(fName, lName);
    let phoneNumber = faker.phone.phoneNumber("(###) ###-####");
    let address_city = faker.address.city();
    let address_street = faker.address.streetAddress();
    let address_country = faker.address.country();
    let profileImg = faker.image.avatar();
    let random = Math.floor(Math.random() * 9) + 1;
    let learn = faker.date.between(new Date("2019-08-5"), new Date());
    //  generating random article content ;

    console.log(learn);
    let data = {
      fName,
      lName,
      email,
      phoneNumber,
      profileImg
    };
    let templete = `
    <html>
        <head>
        </head>
        <body>
            <div>
                <div>Name : ${fName}, ${lName}</div>
                <div>email : ${email} </div>
                <div>Phone Number : ${phoneNumber}</div>
                <div><img src='${profileImg}' /></div>
                <div>Address : ${address_street} ,${address_city}, ${address_country}</div>
                <div>${learn}</div>
            </div>
        </body>
    </html>
    `;
    return res.send(templete);
  });

  //  creating alot of fake authors  ;
  app.get("/fake/generate/authors", async (req, res) => {
    for (i = 0; i < 500; i++) {
      let data = await generateFakeAuthor();
      let author = await new Author({ ...data }).save();
      console.log(
        `--creating new fake author , id : ${author.id} , count : ${i}`
      );
    }
    res.send(true);
  });

  app.get("/fake/generate/readers", async (req, res) => {
    let readers = await generateFakeReaders(1550);
    let docs = await Reader.collection.insert(readers);
    res.send(docs);
  });

  app.get("/fake/generate/articles", async (req, res) => {
    // getting all authors in our data base.
    let authors = await Author.find({});
    for (count = 0; count < 6500; count++) {
      let randomAuthorNum = Math.floor(Math.random() * authors.length);
      let data = generateFakeArticle();
      data.authorId = authors[randomAuthorNum].id;
      let article = await new Article({ ...data }).save();
      let randomAuthor = await Author.findById(article.authorId);
      let newArticles = [...randomAuthor.articles, article.id];
      await Author.findByIdAndUpdate(
        randomAuthor.id,
        { articles: newArticles },
        { new: true, omitUndefined: true }
      );
      console.log(
        `--creating new article : id : ${article.id} , and author : ${randomAuthor.id} with count : ${count}`
      );
    }

    // authors.forEach(async author => {
    //   // setting a random number of articles for each user in the db;
    //   // adding 2 means that minimum number of articles can be 2;
    //   let finish = false;
    //   let numOfArticles = Math.floor(Math.random() * 30) + 2;
    //   let complete = false;
    //   let newArticles = [];
    //   for (count = 0; count < numOfArticles; count++) {
    //     let data = generateFakeArticle();
    //     data.authorId = author.id;
    //     let article = await new Article({ ...data }).save();
    //     // adding article id to the authors articles section and then saving the article in the end;
    //     newArticles.push(article.id);
    //     if (count === numOfArticles - 1) complete = true;
    //   }
    //   if (complete) {
    //     console.log(newArticles, "--console-articles");
    //     let updatedAuthor = Author.findByIdAndUpdate(
    //       author.id,
    //       { articles: newArticles },
    //       { new: true, omitUndefined: true }
    //     );
    //     if (updatedAuthor) finish = true;
    //   }
    //   if (finish) {
    //     return true;
    //   }
    // });
    // res.send(true);
  });

  app.get("/fake/query", async (req, res) => {
    let articles = await Article.find({
      createdAt: {
        $gte: new Date("2019-10-1")
      }
    }).select("comments");
    res.send(articles);

    // let author = await Author.findById("5da1d59ecfa99e286cdfbcad");
    // let updatedArticles = author.articles.filter(article => {
    //   if (article.equals("5da1defdf5e2f30b4c529e6a")) {
    //     return false;
    //   } else {
    //     return true;
    //   }
    // });
    // let updatedAuthor = await Author.findByIdAndUpdate(
    //   author.id,
    //   {
    //     articles: updatedArticles
    //   },
    //   {
    //     omitUndefined: true,
    //     new: true
    //   }
    // );
    // res.send({
    //   author,
    //   updatedAuthor
    // });
  });

  app.get("/fake/test/likes", async (req, res) => {
    //  creating a test for creating likes on the articles;
    let article = await Article.findById("5da1defcf5e2f30b4c529e69");
    let article2 = await Article.findById("5da1defdf5e2f30b4c529e6a");
    let articles = [article, article2];
    let readers = await Reader.find({})
      .sort("createdAt")
      .limit(10);
    for (i = 0; i < 20; i++) {
      let response = await generateFakeLike({ articles, readers });
      console.log(
        `--fake Like generation : with id ${response.savedLike.id} and count : ${i}`
      );
    }
  });

  app.get("/fake/generate/likes", async (req, res) => {
    console.log("--query Started");
    let articles = await Article.find({
      createdAt: {
        $gte: new Date("2019-10-1")
      }
    });
    let readers = await Reader.find({});
    for (i = 0; i < 580; i++) {
      let response = await generateFakeLike({ articles, readers });
      console.log(
        `--fake Like generation : with id ${response.savedLike.id} and count : ${i}`
      );
    }
    return true;
  });

  app.get("/fake/generate/comments", async (req, res) => {
    console.log("--query Started");
    let articles = await Article.find({
      createdAt: {
        $gte: new Date("2019-5-1")
      }
    });
    let readers = await Reader.find({});
    for (i = 0; i < 800; i++) {
      let response = await generateFakeComment({ articles, readers });
      console.log(
        `--fake Like generation : with id ${response.savedComment.id} and count : ${i}`
      );
    }
    return true;
  });

  // app.get("/fake/remedial/likes/:num", async (req, res) => {
  //   let num = req.params.num;
  //   //  we set a limit of 500 on the likes;
  //   let likes = await Like.find({})
  //     .skip(num * 500)
  //     .limit(200);
  //   likes.forEach(async (like, index) => {
  //     console.log(`-- count : ${index}`);
  //     let reader = await Reader.findById(like.readerId);
  //     let article = await Article.findById(like.articleId);
  //     console.log(
  //       `--remedial - reader ${reader.id} found, with pre likes num : ${reader.likes.length}`
  //     );
  //     console.log(
  //       `--remedial - article ${article.id} found, with pre likes num : ${article.likes.length}`
  //     );
  //     // checking if reader.likes already include this like id :
  //     if (reader.likes.indexOf(like.id) === -1) {
  //       console.log(`--remedial --adding like to reader Id`);
  //       reader.likes = [...reader.likes, like.id];
  //       await reader.save();
  //       console.log(`--remedial - new reader likes : ${reader.likes.length}`);
  //     }
  //     if (article.likes.indexOf(like.id) === -1) {
  //       console.log(`--remedial --adding like to article Id`);
  //       article.likes = [...article.likes, like.id];
  //       await article.save();
  //       console.log(`--remedial - new article likes : ${article.likes.length}`);
  //     }
  //   });
  // });
};
