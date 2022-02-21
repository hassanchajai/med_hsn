
const mongoose = require("mongoose");

const paimentSchema = new mongoose.Schema({
    montant: {
        type: Number,
        required: true,
    },
    raison: {   
        type: String,
        required: true,
    },
    reservation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reservation',
        required: true,
    },
    status:{
        type:String,
        enum:["active","inactive"],
        default:"active"
    }
},{timestamps:true});

const Paiment = mongoose.model("Paiment", paimentSchema);
module.exports = Paiment;

