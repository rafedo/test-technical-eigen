const { expect } = require('chai');
const sinon = require('sinon');
const MemberController = require('../src/Controller/MemberController');
const MemberService = require('../src/Service/MemberService');

describe('MemberController', () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: {},
      body: {},
    };
    res = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
    };
  });

  it('should return all members', async () => {
    req.params = {};
    const members = [{ code: 'M001', name: 'Angga' }];
    sinon.stub(MemberService, 'getAllMembers').returns(members);
    
    await MemberController.getAllMembers(req, res);
    
    expect(res.json.calledOnce).to.be.true;
    expect(res.json.firstCall.args[0]).to.deep.equal(members);
  });

  it('should add a new member', async () => {
    req.body = { code: 'M002', name: 'Ferry' };
    const newMember = { code: 'M002', name: 'Ferry' };
    sinon.stub(MemberService, 'addMember').returns(newMember);
    
    await MemberController.addMember(req, res);
    
    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledOnce).to.be.true;
    expect(res.json.firstCall.args[0]).to.deep.equal(newMember);
  });

  it('should return error on add member failure', async () => {
    req.body = { code: 'M001', name: 'Angga' };
    sinon.stub(MemberService, 'addMember').throws(new Error('Member with this code already exists'));
    
    await MemberController.addMember(req, res);
    
    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledOnce).to.be.true;
    expect(res.json.firstCall.args[0]).to.deep.equal({ message: 'Member with this code already exists' });
  });
});