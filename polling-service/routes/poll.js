const route = require("express").Router();
const {
  createNomination,
  upVote,
  downVote,
  getNominations,
} = require("../controllers/nomination");
const { createPoll, getPoll, getPolls } = require("../controllers/poll");

const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1118715",
  key: "1eb7f0ffa38cc3d46a7c",
  secret: "decebf66d6f2c4acb55e",
  cluster: "ap2",
  useTLS: true,
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
    pusher.trigger("poll", "vote", {
      ...nomination,
    });
    res.send("Thank you for voting.");
  } catch (error) {
    console.log(error);
  }
});

// downVote
route.post("/nomination/downvote/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const nomination = await downVote(id);
    pusher.trigger("poll", "vote", {
      title: nomination.title,
      count: nomination.count,
      id: nomination.id,
    });
    res.send("Your response has been recorded.");
  } catch (error) {
    console.log(error);
  }
});

module.exports = route;
