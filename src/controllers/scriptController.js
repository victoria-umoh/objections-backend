const Objection = require("../models/Objection");

// CREATE & UPDATE (Upsert logic)
exports.saveScript = async (req, res) => {
  const { id, title, calm, confident, close } = req.body;
  try {
    const script = await Objection.findOneAndUpdate(
      { _id: id || new mongoose.Types.ObjectId() }, 
      { title, calm, confident, close },
      { upsert: true, new: true }
    );
    res.status(200).json(script);
  } catch (err) {
    res.status(500).json({ error: "Failed to save script" });
  }
};

// DELETE
exports.deleteScript = async (req, res) => {
  try {
    await Objection.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Script deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
};
