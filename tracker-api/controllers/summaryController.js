const Intern = require("../models/internModel");
const Task = require("../models/taskModel");
const Evaluation = require("../models/evaluationModel");

const getInternSummary = async (req, res) => {
    try {
        const internId = Number(req.params.id);

        // Check whether intern exists
        const intern = await Intern.findOne({ id: internId });

        if (!intern) {
            return res.status(404).json({
                message: "Intern not found"
            });
        }

        // Get all tasks belonging to this intern
        const internTasks = await Task.find({
            internId: internId
        });

        // Get task IDs
        const taskIds = internTasks.map(task => task.id);

        // Get evaluations related to those tasks
        const internEvaluations = await Evaluation.find({
            taskId: { $in: taskIds }
        });

        // Calculate completed tasks
        const completedTasks = internTasks.filter(
            task => task.status === "Done"
        ).length;

        // Calculate average score
        const averageScore = internEvaluations.length
            ? internEvaluations.reduce(
                (sum, evaluation) => sum + evaluation.score,
                0
            ) / internEvaluations.length
            : 0;

        res.json({
            internId,
            totalTasks: internTasks.length,
            completedTasks,
            averageScore,
            evaluations: internEvaluations
        });

    } catch (error) {
        console.error("Summary error:", error);

        res.status(500).json({
            message: "Failed to generate intern summary",
            error: error.message
        });
    }
};

module.exports = {
    getInternSummary
};