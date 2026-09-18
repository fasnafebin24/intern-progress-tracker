
const express = require("express");
const router = express.Router();

const {
    getInternSummary
} = require("../controllers/summaryController");

/**
 * @swagger
 * tags:
 *   name: Summary
 *   description: Intern progress summary endpoints
 */

/**
 * @swagger
 * /interns/{id}/summary:
 *   get:
 *     summary: Get an intern's progress summary
 *     tags: [Summary]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 123456789
 *     responses:
 *       200:
 *         description: Intern progress summary
 *         content:
 *           application/json:
 *             example:
 *               internId: 123456789
 *               totalTasks: 3
 *               completedTasks: 2
 *               averageScore: 4.5
 *               evaluations: []
 *       404:
 *         description: Intern not found
 *         content:
 *           application/json:
 *             example:
 *               message: Intern not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               message: Failed to generate intern summary
 *               error: Database error
 */
router.get("/interns/:id/summary", getInternSummary);

module.exports = router;
