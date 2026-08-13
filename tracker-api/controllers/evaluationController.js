const evaluations = require("../data/evaluations");
const tasks = require("../data/tasks");
const axios = require("axios");

const createEvaluation = async (req, res) => {
    const { taskId, score, notes } = req.body;

    const task = tasks.find(
        task => task.id === Number(taskId)
    );

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

    const newEvaluation = {
        id: Date.now(),
        taskId: Number(taskId),
        score: Number(score),
        notes
    };

    evaluations.push(newEvaluation);

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
};

const getAllEvaluations = (req, res) => {
    res.json(evaluations);
};

const getEvaluationById = (req, res) => {
    const id = Number(req.params.id);

    const evaluation = evaluations.find(e => e.id === id);

    if (!evaluation) {
        return res.status(404).json({
            message: "Evaluation not found"
        });
    }

    res.json(evaluation);
};

const updateEvaluation = (req, res) => {
    const id = Number(req.params.id);

    const evaluation = evaluations.find(e => e.id === id);

    if (!evaluation) {
        return res.status(404).json({
            message: "Evaluation not found"
        });
    }

    const { taskId, score, notes } = req.body;

    if (score < 1 || score > 5) {
        return res.status(400).json({
            message: "Score must be between 1 and 5"
        });
    }

    evaluation.taskId = Number(taskId);
    evaluation.score = Number(score);
    evaluation.notes = notes;

    res.json(evaluation);
};

const deleteEvaluation = (req, res) => {
    const id = Number(req.params.id);

    const index = evaluations.findIndex(e => e.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Evaluation not found"
        });
    }

    evaluations.splice(index, 1);

    res.json({
        message: "Evaluation deleted successfully"
    });
};

module.exports = {
    createEvaluation,
    getAllEvaluations,
    getEvaluationById,
    updateEvaluation,
    deleteEvaluation
};