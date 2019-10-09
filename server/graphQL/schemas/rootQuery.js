const graphql = require("graphql");
const mongoose = require("mongoose");

const Article = mongoose.model("articles");
const Reader = mongoose.model("readers");
const Author = mongoose.model("authors");
const Like = mongoose.model("likes");
const MainPage = mongoose.model("mainPage");
const CategoryPage = mongoose.model("categoryPages");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLEnumType
} = graphql;

//  Enum types defintiion  :

const fetchCategoryNameEnum = new GraphQLEnumType({
  name: "fetchCategoryNameEnum",
  values: {
    International: { value: "International" },
    US: { value: "US" },
    Politics: { value: "Politics" },
    Health: { value: "Health" },
    Technology: { value: "Technology" },
    Sports: { value: "Sports" },
    Opinion: { value: "Opinion" }
  }
});

//  *********************

// Input Types :
const fetchCategoryTempleteInputType = new GraphQLInputObjectType({
  name: "fetchCategoryTempleteInputType",
  fields: {
    name: { type: new GraphQLNonNull(fetchCategoryNameEnum) }
  }
});

//  ***********

//  Demo Query Files

const ArticleType = new GraphQLObjectType({
  name: "ArticleType",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    authorId: {
      type: AuthorType,
      resolve(parentVal, args, req) {
        return Article.getAuthor(parentVal.id);
      }
    },
    createdAt: {
      //  Later be resolved with original dates
      type: GraphQLString
    },
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parentVal, args, req) {
        return Article.getComments(parentVal.id);
      }
    },
    likes: {
      type: new GraphQLList(LikeType),
      resolve(parentVal, args, req) {
        return Article.getLikes(parentVal.id);
      }
    },
    category: { type: GraphQLString }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "AuthorType",
  fields: () => ({
    id: { type: GraphQLID },
    googleId: { type: GraphQLString },
    badge: { type: GraphQLString },
    initialized: { type: GraphQLBoolean },
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    articles: {
      // adding article type in the GraphQLList function
      type: new GraphQLList(ArticleType),
      resolve(parentVal, args, req) {
        return Author.getArticles(parentVal.id);
      }
    },
    comments: {
      // adding comments type in the following function
      type: new GraphQLList(CommentType),
      resolve(parentVal, args, req) {
        return Author.getComments(parentVal.id);
      }
    },
    likes: {
      type: new GraphQLList(LikeType),
      resolve(parentVal, args, req) {
        return Author.getLikes(parentVal.id);
      }
    }
  })
});

const CommentType = new GraphQLObjectType({
  name: "CommentType",
  fields: () => ({
    id: { type: GraphQLID },
    readerId: {
      type: ReaderType,
      resolve(parentVal, args, req) {
        //  resolving the query by polulating the reader
      }
    },
    content: {
      type: GraphQLString
    },
    articleId: {
      type: ArticleType,
      resolve(parentVal, args, req) {
        //  resolving the request by popluating the article,
        //  or by findiny the article
      }
    },
    createdAt: {
      //  Time Stamps will be set later in the graphQL, and the backened mongoose backend
      type: GraphQLString
    },
    authorId: {
      type: AuthorType,
      resolve(parentVal, args, req) {
        // resolving by returning the author
      }
    }
  })
});

const LikeType = new GraphQLObjectType({
  name: "LikeType",
  fields: () => ({
    id: { type: GraphQLID },
    readerId: {
      type: ReaderType,
      resolve(parentVal, args, req) {
        return Like.getReader(parentVal.id);
      }
    },
    articleId: {
      type: ArticleType,
      resolve(parentVal, args, req) {
        // resolve by finding the author and returning it
        return Like.getArticle(parentVal.id);
      }
    },
    createdAt: {
      type: GraphQLString
    },
    authorId: {
      type: AuthorType,
      resolve(parentVal, args, req) {
        // resolve by findng the author and returning it
        return Like.getAuthor(parentVal.id);
      }
    }
  })
});

const ReaderType = new GraphQLObjectType({
  name: "ReaderType",
  fields: () => ({
    id: { type: GraphQLID },
    googleId: { type: GraphQLString },
    badge: { type: GraphQLString },
    initialized: { type: GraphQLBoolean },
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    likes: {
      type: new GraphQLList(LikeType),
      resolve(parentVal, args, req) {
        //  resolving the query by populating all the likes
        return Reader.getLikes(parentVal.id);
      }
    },
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parentVal, args, req) {
        //  populating the comments of the readers
        return Reader.getComments(parentVal.id);
      }
    }

    //  We will add the view finctionality later,
  })
});

const CurrentUserType = new GraphQLObjectType({
  name: "CurrentUserType",
  fields: () => ({
    id: {
      type: GraphQLID
    },
    badge: {
      type: GraphQLString
    },
    initialized: {
      type: GraphQLBoolean
    }
  })
});

// Defining browser templetes types ;
const MainPageType = new GraphQLObjectType({
  name: "MainPage",
  fields: () => ({
    headline1: {
      type: ArticleType,
      resolve(parentVal, args, req) {
        //  resolving the MainPage and returning the headline 1 article;
        return Article.get(parentVal.headline1);
      }
    },
    headline2: {
      type: ArticleType,
      resolve(parentVal, args, req) {
        //  resolving the MainPage and returning the headline 1 article;
        return Article.get(parentVal.headline2);
      }
    },
    headline3: {
      type: ArticleType,
      resolve(parentVal, args, req) {
        //  resolving the MainPage and returning the headline 1 article;
        return Article.get(parentVal.headline3);
      }
    },
    headline4: {
      type: ArticleType,
      resolve(parentVal, args, req) {
        //  resolving the MainPage and returning the headline 1 article;
        return Article.get(parentVal.headline4);
      }
    },
    headline5: {
      type: ArticleType,
      resolve(parentVal, args, req) {
        //  resolving the MainPage and returning the headline 1 article;
        return Article.get(parentVal.headline5);
      }
    },
    editorsPick: {
      type: new GraphQLList(ArticleType),
      resolve(parentVal, args, req) {
        //  resolve by returning the editors Pick opinion-articles ;
        return parentVal.editorsPick.map(articleId => Article.get(articleId));
      }
    }
  })
});

const CategoryPageType = new GraphQLObjectType({
  name: "CategoryPageType",
  fields: () => ({
    headline1: {
      type: ArticleType,
      resolve(parentVal, args, req) {
        // resolve by returning the article ;
        return Article.get(parentVal.headline1);
      }
    },
    headline2: {
      type: ArticleType,
      resolve(parentVal, args, req) {
        // resolve by returning the article ;
        return Article.get(parentVal.headline2);
      }
    },
    headline3: {
      type: ArticleType,
      resolve(parentVal, args, req) {
        // resolve by returning the article ;
        return Article.get(parentVal.headline3);
      }
    }
  })
});

// *****************************

// **********************

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    currentUser: {
      type: CurrentUserType,
      resolve(parentVal, args, req) {
        return req.user;
      }
    },
    reader: {
      type: ReaderType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parentVal, args, req) {
        // finding the correct reader and returning it.
        return Reader.get(args.id);
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parentVal, args, req) {
        //  resolving the author query
        return Author.get(args.id);
      }
    },

    article: {
      type: ArticleType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parentVal, args, req) {
        //  finding the correct the article.
        return Article.get(args.id);
      }
    },
    comment: {
      type: CommentType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parentVal, args, req) {
        //  finding the comment
      }
    },

    // seperate queries section for the run time of the browser ,
    // including fetching the templetes;
    fetchMainTemplete: {
      type: MainPageType,
      resolve(parentVal, args, req) {
        return MainPage.findOne({});
      }
    },
    fetchCategoryTemplete: {
      type: CategoryPageType,
      args: {
        input: { type: fetchCategoryTempleteInputType }
      },
      resolve(parentVal, { input }, req) {
        return CategoryPage.findOne({ name: input.name });
      }
    }
    // *******************************************
  })
});

module.exports = {
  RootQueryType,
  CurrentUserType,
  ArticleType,
  ReaderType,
  AuthorType,
  CommentType,
  LikeType,
  MainPageType,
  CategoryPageType
};
