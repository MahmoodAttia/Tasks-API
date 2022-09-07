const mongoose = require("mongoose");

const connectToDb = async (uri) => await mongoose.connect(uri);
module.exports = connectToDb;
