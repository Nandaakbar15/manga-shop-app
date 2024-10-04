const UserModel = require("../models/user");
const bcryptjs = require("bcryptjs");

exports.register = async (req, res) => {
  try {
    // Hash the password before saving it
    const hashedPassword = await bcryptjs.hash(req.body.password, 10);

    const newUser = new UserModel({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();
    // res.send("User registered successfully!");
  } catch (error) {
    console.error("Failed to register user!", error);
    res.status(500).send("Registration failed!");
  }
};
