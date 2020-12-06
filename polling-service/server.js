const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect(
    process.env.MONGODB_URI,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    }
);

app.get("/", (req, res) => {
    res.send("<h1> Hello World! </h1>");
});

app.listen(8000, () => {
    console.log("Server started at http://localhost:8000");
});

