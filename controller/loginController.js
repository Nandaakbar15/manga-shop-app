const User = require("../models/user");

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      console.log("Email atau password salah!");
    }

    // Compare the hashed password
    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res.status(404).send("Invalid username or password!");
    }

    // Check the user's role
    if (user.role === "admin") {
      return res.redirect("/admin");
    } else {
      return res.redirect("/user");
    }
  } catch (error) {
    console.error("Failed to login user!", error);
    res.status(500).send("Login failed!");
  }
};
