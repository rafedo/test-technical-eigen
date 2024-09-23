const express = require('express');
const bookController = require('../Controller/BookController');
const router = express.Router();

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books
 *     description: Retrieve a list of all books in the library.
 *     responses:
 *       200:
 *         description: List of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
router.get('/books', bookController.getAllBooks);

/**
 * @swagger
 * /api/books/borrow:
 *   post:
 *     summary: Borrow a book
 *     description: Borrow a book by specifying member code and book code.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberCode:
 *                 type: string
 *                 example: 'M001'
 *               bookCode:
 *                 type: string
 *                 example: 'JK-45'
 *     responses:
 *       200:
 *         description: Book borrowed successfully
 *       404:
 *         description: Book or member not found
 *       500:
 *         description: Server error
 */
router.post('/books/borrow', bookController.borrowBook);

/**
 * @swagger
 * /api/books/return:
 *   post:
 *     summary: Return a book
 *     description: Return a book by specifying member code, book code, and return date.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberCode:
 *                 type: string
 *                 example: 'M001'
 *               bookCode:
 *                 type: string
 *                 example: 'JK-45'
 *               returnDate:
 *                 type: string
 *                 format: date
 *                 example: '2024-09-15'
 *     responses:
 *       200:
 *         description: Book returned successfully
 *       404:
 *         description: Book or member not found
 *       500:
 *         description: Server error
 */
router.post('/books/return', bookController.returnBook);

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Add a new book
 *     description: Add a new book to the library.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: 'JK-45'
 *               title:
 *                 type: string
 *                 example: 'Harry Potter'
 *               author:
 *                 type: string
 *                 example: 'J.K. Rowling'
 *               stock:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       201:
 *         description: Book added successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/books', bookController.addBook);
module.exports = router;
