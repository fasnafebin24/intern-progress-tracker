const express = require("express");
const router = express.Router();

const {
    receiveNotification,
    getDigest
} = require("../controllers/notificationController");

router.post("/", receiveNotification);

router.get("/digest", getDigest);

module.exports = router;