const route = require("express").Router();
const { 
    createNomination,
	upVote,
	downVote,
    getNominations 
} = require("../controllers/nomination");
const { createPoll, getPoll } = require("../controllers/poll");

const Pusher = require("pusher");

const pusher = new Pusher({
  appId: process.env.PUSHER_APPID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CUSTER,
  useTLS: true
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
})

// create poll
route.post("/poll/add", async (req, res) => {
    try {
        const { title } = req.body;
        const poll = await createPoll({ title });
        res.send(poll);
    } catch (error) {
        console.log(error);
    }
})

// get nominations
route.get("/nomination/:pollId", async (req, res) => {
    try {
        const { pollId } = req.params;
        const nominations = await getNominations(pollId);
        res.send(nominations); 
    } catch (error) {
        console.log(error);
    }
})

// create nominations
route.post("/nomination/add", async (req, res) => {
    try {
        const { title, count, pollId } = req.body;
        const nomination = await createNomination({ title, count, pollId });
        res.send(nomination);
    } catch (error) {
        console.log(error);
    }
})

// upvote
route.post("/nomination/upvote/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const nomination = await upVote(id);
        pusher.trigger("poll", "vote", {
            title : nomination.title,
            count : nomination.count,
            id : nomination.id 
          });
        res.send("Thank you for voting.");
    } catch (error) {
        console.log(error);
    }
})

// downVote
route.post("/nomination/downvote/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const nomination = await downVote(id);
        pusher.trigger("poll", "vote", {
            title : nomination.title,
            count : nomination.count,
            id : nomination.id 
          });
        res.send("Your response has been recorded.");
    } catch (error) {
        console.log(error);
    }
})


module.exports = route;
