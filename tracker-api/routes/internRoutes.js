const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    createIntern,
    getAllInterns,
    getInternById,
    updateIntern,
    deleteIntern
} = require("../controllers/internController");

router.post("/", authMiddleware, createIntern);

router.get("/", getAllInterns);

router.get("/:id", getInternById);

router.put("/:id", authMiddleware, updateIntern);

router.delete("/:id", authMiddleware, deleteIntern);

module.exports = router;