const request = require("supertest");
const express = require("express");
const cors = require("cors");

// Create a test app without MongoDB connection
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import only the routes we need for testing
app.use("/api/user", require("./routes/user"));

describe("User Service", () => {
  test("GET /api/user/hello should return Hello World message", async () => {
    const response = await request(app).get("/api/user/hello");

    expect(response.status).toBe(200);
    expect(response.text).toContain("Hello World");
  });
});
