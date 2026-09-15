const request = require("supertest");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = require("../server");
const User = require("../models/userModel");

describe("Authentication API", () => {
    afterEach(async () => {
        await User.deleteMany({});

        const hashedPassword = await bcrypt.hash("password123", 10);

        await User.create({
            username: "fasna",
            password: hashedPassword
        });
    });

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
    });

    test("POST /auth/register - should register a new user", async () => {
        const response = await request(app)
            .post("/auth/register")
            .send({
                username: "newuser",
                password: "password123"
            });

        expect(response.statusCode).toBe(201);

        expect(response.body.message).toBe(
            "User registered successfully"
        );

        expect(response.body.user.username).toBe("newuser");
        expect(response.body.user.id).toBeDefined();

        const user = await User.findOne({
            username: "newuser"
        });

        expect(user).not.toBeNull();

        // Password plaintext ayi store cheythittundo enn check cheyyunnu
        expect(user.password).not.toBe("password123");

        // Hashed password correct aano enn check cheyyunnu
        const passwordMatches = await bcrypt.compare(
            "password123",
            user.password
        );

        expect(passwordMatches).toBe(true);
    });

    test("POST /auth/register - should return 400 when username or password is missing", async () => {
        const response = await request(app)
            .post("/auth/register")
            .send({
                username: "incompleteuser"
            });

        expect(response.statusCode).toBe(400);

        expect(response.body.message).toBe(
            "Username and password are required"
        );
    });

    test("POST /auth/register - should return 409 when username already exists", async () => {
        const response = await request(app)
            .post("/auth/register")
            .send({
                username: "fasna",
                password: "password123"
            });

        expect(response.statusCode).toBe(409);

        expect(response.body.message).toBe(
            "Username already exists"
        );
    });

    test("POST /auth/login - should login with valid credentials", async () => {
        const response = await request(app)
            .post("/auth/login")
            .send({
                username: "fasna",
                password: "password123"
            });

        expect(response.statusCode).toBe(200);

        expect(response.body.message).toBe(
            "Login successful"
        );

        expect(response.body.token).toBeDefined();

        // JWT token valid aano enn verify cheyyunnu
        const decodedToken = jwt.verify(
            response.body.token,
            process.env.JWT_SECRET
        );

        expect(decodedToken.username).toBe("fasna");
        expect(decodedToken.userId).toBeDefined();
    });

    test("POST /auth/login - should return 401 for incorrect password", async () => {
        const response = await request(app)
            .post("/auth/login")
            .send({
                username: "fasna",
                password: "wrongpassword"
            });

        expect(response.statusCode).toBe(401);

        expect(response.body.message).toBe(
            "Invalid username or password"
        );
    });

    test("POST /auth/login - should return 401 for nonexistent user", async () => {
        const response = await request(app)
            .post("/auth/login")
            .send({
                username: "unknownuser",
                password: "password123"
            });

        expect(response.statusCode).toBe(401);

        expect(response.body.message).toBe(
            "Invalid username or password"
        );
    });

    test("POST /auth/login - should return 400 when username or password is missing", async () => {
        const response = await request(app)
            .post("/auth/login")
            .send({
                username: "fasna"
            });

        expect(response.statusCode).toBe(400);

        expect(response.body.message).toBe(
            "Username and password are required"
        );
    });
});