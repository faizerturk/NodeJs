const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://faize:r3RGN8OFfU2IiEl5@cluster0.zhfufyo.mongodb.net/"
  )
    .then((client) => {
      console.log("Connected to MongoDB: " + client);
      callback(client);
    })

    .catch((err) => console.log(err));
};

module.exports = mongoConnect;
