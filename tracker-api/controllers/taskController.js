const tasks = require("../data/tasks");
const interns = require("../data/interns");

// Create Task
const createTask = (req, res) => {
    const { internId, title, status } = req.body;
    const intern = interns.find(
    intern => intern.id === Number(internId)
);

if (!intern) {
    return res.status(404).json({
        message: "Intern not found"
    });
}

    const newTask = {
        id: Date.now(),
        internId,
        title,
        status
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
};

// Get All Tasks
const getAllTasks = (req, res) => {
    res.json(tasks);
};

// Get Task By ID
const getTaskById = (req, res) => {
    const id = Number(req.params.id);

    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    res.json(task);
};
// Update Task
const updateTask = (req, res) => {
    const id = Number(req.params.id);

    console.log("Requested ID:", id);
    console.log("Current Tasks:", tasks);

    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    const { internId, title, status } = req.body;

    task.internId = internId;
    task.title = title;
    task.status = status;

    res.json(task);
};
const deleteTask = (req, res) => {
    const id = Number(req.params.id);

    const index = tasks.findIndex(task => task.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    tasks.splice(index, 1);

    res.json({
        message: "Task deleted successfully"
    });
};
// Export (Always keep this at the bottom)
module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
};