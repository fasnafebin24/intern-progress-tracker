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

router.post("/", authMiddleware, createEvaluation);

router.get("/", getAllEvaluations);

router.get("/:id", getEvaluationById);

router.put("/:id", authMiddleware, updateEvaluation);

router.delete("/:id", authMiddleware, deleteEvaluation);

module.exports = router;