const express = require('express');
const memberController = require('../Controller/MemberController');
const router = express.Router();

/**
 * @swagger
 * /api/members:
 *   get:
 *     summary: Get all members
 *     description: Retrieve a list of all members in the library.
 *     responses:
 *       200:
 *         description: List of members
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Member'
 */
router.get('/members', memberController.getAllMembers);

/**
 * @swagger
 * /api/members:
 *   post:
 *     summary: Add a new member
 *     description: Add a new member to the library.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: 'M001'
 *               name:
 *                 type: string
 *                 example: 'Angga'
 *     responses:
 *       201:
 *         description: Member added successfully
 *       500:
 *         description: Server error
 */
router.post('/members', memberController.addMember);

/**
 * @swagger
 * /api/members/{memberCode}/penalty:
 *   get:
 *     summary: Check member penalty
 *     description: Check if the member is currently penalized.
 *     parameters:
 *       - in: path
 *         name: memberCode
 *         required: true
 *         description: Member code
 *         schema:
 *           type: string
 *           example: 'M001'
 *     responses:
 *       200:
 *         description: Penalty status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 memberCode:
 *                   type: string
 *                 isPenalized:
 *                   type: boolean
 *                 penaltyEndDate:
 *                   type: string
 *                   format: date
 *       404:
 *         description: Member not found
 *       500:
 *         description: Server error
 */
router.get('/members/:memberCode/penalty', memberController.checkMemberPenalty);

module.exports = router;