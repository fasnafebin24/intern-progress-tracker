const tasks = require("../data/tasks");
const evaluations = require("../data/evaluations");


const getInternSummary = (req, res) => {

    const internId = parseInt(req.params.id);

    // Get intern tasks
    const internTasks = tasks.filter(
        task => task.internId === internId
    );


    // Get evaluations related to tasks
    const internEvaluations = evaluations.filter(evaluation =>
        internTasks.some(task => task.id === evaluation.taskId)
    );


    // Calculate completed tasks
    const completedTasks = internTasks.filter(
        task => task.status === "Done"
    ).length;


    // Calculate average score
    const averageScore = internEvaluations.length
        ? internEvaluations.reduce((sum, e) => sum + e.score, 0) / internEvaluations.length
        : 0;


    res.json({
        internId,
        totalTasks: internTasks.length,
        completedTasks,
        averageScore,
        evaluations: internEvaluations
    });

};


module.exports = {
    getInternSummary
};