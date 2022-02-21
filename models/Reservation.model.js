
const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
    from: {
        type: Date,
        required: true,
    },
    to: {
        type: Date,
        required: true,
    },
    ship: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ship',
        required: true,
    },
    quais: {
        type: mongoose.Schema.Types.ObjectId,
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

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status:{
        type:String,
        enum:["active","inactive"],
        default:"active"
    }    
},{timestamps:true});

const Reservation = mongoose.model("Reservation", reservationSchema);
module.exports = Reservation;

