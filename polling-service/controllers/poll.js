const { Poll } = require("../models/Poll");

// create a poll 
const createPoll = async (pollCredentials) => {
	try {
		const poll = await Poll.create({
			...pollCredentials
		});
		await poll.save();
		return poll;
	} catch(e) {
		console.error(e);
	}
}

// get Poll 
const getPoll = async (id) => {
	try {
		const poll = await Poll.findById(id);
		return poll;
	} catch(e) {
		console.error(e);
	}
}

// get Polls 
const getPolls = async () => {
    try {
        const polls = await Poll.find({});
        return polls;
    } catch(e) {
        console.error(e);    
    }
}

module.exports = {
	createPoll,
	getPoll,
    getPolls 
};
