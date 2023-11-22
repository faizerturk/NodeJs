const express = require("express");

const app = express();

app.use((req, res, next) => {
  console.log("In the middleware!");
  next(); //allows the request to continue to the next  middleware in line
});

app.use((req, res, next) => {
  console.log("heree!");
  res.send("<h1>Hello from Express!</h1>");
});

// const server = http.createServer(app);
// server.listen(3000);

// the two lines of vanilla node.js code above are equal to the express.js code below

app.listen(3000);
