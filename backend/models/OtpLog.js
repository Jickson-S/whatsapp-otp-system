const mongoose = require("mongoose");

const otpLogSchema = new mongoose.Schema({
  mobile: String,
  otp: String,
  status: {
    type: String,
    default: "SENT",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("OtpLog", otpLogSchema);
