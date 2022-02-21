const { connectDB } = require("../config/db");
const Place = require("../models/Place.model");
const Port = require("../models/Port.model");
const User = require("../models/userModel");
// const User = require("../models/userModel");
const random = (max = 50) => {
    return Math.floor((Math.random() * max)+1);
};
connectDB().then(async () => {
    await User.deleteMany()
    await Port.deleteMany()
    await Place.deleteMany()
    const admin = new User({
        name: "admin",
        email: "admin@admin.com",
        password: "admin",
        passwordConfirm: "admin",
        role: "admin"
    });
    await admin.save();
    const portInformation = {
        "name": "Tanger med",
        "description": "Tanger med is a hotel in Tanger, Morocco. It has a capacity of 100 people. It is located in Tanger, Morocco.",
    };
    const port = new Port(portInformation);
    await port.save();
    // add ref room type to rooms
    for (i = 1; i <= 1000; i++) {
        const place = new Place({
            x: i,
            y: i,
            levels: random(5),
            enterpot: i >= 1 && i <= 200 && "A" || i >= 200 && i <= 400 && "B" || i >= 400 && i <= 600 && "C" || i >= 600 && i <= 800 && "D" || i >= 800 && i <= 1000 && "E",
            containers: [],
            port:port._id
        });
        await place.save()
    }
    console.log("database seed successfuly!");
    process.exit()

})
