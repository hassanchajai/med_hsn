const mongoose = require("mongoose");

const truckSchema = new mongoose.Schema({
    reference:{
        type:String,
        required:true,
    },
    driver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Driver",
        required:true,
    },
    status:{
        type:String,
        enum:["active","inactive"],
        default:"active"
    }
},{timestamps:true});

const Truck = mongoose.model("Truck", truckSchema);
module.exports = Truck;
