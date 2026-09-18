
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
    createEvaluation,
    getAllEvaluations,
    getEvaluationById,
    updateEvaluation,
    deleteEvaluation
} = require("../controllers/evaluationController");

/**
 * @swagger
 * tags:
 *   name: Evaluations
 *   description: Evaluation management endpoints
 */

/**
 * @swagger
 * /evaluations:
 *   post:
 *     summary: Create a new evaluation
 *     tags: [Evaluations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - taskId
 *               - score
 *             properties:
 *               taskId:
 *                 type: integer
 *                 example: 123456789
 *               score:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 5
 *               notes:
 *                 type: string
 *                 example: Excellent work on the task.
 *     responses:
 *       201:
 *         description: Evaluation created successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 987654321
 *               taskId: 123456789
 *               score: 5
 *               notes: Excellent work on the task.
 *       400:
 *         description: Score is outside the allowed range
 *         content:
 *           application/json:
 *             example:
 *               message: Score must be between 1 and 5
 *       401:
 *         description: Authentication required or token is invalid
 *         content:
 *           application/json:
 *             example:
 *               message: Authentication required
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             example:
 *               message: Intern not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               message: Failed to create evaluation
 *               error: Database error
 */
router.post("/", authMiddleware, createEvaluation);

/**
 * @swagger
 * /evaluations:
 *   get:
 *     summary: Get all evaluations
 *     tags: [Evaluations]
 *     responses:
 *       200:
 *         description: List of evaluations
 *         content:
 *           application/json:
 *             example:
 *               - id: 987654321
 *                 taskId: 123456789
 *                 score: 5
 *                 notes: Excellent work on the task.
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               message: Failed to fetch evaluations
 *               error: Database error
 */
router.get("/", getAllEvaluations);

/**
 * @swagger
 * /evaluations/{id}:
 *   get:
 *     summary: Get an evaluation by ID
 *     tags: [Evaluations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 987654321
 *     responses:
 *       200:
 *         description: Evaluation found
 *         content:
 *           application/json:
 *             example:
 *               id: 987654321
 *               taskId: 123456789
 *               score: 5
 *               notes: Excellent work on the task.
 *       404:
 *         description: Evaluation not found
 *         content:
 *           application/json:
 *             example:
 *               message: Evaluation not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               message: Failed to fetch evaluation
 *               error: Database error
 */
router.get("/:id", getEvaluationById);

/**
 * @swagger
 * /evaluations/{id}:
 *   put:
 *     summary: Update an evaluation
 *     tags: [Evaluations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 987654321
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               taskId:
 *                 type: integer
 *                 example: 123456789
 *               score:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 4
 *               notes:
 *                 type: string
 *                 example: Good progress.
 *     responses:
 *       200:
 *         description: Evaluation updated successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 987654321
 *               taskId: 123456789
 *               score: 4
 *               notes: Good progress.
 *       400:
 *         description: Score is outside the allowed range
 *         content:
 *           application/json:
 *             example:
 *               message: Score must be between 1 and 5
 *       401:
 *         description: Authentication required or token is invalid
 *         content:
 *           application/json:
 *             example:
 *               message: Authentication required
 *       404:
 *         description: Evaluation or task not found
 *         content:
 *           application/json:
 *             example:
 *               message: Evaluation not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               message: Failed to update evaluation
 *               error: Database error
 */
router.put("/:id", authMiddleware, updateEvaluation);

/**
 * @swagger
 * /evaluations/{id}:
 *   delete:
 *     summary: Delete an evaluation
 *     tags: [Evaluations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 987654321
 *     responses:
 *       200:
 *         description: Evaluation deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Evaluation deleted successfully
 *       401:
 *         description: Authentication required or token is invalid
 *         content:
 *           application/json:
 *             example:
 *               message: Authentication required
 *       404:
 *         description: Evaluation not found
 *         content:
 *           application/json:
 *             example:
 *               message: Evaluation not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               message: Failed to delete evaluation
 *               error: Database error
 */
router.delete("/:id", authMiddleware, deleteEvaluation);

module.exports = router;
