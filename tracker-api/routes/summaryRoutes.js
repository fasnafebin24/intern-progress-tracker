const express = require("express");
const router = express.Router();

const { getInternSummary } = require("../controllers/summaryController");


router.get("/interns/:id/summary", getInternSummary);


module.exports = router;