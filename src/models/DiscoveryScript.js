const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  number: { type: Number, required: true },
  text: { type: String, required: true },
  category: { type: String, default: "" }, // e.g., "Emotional", "Practical"
  icon: { type: String, default: "" }
});

const PhaseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  order: { type: Number, required: true },
  badge: { type: String, default: "" },
  content: { type: String, default: "" },
  questions: [QuestionSchema],
  notes: [{ type: String }]
});

const DiscoveryScriptSchema = new mongoose.Schema({
  name: { type: String, required: true, default: "Main Discovery Script" },
  description: { type: String, default: "" },
  phases: [PhaseSchema],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("DiscoveryScript", DiscoveryScriptSchema);
