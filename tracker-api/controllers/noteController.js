const notes = require("../models/noteModel");
const tasks = require("../data/tasks");


// GET ALL NOTES
exports.getAllNotes = (req, res) => {
    res.json(notes);
};


// GET NOTE BY ID
exports.getNoteById = (req, res) => {

    const note = notes.find(
        n => n.id === Number(req.params.id)
    );

    if (!note) {
        return res.status(404).json({
            message: "Note not found"
        });
    }

    res.json(note);
};


// CREATE NOTE
exports.createNote = (req, res) => {

    const task = tasks.find(
        task => task.id === Number(req.body.taskId)
    );

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    const newNote = {
        id: notes.length + 1,
        taskId: req.body.taskId,
        content: req.body.content
    };

    notes.push(newNote);

    res.status(201).json(newNote);
};


// UPDATE NOTE
exports.updateNote = (req, res) => {

    const note = notes.find(
        n => n.id === Number(req.params.id)
    );

    if (!note) {
        return res.status(404).json({
            message: "Note not found"
        });
    }

    note.content = req.body.content;

    res.json(note);
};


// DELETE NOTE
exports.deleteNote = (req, res) => {

    const index = notes.findIndex(
        n => n.id === Number(req.params.id)
    );


    if (index === -1) {
        return res.status(404).json({
            message: "Note not found"
        });
    }


    notes.splice(index,1);

    res.json({
        message:"Note deleted successfully"
    });

};