const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

app.use("/api/user", require("./routes/user"));

app.listen(8001, () => {
  console.log("Server started at http://localhost:8001");
});
