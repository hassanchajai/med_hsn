
const mongoose = require("mongoose");

const categorieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please fill this field!"],
    },
    unit: {
        type: String,
        required: [true, "Please fill this field!"],
    },
    status:{
        type:String,
        enum:["active","inactive"],
        default:"active"
    }
},{timestamps:true});

const Categorie = mongoose.model("Categorie", categorieSchema);
module.exports = Categorie;

