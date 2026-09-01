const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            unique: true,
            required: true
        },
        internId: {
            type: Number,
            required: true,
            ref: "Intern"
        },
        title: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        }
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model("Task", taskSchema);