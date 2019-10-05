const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean
} = graphql;

//  Demo Query Files

const ArticleType = new GraphQLObjectType({
  name: "ArticleType",
  fields: () => ({
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parentValue, args, req) {
        // finding the author of the article and return it
      }
    },
    createdAt: {
      //  Later be resolved with original dates
      type: GraphQLString
    },
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parentValue, args, req) {
        //  resolve the request by populating the comments
      }
    },
    likes: {
      type: new GraphQLList(LikeType),
      resolve(parentValue, args, req) {
        // resolve by populating the likes of the articles
      }
    },
    category: { type: GraphQLString }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "AuthorType",
  fields: () => ({
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    articles: {
      // adding article type in the GraphQLList function
      type: new GraphQLList(ArticleType),
      resolve(parentVal, args, req) {
        //  handling the requested query,
        // populating the articles section of the user
      }
    },
    comments: {
      // adding comments type in the following function
      type: new GraphQLList(CommentType),
      resolve(parentVal, args, req) {
        // resolving the comments by populating them .
      }
    },
    likes: {
      type: new GraphQLList(LikeType),
      resolve(parentVal, args, req) {
        // resolving the query by populating the likes prop
      }
    }
  })
});

const CommentType = new GraphQLObjectType({
  name: "CommentType",
  fields: () => ({
    readersId: {
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
    }
  })
});

const LikeType = new GraphQLObjectType({
  name: "LikeType",
  fields: () => ({
    readerId: {
      type: ReaderType,
      resolve(parentVal, args, req) {
        //   resolve by finding the reader and returning back
      }
    },
    articleId: {
      type: ArticleType,
      resolve(parentVal, args, req) {
        // resolve by finding the article and returning it
      }
    },
    createdAt: {
      type: GraphQLString
    }
  })
});

const ReaderType = new GraphQLObjectType({
  name: "ReaderType",
  fields: () => ({
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    likes: {
      type: new GraphQLList(LikeType),
      resolve(parentVal, args, req) {
        //  resolving the query by populating all the likes
      }
    },
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parentVal, args, req) {
        //  populating the comments of the readers
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
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parentVal, args, req) {
        //  resolving the author query
      }
    },

    article: {
      type: ArticleType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parentVal, args, req) {
        //  finding the correct the article.
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
    }
  })
});

module.exports = {
  RootQueryType,
  CurrentUserType
};
