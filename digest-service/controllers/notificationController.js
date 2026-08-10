const axios = require("axios");

// Mock database or global state array
const notifications = [];

// Handle incoming notifications
const receiveNotification = async (req, res) => {
    try {
        const { notification } = req.body;

        if (!notification) {
            return res.status(400).json({
                message: "Notification data is required"
            });
        }

        notifications.push(notification);
        console.log("New Notification Received:", notification);

        return res.status(201).json({
            message: "Notification received successfully",
            notification
        });
    } catch (error) {
        console.error("Error receiving notification:", error.message);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

// Fetch data and generate a digest summary
const getDigest = async (req, res) => {
    try {
        // Fix: Fire requests in parallel to improve execution speed
        const [internsResponse, tasksResponse, evaluationsResponse] = await Promise.all([
            axios.get("http://127.0.0.1:3000/interns"),
            axios.get("http://127.0.0.1:3000/tasks"),
            axios.get("http://127.0.0.1:3000/evaluations")
        ]);

        const interns = internsResponse.data || [];
        const tasks = tasksResponse.data || [];
        const evaluations = evaluationsResponse.data || [];

        // Calculate completed tasks
        const completedTasks = tasks.filter(
            task => task.status === "Done"
        ).length;

        // Calculate average evaluation score
        let averageEvaluationScore = 0;
        if (evaluations.length > 0) {
            const totalScore = evaluations.reduce(
                (sum, evaluation) => sum + evaluation.score,
                0
            );
            averageEvaluationScore = totalScore / evaluations.length;
        }

        return res.json({
            totalInterns: interns.length,
            totalTasks: tasks.length,
            completedTasks,
            averageEvaluationScore
        });
    } catch (error) {
        // Fix: Log the specific Axios details for better backend visibility
        console.error("Error fetching digest:", error.response?.data || error.message);
        return res.status(500).json({
            message: "Unable to fetch data from Tracker API"
        });
    }
};

// Export controller methods
module.exports = {
    receiveNotification,
    getDigest
};
