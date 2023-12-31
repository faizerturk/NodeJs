const path = require("path");
const sequelize = require("./util/database");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const Product = require("./modals/product");
const User = require("./modals/user");
const Cart = require("./modals/cart");
const CartItem = require("./modals/cart-item");
const Order = require("./modals/order");
const OrderItem = require("./modals/order-item");

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
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem }); // {through: CartItem} -> telling sequelize where these connection should be stored
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order); // one-to-many -> one user can has many orders
Order.belongsToMany(Product, { through: OrderItem });

sequelize
  //.sync({ force: true })
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
    return user.createCart();
  })
  .then((cart) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
