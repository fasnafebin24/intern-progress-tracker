const express = require("express");
const cors = require("cors");

const internRoutes = require("./routes/internRoutes");
const taskRoutes = require("./routes/taskRoutes");
const noteRoutes = require("./routes/noteRoutes");
const evaluationRoutes = require("./routes/evaluationRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/interns", internRoutes);
app.use("/tasks", taskRoutes);
app.use("/notes", noteRoutes);
app.use("/evaluations", evaluationRoutes);

app.get("/", (req, res) => {
    res.send("Tracker API is Running");
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Tracker API running on port ${PORT}`);
});