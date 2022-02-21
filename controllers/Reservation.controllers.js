
const Quais = require("../models/Quais.model");
const Reservation = require("../models/Reservation.model");

// get all products
exports.get_all = function (req, res,next) {
  Reservation.find()
    .then((Reservations) => {
      // Check if Reservations exists
      if (!Reservations || Reservations.length === 0) {
        return res.status(404).send({
          status: false,
          message: "no Reservation found",
        });
      } else {
        return res.status(200).send({
          status: true,
          Reservations: Reservations,
        });
      }
    })
    .catch((err) =>
    next(err)
    );
};

// // get one Reservation
exports.get_one = function (req, res,next) {

  // Find account with matching id
  Reservation.findById(req.params.id)
    .then((Reservation) => {
      if (!Reservation) {
        res.status(400).send({
          status: false,
          message: "Reservation doesn't exist",
        });
      } else {
        return res.status(200).send({
          status: true,
          Reservation: Reservation,
        });
      }
    })
    .catch((err) =>
    next(err)
    );
};
exports.reserve = (req, res,next) => {

  // 1-get not reserved quais 
  Quais.find({
    isReserved: false
  }).then(async data => {
    if (data.length == 0) {
      return res.status(400).send({
        status: false,
        message: "no quais available",
      });
    }
    const quaisisnotreserved = await Quais.findOne({ isReserved: false });
    // 2-update quais
    quaisisnotreserved.isReserved = true;
    await quaisisnotreserved.save()
    const newReservations = new Reservation({
      from: req.body.from,
      to: req.body.to,
      quais: quaisisnotreserved._id,
      ship: req.body.ship_id,
      journal: {
        action: "quais is reserved",
        date: Date.now()
      },
      status: "pending"
    })
    await newReservations.save()
    return res.status(200).send({
      status: true,
      message: "Reservation done please wait for confirmation",
      Reservation: newReservations
    })
  }).catch(err=>{
    next(err)
  })

}
exports.changeStatus =async (req, res) => {
 
}

