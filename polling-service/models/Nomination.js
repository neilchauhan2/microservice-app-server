const mongoose = require("mongoose");

const NominationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    default: 0
  },
  pollId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Poll"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Nomination = mongoose.model("Nomination", NominationSchema);

module.exports = {
  Nomination
};