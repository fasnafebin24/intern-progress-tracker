
const request = require("supertest");
const mongoose = require("mongoose");

const app = require("../server");
const Evaluation = require("../models/evaluationModel");
const Task = require("../models/taskModel");
const Intern = require("../models/internModel");
const { getAuthToken } = require("./authHelper");

describe("Evaluation API", () => {
    afterEach(async () => {
        await Evaluation.deleteMany({});
        await Task.deleteMany({});
        await Intern.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
    });

    test("GET /evaluations - should return all evaluations", async () => {
        await Evaluation.create({
            id: 4001,
            taskId: 5001,
            score: 5,
            notes: "Excellent work"
        });

        const response = await request(app)
            .get("/evaluations");

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveLength(1);
        expect(response.body[0].taskId).toBe(5001);
        expect(response.body[0].score).toBe(5);
        expect(response.body[0].notes).toBe("Excellent work");
    });

    test("GET /evaluations/:id - should return an evaluation by ID", async () => {
        await Evaluation.create({
            id: 4002,
            taskId: 5002,
            score: 4,
            notes: "Good work"
        });

        const response = await request(app)
            .get("/evaluations/4002");

        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(4002);
        expect(response.body.taskId).toBe(5002);
        expect(response.body.score).toBe(4);
        expect(response.body.notes).toBe("Good work");
    });

    test("GET /evaluations/:id - should return 404 for nonexistent evaluation", async () => {
        const response = await request(app)
            .get("/evaluations/999999999");

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("Evaluation not found");
    });

    test("POST /evaluations - should create a new evaluation", async () => {
        await Intern.create({
            id: 6001,
            name: "Evaluation Intern",
            email: "evaluation@example.com",
            startDate: "2026-09-01",
            track: "Backend"
        });

        await Task.create({
            id: 5003,
            internId: 6001,
            title: "Evaluation Task",
            status: "Completed"
        });

        const response = await request(app)
            .post("/evaluations")
            .set("Authorization", `Bearer ${getAuthToken()}`)
            .send({
                taskId: 5003,
                score: 5,
                notes: "Excellent work"
            });

        expect(response.statusCode).toBe(201);
        expect(response.body.taskId).toBe(5003);
        expect(response.body.score).toBe(5);
        expect(response.body.notes).toBe("Excellent work");
        expect(response.body.id).toBeDefined();
    });

    test("POST /evaluations - should return 404 when task does not exist", async () => {
        const response = await request(app)
            .post("/evaluations")
            .set("Authorization", `Bearer ${getAuthToken()}`)
            .send({
                taskId: 999999999,
                score: 4,
                notes: "Task does not exist"
            });

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("Task not found");
    });

    test("POST /evaluations - should return 400 for score below 1", async () => {
        await Task.create({
            id: 5004,
            internId: 6002,
            title: "Score Validation Task",
            status: "Completed"
        });

        const response = await request(app)
            .post("/evaluations")
            .set("Authorization", `Bearer ${getAuthToken()}`)
            .send({
                taskId: 5004,
                score: 0,
                notes: "Invalid score"
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Score must be between 1 and 5");
    });

    test("POST /evaluations - should return 400 for score above 5", async () => {
        await Task.create({
            id: 5005,
            internId: 6003,
            title: "High Score Validation Task",
            status: "Completed"
        });

        const response = await request(app)
            .post("/evaluations")
            .set("Authorization", `Bearer ${getAuthToken()}`)
            .send({
                taskId: 5005,
                score: 6,
                notes: "Invalid score"
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Score must be between 1 and 5");
    });

    test("PUT /evaluations/:id - should update an evaluation", async () => {
        await Task.create({
            id: 5006,
            internId: 6004,
            title: "Update Evaluation Task",
            status: "Completed"
        });

        await Evaluation.create({
            id: 4003,
            taskId: 5006,
            score: 3,
            notes: "Average work"
        });

        const response = await request(app)
            .put("/evaluations/4003")
            .set("Authorization", `Bearer ${getAuthToken()}`)
            .send({
                score: 5,
                notes: "Excellent work"
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(4003);
        expect(response.body.taskId).toBe(5006);
        expect(response.body.score).toBe(5);
        expect(response.body.notes).toBe("Excellent work");
    });

    test("PUT /evaluations/:id - should return 404 for nonexistent evaluation", async () => {
        const response = await request(app)
            .put("/evaluations/999999999")
            .set("Authorization", `Bearer ${getAuthToken()}`)
            .send({
                score: 5,
                notes: "Updated"
            });

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("Evaluation not found");
    });

    test("PUT /evaluations/:id - should return 404 when new task does not exist", async () => {
        await Evaluation.create({
            id: 4004,
            taskId: 5007,
            score: 4,
            notes: "Original evaluation"
        });

        const response = await request(app)
            .put("/evaluations/4004")
            .set("Authorization", `Bearer ${getAuthToken()}`)
            .send({
                taskId: 999999999,
                score: 5
            });

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("Task not found");
    });

    test("PUT /evaluations/:id - should return 400 for invalid score", async () => {
        await Evaluation.create({
            id: 4005,
            taskId: 5008,
            score: 4,
            notes: "Original evaluation"
        });

        const response = await request(app)
            .put("/evaluations/4005")
            .set("Authorization", `Bearer ${getAuthToken()}`)
            .send({
                score: 6
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Score must be between 1 and 5");
    });

    test("DELETE /evaluations/:id - should delete an evaluation", async () => {
        await Evaluation.create({
            id: 4006,
            taskId: 5009,
            score: 4,
            notes: "Delete me"
        });

        const response = await request(app)
            .delete("/evaluations/4006")
            .set("Authorization", `Bearer ${getAuthToken()}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe(
            "Evaluation deleted successfully"
        );

        const deletedEvaluation = await Evaluation.findOne({
            id: 4006
        });

        expect(deletedEvaluation).toBeNull();
    });

    test("DELETE /evaluations/:id - should return 404 for nonexistent evaluation", async () => {
        const response = await request(app)
            .delete("/evaluations/999999999")
            .set("Authorization", `Bearer ${getAuthToken()}`);

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("Evaluation not found");
    });
});

