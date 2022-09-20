const Book = require("../models/Book");
const Author = require("../models/Author");

const mongoDataMethods = {
  getAllBooks: async (condition = null) =>
    condition ? await Book.find(condition) : await Book.find(),
  getBookById: async (id) => await Book.findById(id),
  getAllAuthors: async () => await Author.find(),
  getAuthorById: async (id) => {
    return await Author.findById(id);
  },
  createAuthor: async (args) => {
    const newAuthor = new Author(args);
    return await newAuthor.save();
  },
  createBook: async (args) => {
    const newBook = new Book(args);
    return await newBook.save();
  },
};

module.exports = mongoDataMethods;
