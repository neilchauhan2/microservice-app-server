const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection with retry logic
const connectDB = async () => {
  const maxRetries = 5;
  const retryDelay = 5000; // 5 seconds

  for (let i = 0; i < maxRetries; i++) {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      });
      console.log("MongoDB connected successfully");
      break;
    } catch (error) {
      console.log(`MongoDB connection attempt ${i + 1} failed:`, error.message);
      if (i < maxRetries - 1) {
        console.log(`Retrying in ${retryDelay / 1000} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      } else {
        console.error("Failed to connect to MongoDB after maximum retries");
        process.exit(1);
      }
    }
  }
};

connectDB();

app.use("/api/polling", require("./routes/poll"));
app.get("/", (req, res) => {
  res.send("<h1>Welcome to the Polling Service</h1>");
});

app.listen(8000, () => {
  console.log("Server started at http://localhost:8000");
});
