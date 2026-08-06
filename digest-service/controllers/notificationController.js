const notifications = require("../data/notifications");
const axios = require("axios");
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
const getDigest = async (req, res) => {
    try {

        const internsResponse = await axios.get("http://tracker-api:3000/interns");
        const tasksResponse = await axios.get("http://tracker-api:3000/tasks");
        const evaluationsResponse = await axios.get("http://tracker-api:3000/evaluations");

        const interns = internsResponse.data;
        const tasks = tasksResponse.data;
        const evaluations = evaluationsResponse.data;

        const completedTasks = tasks.filter(
            task => task.status === "Done"
        ).length;

        let averageEvaluationScore = 0;

        if (evaluations.length > 0) {

            const totalScore = evaluations.reduce(
                (sum, evaluation) => sum + evaluation.score,
                0
            );

            averageEvaluationScore = totalScore / evaluations.length;
        }

        res.json({
            totalInterns: interns.length,
            totalTasks: tasks.length,
            completedTasks,
            averageEvaluationScore
        });

    } catch (error) {

        console.log(error.message);

        res.status(500).json({
            message: "Unable to fetch data from Tracker API"
        });

    }
};module.exports = {
    receiveNotification,
    getDigest
};