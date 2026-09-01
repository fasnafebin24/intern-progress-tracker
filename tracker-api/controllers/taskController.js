const Task = require("../models/taskModel");
const Intern = require("../models/internModel");

// Create Task
const createTask = async (req, res) => {
    try {
        const { internId, title, status } = req.body;

        const intern = await Intern.findOne({
            id: Number(internId)
        });

        if (!intern) {
            return res.status(404).json({
                message: "Intern not found"
            });
        }

        const newTask = await Task.create({
            id: Date.now(),
            internId: Number(internId),
            title,
            status
        });

        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({
            message: "Failed to create task",
            error: error.message
        });
    }
};

// Get All Tasks
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch tasks",
            error: error.message
        });
    }
};

// Get Task By ID
const getTaskById = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const task = await Task.findOne({ id });

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json(task);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch task",
            error: error.message
        });
    }
};

// Update Task
const updateTask = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const task = await Task.findOne({ id });

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        if (req.body.internId !== undefined) {
            const intern = await Intern.findOne({
                id: Number(req.body.internId)
            });

            if (!intern) {
                return res.status(404).json({
                    message: "Intern not found"
                });
            }

            task.internId = Number(req.body.internId);
        }

        if (req.body.title !== undefined) {
            task.title = req.body.title;
        }

        if (req.body.status !== undefined) {
            task.status = req.body.status;
        }

        await task.save();

        res.json(task);
    } catch (error) {
        res.status(500).json({
            message: "Failed to update task",
            error: error.message
        });
    }
};

// Delete Task
const deleteTask = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const task = await Task.findOneAndDelete({ id });

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json({
            message: "Task deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete task",
            error: error.message
        });
    }
};

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
};