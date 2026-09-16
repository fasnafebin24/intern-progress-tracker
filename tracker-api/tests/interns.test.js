const request = require("supertest");
const mongoose = require("mongoose");

const app = require("../server");
const Intern = require("../models/internModel");
const { getAuthToken } = require("./authHelper");

describe("Intern API", () => {
    afterEach(async () => {
        await Intern.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
    });

    test("GET /interns - should return all interns", async () => {
        await Intern.create({
            id: 1001,
            name: "Test Intern",
            email: "test@example.com",
            startDate: "2026-09-01",
            track: "Full Stack"
        });

        const response = await request(app)
            .get("/interns");

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveLength(1);
        expect(response.body[0].name).toBe("Test Intern");
    });

    test("GET /interns/:id - should return an intern by ID", async () => {
        await Intern.create({
            id: 1002,
            name: "John Doe",
            email: "john@example.com",
            startDate: "2026-09-01",
            track: "Backend"
        });

        const response = await request(app)
            .get("/interns/1002");

        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(1002);
        expect(response.body.name).toBe("John Doe");
    });

    test("GET /interns/:id - should return 404 for nonexistent intern", async () => {
        const response = await request(app)
            .get("/interns/999999999");

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("Intern not found");
    });

    test("POST /interns - should create a new intern", async () => {
        const newIntern = {
            name: "New Intern",
            email: "newintern@example.com",
            startDate: "2026-09-01",
            track: "Frontend"
        };

        const response = await request(app)
            .post("/interns")
            .set("Authorization", `Bearer ${getAuthToken()}`)
            .send(newIntern);

        expect(response.statusCode).toBe(201);
        expect(response.body.name).toBe("New Intern");
        expect(response.body.email).toBe("newintern@example.com");
        expect(response.body.startDate).toBe("2026-09-01");
        expect(response.body.track).toBe("Frontend");
        expect(response.body.id).toBeDefined();
    });

    test("POST /interns - should return an error when required fields are missing", async () => {
        const response = await request(app)
            .post("/interns")
            .set("Authorization", `Bearer ${getAuthToken()}`)
            .send({
                name: "Incomplete Intern"
            });

        expect(response.statusCode).toBe(500);
        expect(response.body.message).toBe("Failed to create intern");
    });

    test("PUT /interns/:id - should update an intern", async () => {
        await Intern.create({
            id: 1003,
            name: "Old Name",
            email: "old@example.com",
            startDate: "2026-09-01",
            track: "Backend"
        });

        const response = await request(app)
            .put("/interns/1003")
            .set("Authorization", `Bearer ${getAuthToken()}`)
            .send({
                name: "Updated Name",
                email: "updated@example.com",
                startDate: "2026-09-10",
                track: "Full Stack"
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe("Updated Name");
        expect(response.body.email).toBe("updated@example.com");
        expect(response.body.startDate).toBe("2026-09-10");
        expect(response.body.track).toBe("Full Stack");
    });

    test("PUT /interns/:id - should return 404 for nonexistent intern", async () => {
        const response = await request(app)
            .put("/interns/999999999")
            .set("Authorization", `Bearer ${getAuthToken()}`)
            .send({
                name: "Updated Name",
                email: "updated@example.com",
                startDate: "2026-09-10",
                track: "Full Stack"
            });

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("Intern not found");
    });

    test("DELETE /interns/:id - should delete an intern", async () => {
        await Intern.create({
            id: 1004,
            name: "Delete Me",
            email: "delete@example.com",
            startDate: "2026-09-01",
            track: "Testing"
        });

        const response = await request(app)
            .delete("/interns/1004")
            .set("Authorization", `Bearer ${getAuthToken()}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Intern deleted successfully");

        const deletedIntern = await Intern.findOne({ id: 1004 });
        expect(deletedIntern).toBeNull();
    });

    test("DELETE /interns/:id - should return 404 for nonexistent intern", async () => {
        const response = await request(app)
            .delete("/interns/999999999")
            .set("Authorization", `Bearer ${getAuthToken()}`);

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("Intern not found");
    });
    test("POST /interns - should return 401 without token", async () => {
    const response = await request(app)
        .post("/interns")
        .send({
            name: "Unauthorized Intern",
            email: "unauthorized@example.com",
            startDate: "2026-09-01",
            track: "Backend"
        });

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Authentication required");
});
});