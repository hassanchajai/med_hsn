const mongoose = require("mongoose");
const { Schema } = mongoose;

const Roles = new Schema(
  {
    reference: String,
    description: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Roles", Roles);
