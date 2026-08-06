const express = require("express");
const cors = require("cors");

const notificationRoutes = require("./routes/notificationRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/notify", notificationRoutes);

app.get("/", (req, res) => {
    res.send("Digest Service is Running");
});

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Digest Service running on port ${PORT}`);
});