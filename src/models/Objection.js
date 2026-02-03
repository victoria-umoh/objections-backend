const mongoose = require("mongoose");

const objectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  calm: String,
  confident: String,
  close: String
}, { timestamps: true });

module.exports = mongoose.model("Objection", objectionSchema);