
const mongoose = require("mongoose");

const quaisSchema = new mongoose.Schema({
    x:{
        type:Number,
        required:true,
    },
    y:{
        type:Number,
        required:true,
    
    },
    zone:{
        type:String,
        required:true,
    },
    isReserved:{
        type:Boolean,
        default:false,
    },
    port:{
        type:mongoose.Types.ObjectId,
        ref:'Port',
        required:true,
    },
    status:{
        type:String,
        enum:["active","inactive"],
        default:"active"
    }
},{timestamps:true});

const Quais = mongoose.model("Quais", quaisSchema);
module.exports = Quais;

