const Evaluation = require("../models/evaluationModel");
const Task = require("../models/taskModel");
const axios = require("axios");

// Create Evaluation
const createEvaluation = async (req, res) => {
    try {
        const { taskId, score, notes } = req.body;

        const task = await Task.findOne({
            id: Number(taskId)
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        // Evaluation score must be between 1 and 5
        if (score < 1 || score > 5) {
            return res.status(400).json({
                message: "Score must be between 1 and 5"
            });
        }

        const newEvaluation = await Evaluation.create({
            id: Date.now(),
            taskId: Number(taskId),
            score: Number(score),
            notes
        });

        // Notify Digest Service
        try {
            await axios.post("http://localhost:4000/notify", {
                notification: {
                    taskId: newEvaluation.taskId,
                    score: newEvaluation.score,
                    notes: newEvaluation.notes
                }
            });
        } catch (error) {
            console.log(
                "Digest Service is unavailable:",
                error.message
            );
        }

        res.status(201).json(newEvaluation);

    } catch (error) {
        res.status(500).json({
            message: "Failed to create evaluation",
            error: error.message
        });
    }
};

// Get All Evaluations
const getAllEvaluations = async (req, res) => {
    try {
        const evaluations = await Evaluation.find();
        res.json(evaluations);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch evaluations",
            error: error.message
        });
    }
};

// Get Evaluation By ID
const getEvaluationById = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const evaluation = await Evaluation.findOne({ id });

        if (!evaluation) {
            return res.status(404).json({
                message: "Evaluation not found"
            });
        }

        res.json(evaluation);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch evaluation",
            error: error.message
        });
    }
};

// Update Evaluation
const updateEvaluation = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const evaluation = await Evaluation.findOne({ id });

        if (!evaluation) {
            return res.status(404).json({
                message: "Evaluation not found"
            });
        }

        const { taskId, score, notes } = req.body;

        if (taskId !== undefined) {
            const task = await Task.findOne({
                id: Number(taskId)
            });

            if (!task) {
                return res.status(404).json({
                    message: "Task not found"
                });
            }

            evaluation.taskId = Number(taskId);
        }

        if (score !== undefined) {
            if (score < 1 || score > 5) {
                return res.status(400).json({
                    message: "Score must be between 1 and 5"
                });
            }

            evaluation.score = Number(score);
        }

        if (notes !== undefined) {
            evaluation.notes = notes;
        }

        await evaluation.save();

        res.json(evaluation);

    } catch (error) {
        res.status(500).json({
            message: "Failed to update evaluation",
            error: error.message
        });
    }
};

// Delete Evaluation
const deleteEvaluation = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const evaluation = await Evaluation.findOneAndDelete({ id });

        if (!evaluation) {
            return res.status(404).json({
                message: "Evaluation not found"
            });
        }

        res.json({
            message: "Evaluation deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete evaluation",
            error: error.message
        });
    }
};

module.exports = {
    createEvaluation,
    getAllEvaluations,
    getEvaluationById,
    updateEvaluation,
    deleteEvaluation
};