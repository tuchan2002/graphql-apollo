const { books, authors } = require("../data/static");
const Author = require("../models/Author");
const Book = require("../models/Book");
const resolvers = {
  // QUERY
  Query: {
    books: async (parent, args, { mongoDataMethods }) =>
      await mongoDataMethods.getAllBooks(),
    book: async (parent, { id }, { mongoDataMethods }) =>
      await mongoDataMethods.getBookById(id),
    authors: async (parent, args, { mongoDataMethods }) =>
      await mongoDataMethods.getAllAuthors(),
    author: async (parent, { id }, { mongoDataMethods }) =>
      await mongoDataMethods.getAuthorById(id),
  },
  Book: {
    author: async (parent, args, { mongoDataMethods }) => {
      // parent la cai return cua truy van truoc do
      console.log("Book", parent, args);
      return await mongoDataMethods.getAuthorById(parent.authorId);
    },
  },
  Author: {
    books: async (parent, args, { mongoDataMethods }) => {
      // parent la cai return cua truy van truoc do
      console.log("Author", parent, args);
      return await mongoDataMethods.getAllBooks({ authorId: parent.id });
    },
  },

  // MUTATION
  Mutation: {
    createAuthor: async (parent, args, { mongoDataMethods }) => {
      console.log("createAuthor", parent, args, mongoDataMethods);
      return await mongoDataMethods.createAuthor(args);
    },
    createBook: async (parent, args, { mongoDataMethods }) => {
      console.log("createBook", parent, args, mongoDataMethods);
      return await mongoDataMethods.createBook(args);
    },
  },
};

module.exports = resolvers;
