const mongoose = require("mongoose");

const contributionSchema = new mongoose.Schema({
  mvp: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MVP",
  },
  field: String,
  topic: String,
  date: String,
  image: String,
  description: String,
});

const Contribution = mongoose.model("Contribution", contributionSchema);
module.exports = Contribution;
