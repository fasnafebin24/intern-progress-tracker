const interns = require("../data/interns");

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

// Export (MUST be at the end)
module.exports = {
    createIntern,
    getAllInterns,
    getInternById,
    updateIntern,
    deleteIntern
};