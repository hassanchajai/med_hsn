
const mongoose = require("mongoose");

const containerSchema = new mongoose.Schema({
    weight: { type: Number, required: true },
    ship: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ship'
    },
    categorie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categorie'
    },
    journal: [{
        action: String,
        date: Date,
    }],
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required:true
    },
    status:{
        type:String,
        enum:["active","inactive"],
        default:"active"
    }
}, { timestamps: true });

const Container = mongoose.model("Container", containerSchema);
module.exports = Container;

