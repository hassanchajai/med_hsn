const mongoose = require("mongoose");

const portSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true,"please fill this field!"],
    },
    description: {
        type: String,
        required:[true,"please fill this field!"],
    },
    status:{
        type:String,
        enum:["active","inactive"],
        default:"active"
    }

},{timestamps:true});

const Port = mongoose.model("Port", portSchema);
module.exports = Port;
