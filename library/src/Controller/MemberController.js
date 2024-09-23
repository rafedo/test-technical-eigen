const MemberService = require('../Services/MemberService');

exports.getAllMembers = async (req, res) => {
  try {
    const members = await MemberService.getAllMembers();
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addMember = async (req, res) => {
  const { code, name } = req.body;
  try {
    const newMember = await MemberService.addMember(code, name);
    res.status(201).json(newMember);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.checkMemberPenalty = async (req, res) => {
  const { memberCode } = req.params;
  try {
    const result = await MemberService.checkMemberPenalty(memberCode);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};