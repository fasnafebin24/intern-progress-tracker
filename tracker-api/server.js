const express = require("express");
const cors = require("cors");
const internRoutes = require("./routes/internRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/interns", internRoutes);

app.get("/", (req, res) => {
    res.send("Tracker API is Running");
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Tracker API running on port ${PORT}`);
});