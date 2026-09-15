
const request = require("supertest");
const mongoose = require("mongoose");

const app = require("../server");
const Task = require("../models/taskModel");
const Intern = require("../models/internModel");
const { getAuthToken } = require("./authHelper");

describe("Task API", () => {
    afterEach(async () => {
        await Task.deleteMany({});
        await Intern.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
    });

    test("GET /tasks - should return all tasks", async () => {
        await Task.create({
            id: 1001,
            internId: 2001,
            title: "Test Task",
            status: "Pending"
        });

        const response = await request(app)
            .get("/tasks");

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveLength(1);
        expect(response.body[0].title).toBe("Test Task");
    });

    test("GET /tasks/:id - should return a task by ID", async () => {
        await Task.create({
            id: 1002,
            internId: 2002,
            title: "Task One",
            status: "Pending"
        });

        const response = await request(app)
            .get("/tasks/1002");

        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(1002);
        expect(response.body.title).toBe("Task One");
    });

    test("GET /tasks/:id - should return 404 for nonexistent task", async () => {
        const response = await request(app)
            .get("/tasks/999999999");

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("Task not found");
    });

    test("POST /tasks - should create a new task", async () => {
        await Intern.create({
            id: 2003,
            name: "Task Test Intern",
            email: "tasktest@example.com",
            startDate: "2026-09-01",
            track: "Backend"
        });

        const newTask = {
            internId: 2003,
            title: "New Task",
            status: "Pending"
        };

        const response = await request(app)
            .post("/tasks")
            .set("Authorization", `Bearer ${getAuthToken()}`)
            .send(newTask);

        expect(response.statusCode).toBe(201);
        expect(response.body.internId).toBe(2003);
        expect(response.body.title).toBe("New Task");
        expect(response.body.status).toBe("Pending");
        expect(response.body.id).toBeDefined();
    });

    test("POST /tasks - should return an error when required fields are missing", async () => {
        const response = await request(app)
            .post("/tasks")
            .set("Authorization", `Bearer ${getAuthToken()}`)
            .send({
                title: "Incomplete Task"
            });

        expect(response.statusCode).toBe(500);
        expect(response.body.message).toBe("Failed to create task");
    });

    test("PUT /tasks/:id - should update a task", async () => {
        await Task.create({
            id: 1003,
            internId: 2003,
            title: "Old Task",
            status: "Pending"
        });

        const response = await request(app)
            .put("/tasks/1003")
            .set("Authorization", `Bearer ${getAuthToken()}`)
            .send({
                title: "Updated Task",
                status: "Done"
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(1003);
        expect(response.body.internId).toBe(2003);
        expect(response.body.title).toBe("Updated Task");
        expect(response.body.status).toBe("Done");
    });

    test("PUT /tasks/:id - should return 404 for nonexistent task", async () => {
        const response = await request(app)
            .put("/tasks/999999999")
            .set("Authorization", `Bearer ${getAuthToken()}`)
            .send({
                title: "Updated Task",
                status: "Done"
            });

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("Task not found");
    });

    test("DELETE /tasks/:id - should delete a task", async () => {
        await Task.create({
            id: 1004,
            internId: 2004,
            title: "Delete Me",
            status: "Pending"
        });

        const response = await request(app)
            .delete("/tasks/1004")
            .set("Authorization", `Bearer ${getAuthToken()}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe(
            "Task deleted successfully"
        );

        const deletedTask = await Task.findOne({
            id: 1004
        });

        expect(deletedTask).toBeNull();
    });

    test("DELETE /tasks/:id - should return 404 for nonexistent task", async () => {
        const response = await request(app)
            .delete("/tasks/999999999")
            .set("Authorization", `Bearer ${getAuthToken()}`);

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("Task not found");
    });
});


