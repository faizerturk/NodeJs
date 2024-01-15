const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoConnect = require("./util/database").mongoConnect;
const User = require("./modals/user");
app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("65a119b7cc42b79ee1540e22")
    .then((user) => {
      console.log("User found", user);
      req.user = new User(user.username, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect((client) => {
  //console.log("client", client);
  app.listen(3000);
});
