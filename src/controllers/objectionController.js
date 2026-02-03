const Objection = require("../models/Objection");

// @desc    Get all objections
// @route   GET /api/objections
exports.getObjections = async (req, res) => {
  try {
    const objections = await Objection.find();
    // Transform to match frontend expectations
    const formatted = objections.map(obj => ({
      _id: obj._id,
      title: obj.title,
      scripts: {
        calm: obj.calm,
        confident: obj.confident,
        close: obj.close
      },
      createdAt: obj.createdAt,
      updatedAt: obj.updatedAt
    }));
    res.status(200).json(formatted);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Create new objection
// @route   POST /api/objections/admin/add
exports.createObjection = async (req, res) => {
  try {
    const newObj = await Objection.create(req.body);
    res.status(201).json(newObj);
  } catch (err) {
    res.status(400).json({ message: "Invalid data" });
  }
};

// @desc    Delete objection
// @route   DELETE /api/objections/admin/:id
exports.deleteObjection = async (req, res) => {
  try {
    await Objection.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Objection removed" });
  } catch (err) {
    res.status(404).json({ message: "Not found" });
  }
};

// @desc    Update objection
// @route   PUT /api/objections/admin/:id
exports.updateObjection = async (req, res) => {
  try {
    const updated = await Objection.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Objection not found" });
    }
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// @desc    Bulk add objections
// @route   POST /api/objections/admin/bulk-add
exports.bulkAddObjections = async (req, res) => {
  try {
    const objections = req.body; // Expecting an array of objects
    const result = await Objection.insertMany(objections);
    res.status(201).json({ 
      message: `${result.length} objections imported successfully!`,
      count: result.length 
    });
  } catch (err) {
    res.status(400).json({ error: "Bulk import failed. Check your data format." });
  }
};