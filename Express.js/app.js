const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); //tells the Express.js app to serve static files from the "public" directory located in the same directory as the executing script. This is useful for when you want to include files like images, CSS, and JavaScript in your web application without having to define routes for each of them. When a file is requested, Express looks for it in the "public" directory first. If it finds the file, it sends it to the client; if not, it moves on to the next middleware.

app.use("/admin", adminData.routes);
app.use(shopRoutes);
app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Not Found!" });
});

app.listen(3000);
