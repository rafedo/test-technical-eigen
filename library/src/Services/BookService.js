const { getRepository } = require('typeorm');
const Book = require('../Models/Book');
const Member = require('../Models/Member');

class BookService {
  async getAllBooks() {
    const bookRepository = getRepository(Book);
    return await bookRepository.find();
  }

  async borrowBook(memberCode, bookCode) {
    const memberRepository = getRepository(Member);
    const bookRepository = getRepository(Book);

    const member = await memberRepository.findOne({ where: { code: memberCode } });
    const book = await bookRepository.findOne({ where: { code: bookCode } });

    if (!member) throw new Error('Member not found');
    if (!book || book.stock <= 0) throw new Error('Book not available');

    // Logika peminjaman buku
    book.stock -= 1;
    await bookRepository.save(book);

    return { message: 'Book borrowed successfully' };
  }

  async returnBook(memberCode, bookCode, returnDate) {
    const memberRepository = getRepository(Member);
    const bookRepository = getRepository(Book);

    const member = await memberRepository.findOne({ where: { code: memberCode } });
    const book = await bookRepository.findOne({ where: { code: bookCode } });

    if (!member) throw new Error('Member not found');
    if (!book) throw new Error('Book not found');

    // Logika pengembalian buku
    const daysLate = (new Date(returnDate) - new Date(book.borrowedDate)) / (1000 * 60 * 60 * 24);
    if (daysLate > 7) {
      member.penaltyEndDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // 3 hari penalti
    }

    await memberRepository.save(member);
    book.stock += 1;
    await bookRepository.save(book);

    return { message: 'Book returned successfully' };
  }

  async addBook(bookData) {
    const bookRepository = getRepository(Book);

    const existingBook = await bookRepository.findOne({ where: { code: bookData.code } });
    if (existingBook) {
      throw new Error('Book with this code already exists');
    }

    const newBook = bookRepository.create(bookData);
    await bookRepository.save(newBook);

    return newBook;
  }
}

module.exports = new BookService();