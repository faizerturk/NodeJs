const express = require("express");

const app = express();

app.use("/user", (req, res, next) => {
  res.send("<h1>User page</h1>");
});

app.use("/", (req, res, next) => {
  console.log("/ main page");
  res.send("<h1>Main Page</h1>");
});

app.listen(3000);
