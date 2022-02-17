const mongoose = require("mongoose");
const { Schema } = mongoose;
// const Schema = mongoose.Schema;

const Reservations = new Schema(
  {
    reference: String,
    checkIdDate: String,
    checkOutDate: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reservations", Reservations);
