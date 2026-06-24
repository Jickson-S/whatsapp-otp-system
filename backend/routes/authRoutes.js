const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const {
  register,
  verifyRegisterOTP,
  login,
  profile,
  forgotPassword,
  verifyResetOTP,
  resetPassword,
  resendRegisterOTP,
} = require("../controllers/authController");

router.post("/register", register);

router.post("/verify-register-otp", verifyRegisterOTP);

router.post("/login", login);

router.get("/profile", auth, profile);

router.post("/forgot-password", forgotPassword);

router.post("/verify-reset-otp", verifyResetOTP);

router.post("/reset-password", resetPassword);

router.post("/resend-register-otp", resendRegisterOTP);

module.exports = router;
