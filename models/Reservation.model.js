
const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
    from: {
        type: Date,
        required: [true, "Please provide a from date"],
        validate: {
            validator: function (value) {
                return value > new Date();
            }
        }
    },
    to: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value > this.from;
            }
        }
    },
    ship: {
        type: mongoose.Types.ObjectId,
        ref: 'Ship',
        required: true,
    },
    quais: {
        type: mongoose.Types.ObjectId,
        ref: 'Quais',
        required: true,
    },
    journal: [{
        action: String,
        date: Date,
    }],
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    },
    paiments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Paiment',
    }],
  
},{timestamps:true});

const Reservation = mongoose.model("Reservation", reservationSchema);
module.exports = Reservation;

