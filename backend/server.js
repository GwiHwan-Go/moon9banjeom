require("dotenv").config();
import express from "express";
import { ApolloServer} from "apollo-server-express";
import {typeDefs, resolvers} from "./schema";
import { getUser, protectResolver, seenList } from "./users/users.utils";
import logger from "morgan";
const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  context: async(prop)=> {
    return {
      loggedInUser : await getUser(prop.req.headers.token),
      // seenList : await seenList(prop.req.headers.token),
    }
  }}
);

const PORT = process.env.PORT;
const app = express();
app.use(logger("tiny"));
apollo.applyMiddleware({ app });
app.use("/static", express.static("uploads"));
app.listen({ port: PORT }, () => {
  console.log(`🚀Server is running on http://localhost:${PORT}/graphql ✅`);
});