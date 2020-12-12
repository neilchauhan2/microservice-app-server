const route = require("express").Router();
const {
  createNomination,
  upVote,
  downVote,
  getNominations,
} = require("../controllers/nomination");
const { createPoll, getPoll, getPolls } = require("../controllers/poll");

// hello
route.get("/hello", (req, res) => {
  res.send("<h1> Hello World! </h1>");
});

// get poll
route.get("/poll/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const poll = await getPoll(id);
    res.send(poll);
  } catch (error) {
    console.log(error);
  }
});

// create poll
route.post("/poll/add", async (req, res) => {
  try {
    const { title } = req.body;
    const poll = await createPoll({ title });
    res.send(poll);
  } catch (error) {
    console.log(error);
  }
});

// get polls
route.get("/poll", async (req, res) => {
  try {
    const polls = await getPolls();
    res.send(polls);
  } catch (error) {
    console.log(error);
  }
});

// get nominations
route.get("/nomination/:pollId", async (req, res) => {
  try {
    const { pollId } = req.params;
    const nominations = await getNominations(pollId);
    res.send(nominations);
  } catch (error) {
    console.log(error);
  }
});

// create nominations
route.post("/nomination/add", async (req, res) => {
  try {
    const { title, count, pollId } = req.body;
    const nomination = await createNomination({ title, count, pollId });
    res.send(nomination);
  } catch (error) {
    console.log(error);
  }
});

// upvote
route.post("/nomination/upvote/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const nomination = await upVote(id);
    res.send(nomination);
  } catch (error) {
    console.log(error);
  }
});

// downVote
route.post("/nomination/downvote/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const nomination = await downVote(id);
    res.send(nomination);
  } catch (error) {
    console.log(error);
  }
});

module.exports = route;
