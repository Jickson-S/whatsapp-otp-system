const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const Admin = require("./models/Admin");

mongoose
  .connect(process.env.MONGO_URL)

  .then(async () => {
    const password = await bcrypt.hash("admin123", 10);

    await Admin.create({
      email: "admin@gmail.com",

      password,
    });

    console.log("Admin Created");

    process.exit();
  })
  .catch((err) => {
    console.log(err);
  });
