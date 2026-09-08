const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            unique: true,
            required: true
        },
        taskId: {
            type: Number,
            required: true,
            ref: "Task"
        },
        content: {
            type: String,
            required: true
        }
    },
    { versionKey: false }
);

module.exports = mongoose.model("Note", noteSchema);