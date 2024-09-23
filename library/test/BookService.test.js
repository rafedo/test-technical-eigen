const { expect } = require('chai');
const sinon = require('sinon');
const BookService = require('../src/Services/BookService');
const { getRepository } = require('typeorm');

describe('BookService', () => {
  let bookRepository;
  let memberRepository;

  beforeEach(() => {
    bookRepository = {
      find: sinon.stub(),
      findOne: sinon.stub(),
      save: sinon.stub(),
    };

    memberRepository = {
      findOne: sinon.stub(),
      save: sinon.stub(),
    };

    sinon.stub(getRepository('Book'), 'find').callsFake(bookRepository.find);
    sinon.stub(getRepository('Book'), 'findOne').callsFake(bookRepository.findOne);
    sinon.stub(getRepository('Book'), 'save').callsFake(bookRepository.save);
    sinon.stub(getRepository('Member'), 'findOne').callsFake(memberRepository.findOne);
    sinon.stub(getRepository('Member'), 'save').callsFake(memberRepository.save);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should get all books', async () => {
    const books = [{ code: 'JK-45', title: 'Harry Potter', stock: 1 }];
    bookRepository.find.returns(Promise.resolve(books));

    const result = await BookService.getAllBooks();
    expect(result).to.deep.equal(books);
  });

  it('should borrow a book', async () => {
    const member = { code: 'M001', name: 'Angga' };
    const book = { code: 'JK-45', title: 'Harry Potter', stock: 1 };

    memberRepository.findOne.withArgs({ where: { code: 'M001' } }).returns(Promise.resolve(member));
    bookRepository.findOne.withArgs({ where: { code: 'JK-45' } }).returns(Promise.resolve(book));

    const result = await BookService.borrowBook('M001', 'JK-45');
    expect(result).to.have.property('message', 'Book borrowed successfully');
    expect(book.stock).to.equal(0); 
  });

  it('should throw error if member not found when borrowing', async () => {
    bookRepository.findOne.withArgs({ where: { code: 'JK-45' } }).returns(Promise.resolve({ stock: 1 }));

    try {
      await BookService.borrowBook('M999', 'JK-45');
    } catch (error) {
      expect(error.message).to.equal('Member not found');
    }
  });

  it('should return a book', async () => {
    const member = { code: 'M001', penaltyEndDate: null };
    const book = { code: 'JK-45', borrowedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8), stock: 0 }; 

    memberRepository.findOne.withArgs({ where: { code: 'M001' } }).returns(Promise.resolve(member));
    bookRepository.findOne.withArgs({ where: { code: 'JK-45' } }).returns(Promise.resolve(book));

    const result = await BookService.returnBook('M001', 'JK-45', new Date());
    expect(result).to.have.property('message', 'Book returned successfully');
    expect(member.penaltyEndDate).to.not.be.null; 
  });
});
