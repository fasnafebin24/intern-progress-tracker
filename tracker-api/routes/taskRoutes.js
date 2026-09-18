
const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
} = require("../controllers/taskController");

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management endpoints
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - internId
 *               - title
 *               - status
 *             properties:
 *               internId:
 *                 type: integer
 *                 example: 123456789
 *               title:
 *                 type: string
 *                 example: Build MongoDB Integration
 *               status:
 *                 type: string
 *                 example: Done
 *     responses:
 *       201:
 *         description: Task created successfully
 *       401:
 *         description: Authentication required or token is invalid/expired
 *         content:
 *           application/json:
 *             example:
 *               message: Authentication required
 *       404:
 *         description: Intern not found
 *         content:
 *           application/json:
 *             example:
 *               message: Intern not found
 *       500:
 *         description: Failed to create task
 *         content:
 *           application/json:
 *             example:
 *               message: Failed to create task
 *               error: Database error
 */
router.post("/", authMiddleware, createTask);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: List of all tasks
 *         content:
 *           application/json:
 *             example:
 *               - id: 123456789
 *                 internId: 987654321
 *                 title: Build MongoDB Integration
 *                 status: Done
 *       500:
 *         description: Failed to fetch tasks
 *         content:
 *           application/json:
 *             example:
 *               message: Failed to fetch tasks
 *               error: Database error
 */
router.get("/", getAllTasks);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 123456789
 *     responses:
 *       200:
 *         description: Task details
 *         content:
 *           application/json:
 *             example:
 *               id: 123456789
 *               internId: 987654321
 *               title: Build MongoDB Integration
 *               status: Done
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             example:
 *               message: Task not found
 *       500:
 *         description: Failed to fetch task
 *         content:
 *           application/json:
 *             example:
 *               message: Failed to fetch task
 *               error: Database error
 */
router.get("/:id", getTaskById);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 123456789
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               internId:
 *                 type: integer
 *                 example: 123456789
 *               title:
 *                 type: string
 *                 example: Build MongoDB Integration
 *               status:
 *                 type: string
 *                 example: Done
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       401:
 *         description: Authentication required or token is invalid/expired
 *         content:
 *           application/json:
 *             example:
 *               message: Authentication required
 *       404:
 *         description: Task or intern not found
 *         content:
 *           application/json:
 *             examples:
 *               taskNotFound:
 *                 summary: Task not found
 *                 value:
 *                   message: Task not found
 *               internNotFound:
 *                 summary: Intern not found
 *                 value:
 *                   message: Intern not found
 *       500:
 *         description: Failed to update task
 *         content:
 *           application/json:
 *             example:
 *               message: Failed to update task
 *               error: Database error
 */
router.put("/:id", authMiddleware, updateTask);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 123456789
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Task deleted successfully
 *       401:
 *         description: Authentication required or token is invalid/expired
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
 *         description: Failed to delete task
 *         content:
 *           application/json:
 *             example:
 *               message: Failed to delete task
 *               error: Database error
 */
router.delete("/:id", authMiddleware, deleteTask);

module.exports = router;
