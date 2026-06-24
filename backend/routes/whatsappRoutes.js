const express = require("express");

const router = express.Router();

const { status, logout, restart } = require("../controllers/whatsappController");

router.get("/status", status);
router.post("/logout", logout);
router.post("/restart", restart);

module.exports = router;