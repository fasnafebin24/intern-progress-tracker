process.env.JWT_SECRET = process.env.JWT_SECRET || "test_jwt_secret";
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();

    const mongoUri = mongoServer.getUri();

    await mongoose.connect(mongoUri);

    const hashedPassword = await bcrypt.hash("password123", 10);

    await User.create({
        username: "fasna",
        password: hashedPassword
    });
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();

    await mongoServer.stop();
});