
const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:["active","inactive"],
        default:"active"
    }
},{timestamps:true});

const Driver = mongoose.model("Driver", driverSchema);
module.exports = Driver;

