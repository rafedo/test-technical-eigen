// src/controllers/BookController.js
const BookService = require('../Services/BookService');

exports.getAllBooks = async (req, res) => {
  try {
    const books = await BookService.getAllBooks();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.borrowBook = async (req, res) => {
  const { memberCode, bookCode } = req.body;
  try {
    const result = await BookService.borrowBook(memberCode, bookCode);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.returnBook = async (req, res) => {
  const { memberCode, bookCode, returnDate } = req.body;
  try {
    const result = await BookService.returnBook(memberCode, bookCode, returnDate);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.addBook = async (req, res) => {
  const { code, title, author, stock } = req.body;
  try {
    const newBook = await BookService.addBook({ code, title, author, stock });
    res.status(201).json(newBook); // Status 201 untuk Created
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};