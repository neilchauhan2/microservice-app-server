const route = require("express").Router();
const { 
    createNomination,
	upVote,
	downVote,
    getNominations 
} = require("../controllers/nomination");
const { createPoll, getPoll } = require("../controllers/poll");

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
        const { name } = req.body;
        const poll = await createPoll({ name });
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
        const { name, count, pollId } = req.body;
        const nomination = await createNomination({ name, count, pollId });
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
        res.send(nomination);
    } catch (error) {
        console.log(error);
    }
})

// downVote
route.post("/nomination/downvote/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const nomination = await downVote(id);
        res.send(nomination);
    } catch (error) {
        console.log(error);
    }
})


module.exports = route;