const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    createIntern,
    getAllInterns,
    getInternById,
    updateIntern,
    deleteIntern
} = require("../controllers/internController");

/**
 * @swagger
 * tags:
 *   name: Interns
 *   description: Intern management endpoints
 */

/**
 * @swagger
 * /interns:
 *   post:
 *     summary: Create a new intern
 *     tags: [Interns]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - startDate
 *               - track
 *             properties:
 *               name:
 *                 type: string
 *                 example: Fasna Febin
 *               email:
 *                 type: string
 *                 example: fasna@example.com
 *               startDate:
 *                 type: string
 *                 example: "2026-09-01"
 *               track:
 *                 type: string
 *                 example: Cloud Native Development
 *     responses:
 *       201:
 *         description: Intern created successfully
 *       401:
 *         description: Authentication required or token is invalid/expired
 *         content:
 *           application/json:
 *             example:
 *               message: Authentication required
 *       500:
 *         description: Failed to create intern
 *         content:
 *           application/json:
 *             example:
 *               message: Failed to create intern
 *               error: Database error
 */
router.post("/", authMiddleware, createIntern);

/**
 * @swagger
 * /interns:
 *   get:
 *     summary: Get all interns
 *     tags: [Interns]
 *     responses:
 *       200:
 *         description: List of all interns
 *         content:
 *           application/json:
 *             example:
 *               - id: 123456789
 *                 name: Fasna Febin
 *                 email: fasna@example.com
 *                 startDate: "2026-09-01"
 *                 track: Cloud Native Development
 *       500:
 *         description: Failed to fetch interns
 *         content:
 *           application/json:
 *             example:
 *               message: Failed to fetch interns
 *               error: Database error
 */
router.get("/", getAllInterns);

/**
 * @swagger
 * /interns/{id}:
 *   get:
 *     summary: Get an intern by ID
 *     tags: [Interns]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 123456789
 *     responses:
 *       200:
 *         description: Intern details
 *         content:
 *           application/json:
 *             example:
 *               id: 123456789
 *               name: Fasna Febin
 *               email: fasna@example.com
 *               startDate: "2026-09-01"
 *               track: Cloud Native Development
 *       404:
 *         description: Intern not found
 *         content:
 *           application/json:
 *             example:
 *               message: Intern not found
 *       500:
 *         description: Failed to fetch intern
 *         content:
 *           application/json:
 *             example:
 *               message: Failed to fetch intern
 *               error: Database error
 */
router.get("/:id", getInternById);

/**
 * @swagger
 * /interns/{id}:
 *   put:
 *     summary: Update an intern
 *     tags: [Interns]
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
 *               name:
 *                 type: string
 *                 example: Fasna Febin
 *               email:
 *                 type: string
 *                 example: fasna@example.com
 *               startDate:
 *                 type: string
 *                 example: "2026-09-01"
 *               track:
 *                 type: string
 *                 example: Cloud Native Development
 *     responses:
 *       200:
 *         description: Intern updated successfully
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
 *         description: Failed to update intern
 *         content:
 *           application/json:
 *             example:
 *               message: Failed to update intern
 *               error: Database error
 */
router.put("/:id", authMiddleware, updateIntern);

/**
 * @swagger
 * /interns/{id}:
 *   delete:
 *     summary: Delete an intern
 *     tags: [Interns]
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
 *         description: Intern deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Intern deleted successfully
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
 *         description: Failed to delete intern
 *         content:
 *           application/json:
 *             example:
 *               message: Failed to delete intern
 *               error: Database error
 */
router.delete("/:id", authMiddleware, deleteIntern);

module.exports = router;