const { store,update } = require("../Controllers/Ship/shipController");
const express = require("express");
const { protect } = require("../middleware/protectRoute");
const router = express.Router();
router.route("/ship/add").post(protect, store);
module.exports = router;