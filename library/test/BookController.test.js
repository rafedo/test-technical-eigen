import { expect } from 'chai';
import sinon from 'sinon';
import BookController from '../src/Controller/BookController.mjs';
import BookService from '../src/Service/BookService.mjs';

describe('BookController', () => {
  let req, res;

  beforeEach(() => {
    req = { body: {}, params: {} };
    res = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
    };
  });

  it('should return all books', async () => {
    const books = [{ code: 'JK-45', title: 'Harry Potter' }];
    sinon.stub(BookService, 'getAllBooks').returns(Promise.resolve(books));

    await BookController.getAllBooks(req, res);
    
    expect(res.json.calledOnce).to.be.true;
    expect(res.json.firstCall.args[0]).to.deep.equal(books);
  });

  it('should borrow a book', async () => {
    req.body = { memberCode: 'M001', bookCode: 'JK-45' };
    const response = { message: 'Book borrowed successfully' };
    sinon.stub(BookService, 'borrowBook').returns(Promise.resolve(response));

    await BookController.borrowBook(req, res);
    
    expect(res.json.calledOnce).to.be.true;
    expect(res.json.firstCall.args[0]).to.deep.equal(response);
  });

  it('should return error on borrow book failure', async () => {
    req.body = { memberCode: 'M001', bookCode: 'JK-45' };
    sinon.stub(BookService, 'borrowBook').throws(new Error('Book not available'));

    await BookController.borrowBook(req, res);
    
    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledOnce).to.be.true;
    expect(res.json.firstCall.args[0]).to.deep.equal({ message: 'Book not available' });
  });

  it('should return a book', async () => {
    req.body = { memberCode: 'M001', bookCode: 'JK-45', returnDate: new Date().toISOString() };
    const response = { message: 'Book returned successfully' };
    sinon.stub(BookService, 'returnBook').returns(Promise.resolve(response));

    await BookController.returnBook(req, res);
    
    expect(res.json.calledOnce).to.be.true;
    expect(res.json.firstCall.args[0]).to.deep.equal(response);
  });

  it('should return error on return book failure', async () => {
    req.body = { memberCode: 'M001', bookCode: 'JK-45', returnDate: new Date().toISOString() };
    sinon.stub(BookService, 'returnBook').throws(new Error('Book not found'));

    await BookController.returnBook(req, res);
    
    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledOnce).to.be.true;
    expect(res.json.firstCall.args[0]).to.deep.equal({ message: 'Book not found' });
  });
});