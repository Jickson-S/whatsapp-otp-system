const User = require("../models/User");
const bcrypt = require("bcryptjs");

const whatsapp = require("../services/whatsapp");

const jwt = require("jsonwebtoken");

const OtpLog = require("../models/OtpLog");

// Generate OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Register
exports.register = async (req, res) => {
  try {
    const { name, mobile, password } = req.body;

    // check user exists

    const existUser = await User.findOne({
      mobile,
    });

    if (existUser) {
      return res.status(400).json({
        message: "Mobile already registered",
      });
    }

    // create OTP

    const otp = generateOTP();

    await OtpLog.create({
      mobile,

      otp,

      status: "SENT",
    });

    // hash password

    const hashPassword = await bcrypt.hash(password, 10);

    // save user

    const user = await User.create({
      name,

      mobile,

      password: hashPassword,

      otp,

      otpExpires: Date.now() + 5 * 60 * 1000,
    });

    // send whatsapp OTP

    await whatsapp.sendMessage(
      `${mobile}@c.us`,

      `Your OTP is ${otp}`,
    );

    res.json({
      message: "OTP sent successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.verifyRegisterOTP = async (req, res) => {
  try {
    const { mobile, otp } = req.body;

    const user = await User.findOne({
      mobile,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    if (user.otpExpires < Date.now()) {
      return res.status(400).json({
        message: "OTP expired",
      });
    }

    user.isVerified = true;

    user.otp = null;

    user.otpExpires = null;

    await user.save();

    res.json({
      message: "Account verified successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { mobile, password } = req.body;

    const user = await User.findOne({
      mobile,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (!user.isVerified) {
      return res.status(400).json({
        message: "Please verify OTP first",
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({
        message: "Wrong password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        mobile: user.mobile,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d",
      },
    );

    res.json({
      message: "Login successful",

      token,

      user: {
        name: user.name,
        mobile: user.mobile,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password -otp");

    res.json(user);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { mobile } = req.body;

    const user = await User.findOne({
      mobile,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = otp;

    user.otpExpires = Date.now() + 5 * 60 * 1000;

    await user.save();

    res.json({
      message: "OTP sent",

      otp, // remove in production
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.verifyResetOTP = async (req, res) => {
  const { mobile, otp } = req.body;

  const user = await User.findOne({
    mobile,
  });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  if (user.otp !== otp || user.otpExpires < Date.now()) {
    return res.status(400).json({
      message: "Invalid OTP",
    });
  }

  res.json({
    message: "OTP verified",
  });
};

exports.resetPassword = async (req, res) => {
  const {
    mobile,

    password,
  } = req.body;

  const user = await User.findOne({
    mobile,
  });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const hash = await bcrypt.hash(password, 10);

  user.password = hash;

  user.otp = null;

  user.otpExpires = null;

  await user.save();

  res.json({
    message: "Password updated",
  });
};

exports.resendRegisterOTP = async (req, res) => {
  try {
    const { mobile } = req.body;

    const user = await User.findOne({
      mobile,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = otp;

    user.otpExpires = Date.now() + 5 * 60 * 1000;

    await user.save();

    res.json({
      message: "New OTP generated",

      otp, // remove in production
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
