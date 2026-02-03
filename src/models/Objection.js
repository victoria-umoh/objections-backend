const mongoose = require("mongoose");

const objectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  calm: String,
  confident: String,
  close: String,
  category: { type: String, default: "objection" }, // 'objection' or 'discovery'
  content: String, // The actual script text
  steps: [String] // For multi-part questions like Discovery
}, { timestamps: true });

module.exports = mongoose.model("Objection", objectionSchema);