const mongoose = require("mongoose");

class Mongo {
  gridfs = null;
  static connect = () => {
    mongoose
      .connect("mongodb://localhost:27017/Lab10")
      .then(() => {
        console.log("Connect successfully");
      })
      .catch((err) => {
        console.log("Connection fail");
      });
  };
}
module.exports = Mongo;