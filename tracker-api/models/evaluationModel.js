const mongoose = require("mongoose");

const evaluationSchema = new mongoose.Schema(
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
        score: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        notes: {
            type: String
        }
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model("Evaluation", evaluationSchema);