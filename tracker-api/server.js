require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const internRoutes = require("./routes/internRoutes");
const taskRoutes = require("./routes/taskRoutes");
const noteRoutes = require("./routes/noteRoutes");
const evaluationRoutes = require("./routes/evaluationRoutes");
const summaryRoutes = require("./routes/summaryRoutes");

const app = express();
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });

app.use(cors());
app.use(express.json());

app.use("/interns", internRoutes);
app.use("/tasks", taskRoutes);
app.use("/notes", noteRoutes);
app.use("/evaluations", evaluationRoutes);
app.use("/", summaryRoutes);

app.get("/", (req, res) => {
    res.send("Tracker API is Running");
});
const PORT = process.env.PORT || 3000;



app.listen(PORT, function () {
    console.log("Tracker API running on port 3000");
});