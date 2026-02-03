const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/objectionController");
const aiCtrl = require("../controllers/aiController");

// The "api" prefix is added in server.js, so these become /api/...
router.get("/objections", ctrl.getObjections);
router.post("/generate-script", aiCtrl.generateRebuttal);
router.post("/admin/add-objection", ctrl.createObjection);
router.put("/admin/objections/:id", ctrl.updateObjection);
router.delete("/admin/objections/:id", ctrl.deleteObjection);

module.exports = router;