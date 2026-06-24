const User = require("../models/User");

const OtpLog = require("../models/OtpLog");

exports.dashboard = async (req, res) => {
  const users = await User.countDocuments();

  const otpSent = await OtpLog.countDocuments();

  const otpSuccess = await OtpLog.countDocuments({
    status: "SUCCESS",
  });

  const otpFailed = await OtpLog.countDocuments({
    status: "FAILED",
  });

  res.json({
    users,

    otpSent,

    otpSuccess,

    otpFailed,
  });
};