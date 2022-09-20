const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");

// load schema and resolvers
const typeDefs = require("./schema/schema");
const resolvers = require("./resolver/resolver");

// load db methods
const mongoDataMethods = require("./data/db");

// connect to mongodb
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://tuchan:tu17102002@learn-graphql.fmvbt8k.mongodb.net/learn-graphql?retryWrites=true&w=majority"
    );
    console.log("mongodb connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ mongoDataMethods }),
});

const app = express();
server.start().then((res) => {
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () => {
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
  });
});
