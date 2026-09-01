const mongoose = require("mongoose");

const internSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            unique: true,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        startDate: {
            type: String,
            required: true
        },
        track: {
            type: String,
            required: true
        }
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model("Intern", internSchema);