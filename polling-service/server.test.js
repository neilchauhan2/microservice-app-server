const request = require("supertest");
const express = require("express");
const cors = require("cors");

// Create a test app without MongoDB connection
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import only the routes we need for testing
app.use("/api/polling", require("./routes/poll"));

describe("Polling Service", () => {
  test("GET /api/polling/hello should return Hello World message", async () => {
    const response = await request(app).get("/api/polling/hello");

    expect(response.status).toBe(200);
    expect(response.text).toContain("Hello World");
  });
});
