
const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
    x: {
        type: Number,
        required: true,
    },
    y: {
        type: Number,
        required: true,
    },
    levels: {
        type: Number,
        required: true,
    },
    isReserved: {
        type: Boolean,
        default: false,
    },
    enterpot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Enterpot',
        required: true,
    },
    containers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Container'
    }],
    enterpot: {
        type: String,
        required: true,
        enum:["A","B","C","D","E"]
    },
    port: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Port',
        required: true,
    },
    status:{
        type:String,
        enum:["active","inactive"],
        default:"active"
    }
}, { timestamps: true });

const Place = mongoose.model("Place", placeSchema);
module.exports = Place;

