const express = require("express");
const router = express.Router();

const {
    createIntern,
    getAllInterns,
    getInternById,
    updateIntern,
    deleteIntern,
    getInternSummary
} = require("../controllers/internController");

router.post("/", createIntern);

router.get("/", getAllInterns);

router.get("/:id/summary", getInternSummary);

router.get("/:id", getInternById);

router.put("/:id", updateIntern);

router.delete("/:id", deleteIntern);

module.exports = router;