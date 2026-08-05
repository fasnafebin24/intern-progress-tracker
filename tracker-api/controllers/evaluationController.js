const evaluations = require("../data/evaluations");
const tasks = require("../data/tasks");

const createEvaluation = (req, res) => {
    const { taskId, score, notes } = req.body;
    const task = tasks.find(
    task => task.id === Number(taskId)
);

if (!task) {
    return res.status(404).json({
        message: "Task not found"
    });
}

    const newEvaluation = {
        id: Date.now(),
        taskId,
        score,
        notes
    };

    evaluations.push(newEvaluation);

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

    evaluation.taskId = taskId;
    evaluation.score = score;
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