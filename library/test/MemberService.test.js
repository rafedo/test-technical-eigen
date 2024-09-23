const { expect } = require('chai');
const sinon = require('sinon');
const MemberService = require('../src/Service/MemberService');
const { getRepository } = require('typeorm');

describe('MemberService', () => {
  let memberRepositoryStub;

  beforeEach(() => {
    memberRepositoryStub = sinon.stub(getRepository('Member'), 'findOne');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should add a new member', async () => {
    memberRepositoryStub.withArgs({ where: { code: 'M001' } }).returns(null);
    const newMember = await MemberService.addMember('M001', 'Angga');
    expect(newMember).to.have.property('code', 'M001');
  });

  it('should throw error when member already exists', async () => {
    memberRepositoryStub.withArgs({ where: { code: 'M001' } }).returns({});
    try {
      await MemberService.addMember('M001', 'Angga');
    } catch (error) {
      expect(error.message).to.equal('Member with this code already exists');
    }
  });

  it('should get all members', async () => {
    const members = [{ code: 'M001', name: 'Angga' }];
    sinon.stub(getRepository('Member'), 'find').returns(members);
    const result = await MemberService.getAllMembers();
    expect(result).to.deep.equal(members);
  });
});