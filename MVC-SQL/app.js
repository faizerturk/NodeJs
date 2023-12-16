const path = require("path");
const db = require("./util/database");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// db.execute("SELECT * FROM products")
//   .then((result) => {
//     console.log("result", result[0], result[1]);
//   })
//   .catch((err) => {
//     console.log("err", err);
//   });

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);
