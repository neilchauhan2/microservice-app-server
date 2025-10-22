// MongoDB initialization script
db = db.getSiblingDB("microservice_db");

// Create collections for the microservice app
db.createCollection("users");
db.createCollection("polls");
db.createCollection("nominations");

console.log("Database and collections initialized successfully");
