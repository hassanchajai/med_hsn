const mongoose = require('mongoose');
const { Schema } = mongoose;


const deliveryMangerSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: {
        type: String,
        default: "deliveryManager"
    },
});

module.exports = mongoose.model('deliveryManger', deliveryMangerSchema)