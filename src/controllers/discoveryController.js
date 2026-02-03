const DiscoveryScript = require("../models/DiscoveryScript");

// GET all discovery scripts
exports.getDiscoveryScripts = async (req, res) => {
  try {
    const scripts = await DiscoveryScript.find().sort({ createdAt: -1 });
    res.json(scripts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching discovery scripts", error: error.message });
  }
};

// GET active discovery script
exports.getActiveScript = async (req, res) => {
  try {
    const script = await DiscoveryScript.findOne({ isActive: true });
    if (!script) {
      return res.status(404).json({ message: "No active discovery script found" });
    }
    res.json(script);
  } catch (error) {
    res.status(500).json({ message: "Error fetching active script", error: error.message });
  }
};

// GET discovery script by ID
exports.getDiscoveryScriptById = async (req, res) => {
  try {
    const script = await DiscoveryScript.findById(req.params.id);
    if (!script) {
      return res.status(404).json({ message: "Discovery script not found" });
    }
    res.json(script);
  } catch (error) {
    res.status(500).json({ message: "Error fetching discovery script", error: error.message });
  }
};

// CREATE new discovery script
exports.createDiscoveryScript = async (req, res) => {
  try {
    const newScript = new DiscoveryScript(req.body);
    const savedScript = await newScript.save();
    res.status(201).json(savedScript);
  } catch (error) {
    res.status(400).json({ message: "Error creating discovery script", error: error.message });
  }
};

// UPDATE discovery script
exports.updateDiscoveryScript = async (req, res) => {
  try {
    const updatedScript = await DiscoveryScript.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    if (!updatedScript) {
      return res.status(404).json({ message: "Discovery script not found" });
    }
    res.json(updatedScript);
  } catch (error) {
    res.status(400).json({ message: "Error updating discovery script", error: error.message });
  }
};

// DELETE discovery script
exports.deleteDiscoveryScript = async (req, res) => {
  try {
    const deletedScript = await DiscoveryScript.findByIdAndDelete(req.params.id);
    if (!deletedScript) {
      return res.status(404).json({ message: "Discovery script not found" });
    }
    res.json({ message: "Discovery script deleted successfully", deletedScript });
  } catch (error) {
    res.status(500).json({ message: "Error deleting discovery script", error: error.message });
  }
};

// SET active discovery script (deactivate all others)
exports.setActiveScript = async (req, res) => {
  try {
    // Deactivate all scripts
    await DiscoveryScript.updateMany({}, { isActive: false });
    
    // Activate the selected one
    const activeScript = await DiscoveryScript.findByIdAndUpdate(
      req.params.id,
      { isActive: true, updatedAt: Date.now() },
      { new: true }
    );
    
    if (!activeScript) {
      return res.status(404).json({ message: "Discovery script not found" });
    }
    
    res.json(activeScript);
  } catch (error) {
    res.status(500).json({ message: "Error setting active script", error: error.message });
  }
};
