const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const connection = mongoose.connect(
    "mongodb+srv://neil:neil260598@collectapp.joovi.mongodb.net/pollingdb?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true
    }
);

app.get("/", (req, res) => {
    res.send("<h1> Hello World! </h1>");
});

app.listen(8000, () => {
    console.log("Server started at http://localhost:8000");
});

