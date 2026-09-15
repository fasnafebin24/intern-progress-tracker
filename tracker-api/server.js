require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const internRoutes = require("./routes/internRoutes");
const taskRoutes = require("./routes/taskRoutes");
const noteRoutes = require("./routes/noteRoutes");
const evaluationRoutes = require("./routes/evaluationRoutes");
const summaryRoutes = require("./routes/summaryRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/interns", internRoutes);
app.use("/tasks", taskRoutes);
app.use("/notes", noteRoutes);
app.use("/evaluations", evaluationRoutes);
app.use("/", summaryRoutes);
app.use("/auth", authRoutes);
app.get("/", (req, res) => {
    res.send("Tracker API is Running");
});

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected successfully");

        app.listen(PORT, () => {
            console.log(`Tracker API running on port ${PORT}`);
        });
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
    }
}

if (require.main === module) {
    startServer();
}

module.exports = app;