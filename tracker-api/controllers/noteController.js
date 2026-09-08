const Note = require("../models/noteModel");
const Task = require("../models/taskModel");

// GET ALL NOTES
exports.getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch notes",
            error: error.message
        });
    }
};

// GET NOTE BY ID
exports.getNoteById = async (req, res) => {
    try {
        const note = await Note.findOne({
            id: Number(req.params.id)
        });

        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.json(note);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch note",
            error: error.message
        });
    }
};

// CREATE NOTE
exports.createNote = async (req, res) => {
    try {
        const task = await Task.findOne({
            id: Number(req.body.taskId)
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        const newNote = await Note.create({
            id: Date.now(),
            taskId: Number(req.body.taskId),
            content: req.body.content
        });

        res.status(201).json(newNote);
    } catch (error) {
        res.status(500).json({
            message: "Failed to create note",
            error: error.message
        });
    }
};

// UPDATE NOTE
exports.updateNote = async (req, res) => {
    try {
        const note = await Note.findOneAndUpdate(
            { id: Number(req.params.id) },
            { content: req.body.content },
            { new: true }
        );

        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.json(note);
    } catch (error) {
        res.status(500).json({
            message: "Failed to update note",
            error: error.message
        });
    }
};

// DELETE NOTE
exports.deleteNote = async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({
            id: Number(req.params.id)
        });

        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.json({
            message: "Note deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete note",
            error: error.message
        });
    }
};