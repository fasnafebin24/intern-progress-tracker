const express = require("express");
const router = express.Router();

const {
    receiveNotification
} = require("../controllers/notificationController");

router.post("/", receiveNotification);

module.exports = router;