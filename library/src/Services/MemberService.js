const { getRepository } = require('typeorm');
const Member = require('../Models/Member'); // Pastikan ini mengarah ke file yang benar

class MemberService {
  async getAllMembers() {
    const memberRepository = getRepository(Member);
    return await memberRepository.find();
  }

  async addMember(code, name) {
    const memberRepository = getRepository(Member);
    const existingMember = await memberRepository.findOne({ where: { code } });
    if (existingMember) {
      throw new Error('Member with this code already exists');
    }

    const newMember = memberRepository.create({ code, name });
    await memberRepository.save(newMember);

    return newMember;
  }

  async checkMemberPenalty(memberCode) {
    const memberRepository = getRepository(Member);
    const member = await memberRepository.findOne({ where: { code: memberCode } });
    if (!member) throw new Error('Member not found');

    const penaltyEndDate = member.penaltyEndDate;
    const isPenalized = penaltyEndDate && new Date() < new Date(penaltyEndDate);
    
    return { memberCode, isPenalized, penaltyEndDate };
  }
}

module.exports = new MemberService();