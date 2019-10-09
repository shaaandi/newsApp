const graphql = require("graphql");
const { setUserBadge, login, signup } = require("../../dbResources/auth/index");
const { CurrentUserType } = require("../schemas/rootQuery");

const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLError,
  GraphQLInputObjectType,
  GraphQLEnumType
} = graphql;

const loginInputType = new GraphQLInputObjectType({
  name: "loginInputType",
  fields: {
    username: {
      type: GraphQLString
    },
    password: {
      type: GraphQLString
    }
  }
});

const signupInputType_badgeEnumType = new GraphQLEnumType({
  name: "signupInputType_badgeEnumType",
  values: {
    AUTHOR: {
      value: "AUTHOR"
    },
    READER: {
      value: "READER"
    },
    CONTENT_MANAGER: {
      value: "CONTENT_MANAGER"
    }
  }
});

const signupInputType = new GraphQLInputObjectType({
  name: "signupInputType",
  fields: {
    username: {
      type: GraphQLNonNull(GraphQLString)
    },
    password: {
      type: GraphQLNonNull(GraphQLString)
    },
    badge: {
      type: signupInputType_badgeEnumType
    }
  }
});

module.exports = {
  setUserBadge: {
    type: CurrentUserType,
    args: {
      badge: {
        type: GraphQLNonNull(GraphQLString)
      },
      username: {
        type: GraphQLNonNull(GraphQLString)
      }
    },
    resolve(parentVal, args, req) {
      return setUserBadge(args, req);
    }
  },
  logout: {
    type: CurrentUserType,
    resolve(parentValue, args, req) {
      const { user } = req;
      req.logout();
      return user;
    }
  },
  login: {
    type: CurrentUserType,
    args: {
      input: { type: loginInputType }
    },
    resolve(parentVal, { input }, req) {
      //  resolve the request by login the user , and return the currentUser type of Logger User
      return login(input, req);
    }
  },
  signup: {
    type: CurrentUserType,
    args: {
      input: { type: signupInputType }
    },
    resolve(parentVal, { input }, req) {
      return signup(input, req);
    }
  }
};
