const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

app.use("/api/user", require("./routes/user"));
app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.listen(8001, () => {
  console.log("Server started at http://localhost:8001");
});
