
const mongoose = require("mongoose");

const rdvSchema = new mongoose.Schema({
    place: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place',
        required: true,
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver',
        required: true,
    },
    container: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Container',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    status:{
        type:String,
        enum:["active","inactive"],
        default:"active"
    }
}, { timestamps: true });

const Rdv = mongoose.model("Rdv", rdvSchema);
module.exports = Rdv;

