const User = require("../models/User");

// GET PROFILE

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password -otp");

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE PROFILE

exports.updateProfile = async (req, res) => {
  try {
    const { name } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,

      {
        name,
      },

      {
        new: true,
      },
    ).select("-password -otp");

    res.json({
      message: "Profile updated",

      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};