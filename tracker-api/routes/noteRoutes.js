
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
    createNote,
    getAllNotes,
    getNoteById,
    updateNote,
    deleteNote
} = require("../controllers/noteController");

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: Notes management endpoints
 */

/**
 * @swagger
 * /notes:
 *   get:
 *     summary: Get all notes
 *     tags: [Notes]
 *     responses:
 *       200:
 *         description: List of notes
 *         content:
 *           application/json:
 *             example:
 *               - id: 111222333
 *                 taskId: 123456789
 *                 content: Excellent progress on the MongoDB task.
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               message: Failed to fetch notes
 *               error: Database error
 */
router.get("/", getAllNotes);

/**
 * @swagger
 * /notes/{id}:
 *   get:
 *     summary: Get a note by ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 111222333
 *     responses:
 *       200:
 *         description: Note found
 *         content:
 *           application/json:
 *             example:
 *               id: 111222333
 *               taskId: 123456789
 *               content: Excellent progress on the MongoDB task.
 *       404:
 *         description: Note not found
 *         content:
 *           application/json:
 *             example:
 *               message: Note not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               message: Failed to fetch note
 *               error: Database error
 */
router.get("/:id", getNoteById);

/**
 * @swagger
 * /notes:
 *   post:
 *     summary: Create a new note
 *     tags: [Notes]
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
 *               - content
 *             properties:
 *               taskId:
 *                 type: integer
 *                 example: 123456789
 *               content:
 *                 type: string
 *                 example: Excellent progress on the MongoDB task.
 *     responses:
 *       201:
 *         description: Note created successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 111222333
 *               taskId: 123456789
 *               content: Excellent progress on the MongoDB task.
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
 *               message: Task not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               message: Failed to create note
 *               error: Database error
 */
router.post("/", authMiddleware, createNote);

/**
 * @swagger
 * /notes/{id}:
 *   put:
 *     summary: Update a note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 111222333
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 example: Updated note about the task progress.
 *     responses:
 *       200:
 *         description: Note updated successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 111222333
 *               taskId: 123456789
 *               content: Updated note about the task progress.
 *       401:
 *         description: Authentication required or token is invalid
 *         content:
 *           application/json:
 *             example:
 *               message: Authentication required
 *       404:
 *         description: Note not found
 *         content:
 *           application/json:
 *             example:
 *               message: Note not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               message: Failed to update note
 *               error: Database error
 */
router.put("/:id", authMiddleware, updateNote);

/**
 * @swagger
 * /notes/{id}:
 *   delete:
 *     summary: Delete a note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 111222333
 *     responses:
 *       200:
 *         description: Note deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Note deleted successfully
 *       401:
 *         description: Authentication required or token is invalid
 *         content:
 *           application/json:
 *             example:
 *               message: Authentication required
 *       404:
 *         description: Note not found
 *         content:
 *           application/json:
 *             example:
 *               message: Note not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               message: Failed to delete note
 *               error: Database error
 */
router.delete("/:id", authMiddleware, deleteNote);

module.exports = router;
