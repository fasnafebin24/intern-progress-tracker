const request = require("supertest");
const mongoose = require("mongoose");

const app = require("../server");
const Task = require("../models/taskModel");
const Intern = require("../models/internModel");

describe("Task API", () => {
    afterEach(async () => {
        await Task.deleteMany({});
        await Intern.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
    });

    test("GET /tasks - should return all tasks", async () => {
        await Intern.create({
            id: 2001,
            name: "Task Test Intern",
            email: "tasktest@example.com",
            startDate: "2026-09-01",
            track: "Backend"
        });

        await Task.create({
            id: 3001,
            internId: 2001,
            title: "Test Task",
            status: "Pending"
        });

        const response = await request(app)
            .get("/tasks");

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveLength(1);
        expect(response.body[0].title).toBe("Test Task");
        expect(response.body[0].internId).toBe(2001);
    });

    test("GET /tasks/:id - should return a task by ID", async () => {
        await Intern.create({
            id: 2002,
            name: "John Doe",
            email: "john-task@example.com",
            startDate: "2026-09-01",
            track: "Backend"
        });

        await Task.create({
            id: 3002,
            internId: 2002,
            title: "API Testing",
            status: "In Progress"
        });

        const response = await request(app)
            .get("/tasks/3002");

        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(3002);
        expect(response.body.title).toBe("API Testing");
        expect(response.body.status).toBe("In Progress");
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
            name: "New Task Intern",
            email: "newtask@example.com",
            startDate: "2026-09-01",
            track: "Frontend"
        });

        const newTask = {
            internId: 2003,
            title: "Build Frontend",
            status: "Pending"
        };

        const response = await request(app)
            .post("/tasks")
            .send(newTask);

        expect(response.statusCode).toBe(201);
        expect(response.body.internId).toBe(2003);
        expect(response.body.title).toBe("Build Frontend");
        expect(response.body.status).toBe("Pending");
        expect(response.body.id).toBeDefined();
    });

    test("POST /tasks - should return 404 when intern does not exist", async () => {
        const response = await request(app)
            .post("/tasks")
            .send({
                internId: 999999999,
                title: "Invalid Parent Task",
                status: "Pending"
            });

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("Intern not found");
    });

    test("POST /tasks - should return an error when required fields are missing", async () => {
        await Intern.create({
            id: 2004,
            name: "Validation Intern",
            email: "validation@example.com",
            startDate: "2026-09-01",
            track: "Testing"
        });

        const response = await request(app)
            .post("/tasks")
            .send({
                internId: 2004
            });

        expect(response.statusCode).toBe(500);
        expect(response.body.message).toBe("Failed to create task");
    });

    test("PUT /tasks/:id - should update a task", async () => {
        await Intern.create({
            id: 2005,
            name: "Update Intern",
            email: "update@example.com",
            startDate: "2026-09-01",
            track: "Backend"
        });

        await Task.create({
            id: 3003,
            internId: 2005,
            title: "Old Task",
            status: "Pending"
        });

        const response = await request(app)
            .put("/tasks/3003")
            .send({
                title: "Updated Task",
                status: "Completed"
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(3003);
        expect(response.body.title).toBe("Updated Task");
        expect(response.body.status).toBe("Completed");
        expect(response.body.internId).toBe(2005);
    });

    test("PUT /tasks/:id - should return 404 for nonexistent task", async () => {
        const response = await request(app)
            .put("/tasks/999999999")
            .send({
                title: "Updated Task",
                status: "Completed"
            });

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("Task not found");
    });

    test("PUT /tasks/:id - should return 404 when new intern does not exist", async () => {
        await Intern.create({
            id: 2006,
            name: "Parent Test Intern",
            email: "parent@example.com",
            startDate: "2026-09-01",
            track: "Backend"
        });

        await Task.create({
            id: 3004,
            internId: 2006,
            title: "Parent Update Task",
            status: "Pending"
        });

        const response = await request(app)
            .put("/tasks/3004")
            .send({
                internId: 999999999,
                title: "Updated Task",
                status: "Completed"
            });

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("Intern not found");
    });

    test("DELETE /tasks/:id - should delete a task", async () => {
        await Intern.create({
            id: 2007,
            name: "Delete Task Intern",
            email: "delete-task@example.com",
            startDate: "2026-09-01",
            track: "Testing"
        });

        await Task.create({
            id: 3005,
            internId: 2007,
            title: "Delete Me",
            status: "Pending"
        });

        const response = await request(app)
            .delete("/tasks/3005");

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Task deleted successfully");

        const deletedTask = await Task.findOne({ id: 3005 });
        expect(deletedTask).toBeNull();
    });

    test("DELETE /tasks/:id - should return 404 for nonexistent task", async () => {
        const response = await request(app)
            .delete("/tasks/999999999");

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("Task not found");
    });
});
