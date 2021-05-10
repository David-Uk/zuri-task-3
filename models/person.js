const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: { required: true, type: String },
  email: { required: true, type: String, unique: true },
  country: { required: true, type: String },
});

module.exports = mongoose.model("PersonModel", personSchema);
