const notifications = require("../data/notifications");

// POST /notify
const receiveNotification = (req, res) => {

    const notification = {
        id: Date.now(),
        ...req.body
    };

    notifications.push(notification);

    console.log("New Notification Received:", notification);

    res.status(201).json({
        message: "Notification received successfully",
        notification
    });

};

module.exports = {
    receiveNotification
};