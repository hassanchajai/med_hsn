const mongoose = require("mongoose");
const { Schema } = mongoose;

const Ship = new Schema(
  {
    name: String,
    capacity: String,
    nationality: String,
    type: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ship", Ship);
