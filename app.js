const express = require("express");
const app = express();
const port = 3000;
const expressLayouts = require("express-ejs-layouts");
const router = require("./routes/route");

require("./config/db");

// set up the view engine
app.set("view engine", "ejs");

app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// routes
app.use(router);

// server
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
