const mongoose = require("mongoose");
const URL = process.env.MongoURl
require("dotenv").config();

const connection = mongoose.connect(URL);

module.exports = {
  connection,
};
