const mongoose = require("mongoose");
const { Schema } = mongoose;

const Users = new Schema(
  {
    name: String,
    email: String,
    password: String,
    nationality: String,
    organisation: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", Users)
