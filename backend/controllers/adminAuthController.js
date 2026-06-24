const Admin = require("../models/Admin");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

exports.adminLogin = async (req, res) => {
  const {
    email,

    password,
  } = req.body;

  const admin = await Admin.findOne({
    email,
  });

  if (!admin) {
    return res.status(404).json({
      message: "Admin not found",
    });
  }

  const match = await bcrypt.compare(
    password,

    admin.password,
  );

  if (!match) {
    return res.status(400).json({
      message: "Wrong password",
    });
  }

  const token = jwt.sign(
    {
      id: admin._id,

      role: "admin",
    },

    process.env.JWT_SECRET,

    {
      expiresIn: "7d",
    },
  );

  res.json({
    message: "Admin login success",

    token,
  });
};