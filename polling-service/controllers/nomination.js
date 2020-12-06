const { Nomination } = require("../models/Nomination");

// create a nomination 
const createNomination = async (nominationCredentials) => {
	try {
		const nomination = await Nomination.create({
			...nominationCredentials
		});
		await nomination.save();
		return nomination;
	} catch(e) {
		console.error(e);
	}
}


// up Vote
const upVote = async (id) => {
	try {
		const nomination = await Nomination.findByIdAndUpdate(id, {
			$inc: {count : 1}
		},
      { new: true, upsert: true });
		nomination.save();
		return nomination;
	} catch(e) {
		console.error(e);
	}
}

// down Vote
const downVote = async (id) => {
	try {
		const nomination = await Nomination.findByIdAndUpdate(id, {
			$inc: {count : -1}
		},
      { new: true, upsert: true });
		nomination.save();
		return nomination;
	} catch(e) {
		console.error(e);
	}
}

// get all nominations of a particular poll
const getNominations = async (pollId) => {
	try {
		const nominations = await Nomination.find({pollId});
		return nominations;
	} catch(e) {
		console.error(e);
	}
}


module.exports = {
	createNomination,
	upVote,
	downVote,
	getNominations
};