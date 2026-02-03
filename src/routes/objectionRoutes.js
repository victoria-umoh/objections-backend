const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/objectionController");
const aiCtrl = require("../controllers/aiController");
const discoveryCtrl = require("../controllers/discoveryController");

// OBJECTION ROUTES
// The "api" prefix is added in server.js, so these become /api/...
router.get("/objections", ctrl.getObjections);
router.post("/generate-script", aiCtrl.generateRebuttal);
router.post("/admin/add-objection", ctrl.createObjection);
router.put("/admin/objections/:id", ctrl.updateObjection);
router.delete("/admin/objections/:id", ctrl.deleteObjection);

// DISCOVERY SCRIPT ROUTES
router.get("/discovery-scripts/active", discoveryCtrl.getActiveScript);
router.get("/discovery-scripts", discoveryCtrl.getDiscoveryScripts);
router.get("/discovery-scripts/:id", discoveryCtrl.getDiscoveryScriptById);
router.post("/discovery-scripts", discoveryCtrl.createDiscoveryScript);
router.put("/discovery-scripts/:id/activate", discoveryCtrl.setActiveScript);
router.put("/discovery-scripts/:id", discoveryCtrl.updateDiscoveryScript);
router.delete("/discovery-scripts/:id", discoveryCtrl.deleteDiscoveryScript);

// Admin aliases (same endpoints with /admin prefix)
router.post("/admin/discovery-scripts", discoveryCtrl.createDiscoveryScript);
router.put("/admin/discovery-scripts/:id/activate", discoveryCtrl.setActiveScript);
router.put("/admin/discovery-scripts/:id", discoveryCtrl.updateDiscoveryScript);
router.delete("/admin/discovery-scripts/:id", discoveryCtrl.deleteDiscoveryScript);

module.exports = router;