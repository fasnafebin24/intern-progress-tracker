const Intern = require("../models/internModel");

// Create Intern
const createIntern = async (req, res) => {
    try {
        const { name, email, startDate, track } = req.body;

        const newIntern = await Intern.create({
            id: Date.now(),
            name,
            email,
            startDate,
            track
        });

        res.status(201).json(newIntern);
    } catch (error) {
        res.status(500).json({
            message: "Failed to create intern",
            error: error.message
        });
    }
};

// Get All Interns
const getAllInterns = async (req, res) => {
    try {
        const interns = await Intern.find();
        res.json(interns);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch interns",
            error: error.message
        });
    }
};

// Get Intern By ID
const getInternById = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const intern = await Intern.findOne({ id });

        if (!intern) {
            return res.status(404).json({
                message: "Intern not found"
            });
        }

        res.json(intern);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch intern",
            error: error.message
        });
    }
};

// Update Intern
const updateIntern = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const intern = await Intern.findOneAndUpdate(
            { id },
            {
                name: req.body.name,
                email: req.body.email,
                startDate: req.body.startDate,
                track: req.body.track
            },
            { new: true }
        );

        if (!intern) {
            return res.status(404).json({
                message: "Intern not found"
            });
        }

        res.json(intern);
    } catch (error) {
        res.status(500).json({
            message: "Failed to update intern",
            error: error.message
        });
    }
};

// Delete Intern
const deleteIntern = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const intern = await Intern.findOneAndDelete({ id });

        if (!intern) {
            return res.status(404).json({
                message: "Intern not found"
            });
        }

        res.json({
            message: "Intern deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete intern",
            error: error.message
        });
    }
};

// Export
module.exports = {
    createIntern,
    getAllInterns,
    getInternById,
    updateIntern,
    deleteIntern
};