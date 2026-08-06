const interns = require("../data/interns");
const tasks = require("../data/tasks");
const evaluations = require("../data/evaluations");

// Create Intern
const createIntern = (req, res) => {
    const { name, email, startDate, track } = req.body;

    const newIntern = {
        id: Date.now(),
        name,
        email,
        startDate,
        track
    };

    interns.push(newIntern);

    res.status(201).json(newIntern);
};

// Get All Interns
const getAllInterns = (req, res) => {
    res.json(interns);
};

// Get Intern By ID
const getInternById = (req, res) => {
    const id = Number(req.params.id);

    const intern = interns.find(intern => intern.id === id);

    if (!intern) {
        return res.status(404).json({
            message: "Intern not found"
        });
    }

    res.json(intern);
};

// Update Intern
// Update Intern
const updateIntern = (req, res) => {
    const id = Number(req.params.id);

    const intern = interns.find(intern => intern.id === id);

    if (!intern) {
        return res.status(404).json({
            message: "Intern not found"
        });
    }

    const { name, email, startDate, track } = req.body;

    intern.name = name;
    intern.email = email;
    intern.startDate = startDate;
    intern.track = track;

    res.json(intern);
};

// Delete Intern
// Delete Intern
const deleteIntern = (req, res) => {
    const id = Number(req.params.id);
    const index = interns.findIndex(intern => intern.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Intern not found"
        });
    }

    interns.splice(index, 1);

    res.json({
        message: "Intern deleted successfully"
    });
};

// Summary
const getInternSummary = (req, res) => {

    const internId = Number(req.params.id);

    const intern = interns.find(
        intern => intern.id === internId
    );

    if (!intern) {
        return res.status(404).json({
            message: "Intern not found"
        });
    }
    const internTasks = tasks.filter(
    task => Number(task.internId) === internId
);
const totalTasks = internTasks.length;
const completedTasks = internTasks.filter(
    task => task.status === "Done"
).length;
const taskIds = internTasks.map(
    task => task.id
);

const internEvaluations = evaluations.filter(
    evaluation => taskIds.includes(evaluation.taskId)
);
let averageEvaluationScore = 0;

if (internEvaluations.length > 0) {

    const totalScore = internEvaluations.reduce(
        (sum, evaluation) => sum + evaluation.score,
        0
    );

    averageEvaluationScore = totalScore / internEvaluations.length;

}

  res.json({
    internId,
    totalTasks,
    completedTasks,
    averageEvaluationScore
});}

// Export
module.exports = {
    createIntern,
    getAllInterns,
    getInternById,
    updateIntern,
    deleteIntern,
    getInternSummary
};