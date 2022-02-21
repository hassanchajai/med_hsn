
const Reservation = require("../models/Reservation.model");

// get all products
exports.get_all = function (req, res) {
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
    .catch(() =>
      res.status(500).send({
        status: false,
        message: "Error while searching for Reservations",
      })
    );
};

// // get one Reservation
exports.get_one = function (req, res) {


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
    .catch(() =>
      res.status(500).send({
        status: false,
        message: "Error while searching for Reservation",
      })
    );
};


  