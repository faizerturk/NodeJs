const path = require("path");
const sequelize = require("./util/database");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const Product = require("./modals/product");
const User = require("./modals/user");

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

sequelize
  .sync()
  .then((result) => {
    return User.findByPk(1);
    //console.log(result);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Murat", email: "Murat@gmail.com" });
    }
    return user;
    //return a value in a then block, it is automatically wrapped into a new promise so these two returns type are equal
  })
  .then((user) => {
    // console.log(user);
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
