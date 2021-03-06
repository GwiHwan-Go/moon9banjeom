import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { offsetLimitPagination } from "@apollo/client/utilities";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");

const TOKEN = "token";

export const logUserIn = async (token) => {
  await AsyncStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
  tokenVar(token);
};
export const logUserOut = async () => {
  console.log("logout")
  await AsyncStorage.removeItem(TOKEN);
  await AsyncStorage.clear();
  isLoggedInVar(false);
  tokenVar(null);
  
};

const httpLink = createHttpLink({
  // uri: "http://localhost:4000/graphql",
  uri: "http://632d6601ab0d.ngrok.io/graphql",

});

const authLink = setContext((_, { headers}) => {
  console.log("before give header", tokenVar())
  return {
    headers: {
      ...headers,
      token: tokenVar(),
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache : new InMemoryCache({
    typePolicies:{
      Query: {
        fields: {
          seePhoto : offsetLimitPagination(),
          seeSeenPhoto : offsetLimitPagination(),
          seeLikedPhoto : offsetLimitPagination(),
          seeUploadedPhoto : offsetLimitPagination(),
        }
      }
    }
  }),
});
export default client;