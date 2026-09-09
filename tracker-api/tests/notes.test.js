const request = require("supertest");
const mongoose = require("mongoose");

const app = require("../server");
const Note = require("../models/noteModel");
const Task = require("../models/taskModel");
const Intern = require("../models/internModel");

describe("Note API", () => {
    afterEach(async () => {
        await Note.deleteMany({});
        await Task.deleteMany({});
        await Intern.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
    });

    test("GET /notes - should return all notes", async () => {
        await Note.create({
            id: 7001,
            taskId: 8001,
            content: "Test note"
        });

        const response = await request(app)
            .get("/notes");

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveLength(1);
        expect(response.body[0].id).toBe(7001);
        expect(response.body[0].taskId).toBe(8001);
        expect(response.body[0].content).toBe("Test note");
    });

    test("GET /notes/:id - should return a note by ID", async () => {
        await Note.create({
            id: 7002,
            taskId: 8002,
            content: "Important note"
        });

        const response = await request(app)
            .get("/notes/7002");

        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(7002);
        expect(response.body.taskId).toBe(8002);
        expect(response.body.content).toBe("Important note");
    });

    test("GET /notes/:id - should return 404 for nonexistent note", async () => {
        const response = await request(app)
            .get("/notes/999999999");

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("Note not found");
    });

    test("POST /notes - should create a new note", async () => {
        await Intern.create({
            id: 9001,
            name: "Note Test Intern",
            email: "notetest@example.com",
            startDate: "2026-09-01",
            track: "Backend"
        });

        await Task.create({
            id: 8003,
            internId: 9001,
            title: "Note Task",
            status: "Completed"
        });

        const response = await request(app)
            .post("/notes")
            .send({
                taskId: 8003,
                content: "This is a new note"
            });

        expect(response.statusCode).toBe(201);
        expect(response.body.taskId).toBe(8003);
        expect(response.body.content).toBe("This is a new note");
        expect(response.body.id).toBeDefined();
    });

    test("POST /notes - should return 404 when task does not exist", async () => {
        const response = await request(app)
            .post("/notes")
            .send({
                taskId: 999999999,
                content: "Invalid parent task"
            });

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("Task not found");
    });

    test("POST /notes - should return an error when content is missing", async () => {
        await Task.create({
            id: 8004,
            internId: 9002,
            title: "Validation Task",
            status: "Pending"
        });

        const response = await request(app)
            .post("/notes")
            .send({
                taskId: 8004
            });

        expect(response.statusCode).toBe(500);
        expect(response.body.message).toBe("Failed to create note");
    });

    test("PUT /notes/:id - should update a note", async () => {
        await Note.create({
            id: 7003,
            taskId: 8005,
            content: "Old note"
        });

        const response = await request(app)
            .put("/notes/7003")
            .send({
                content: "Updated note"
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(7003);
        expect(response.body.taskId).toBe(8005);
        expect(response.body.content).toBe("Updated note");
    });

    test("PUT /notes/:id - should return 404 for nonexistent note", async () => {
        const response = await request(app)
            .put("/notes/999999999")
            .send({
                content: "Updated note"
            });

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("Note not found");
    });

    test("DELETE /notes/:id - should delete a note", async () => {
        await Note.create({
            id: 7004,
            taskId: 8006,
            content: "Delete me"
        });

        const response = await request(app)
            .delete("/notes/7004");

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe(
            "Note deleted successfully"
        );

        const deletedNote = await Note.findOne({
            id: 7004
        });

        expect(deletedNote).toBeNull();
    });

    test("DELETE /notes/:id - should return 404 for nonexistent note", async () => {
        const response = await request(app)
            .delete("/notes/999999999");

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("Note not found");
    });
});
