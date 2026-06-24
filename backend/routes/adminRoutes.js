const express = require("express");

const router = express.Router();

const adminAuth = require("../middleware/adminAuth");

const { dashboard } = require("../controllers/adminController");

router.get("/dashboard", adminAuth, dashboard);

module.exports = router;