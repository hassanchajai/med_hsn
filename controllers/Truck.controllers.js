
const Truck = require("../models/truckModel");

// get all products
exports.get_all = function (req, res,next) {
  Truck.find()
    .then((Trucks) => {
      // Check if Trucks exists
      if (!Trucks || Trucks.length === 0) {
        return res.status(404).send({
          status: false,
          message: "no Truck found",
        });
      } else {
        return res.status(200).send({
          status: true,
          Trucks: Trucks,
        });
      }
    }) 
    .catch(() =>
    next(err)
    );
};

// // get one Truck
exports.get_one = function (req, res) {


  // Find account with matching id
  Truck.findById(req.params.id)
    .then((Truck) => {
      if (!Truck) {
        res.status(400).send({
          status: false,
          message: "Truck doesn't exist",
        });
      } else {
        return res.status(200).send({
          status: true,
          Truck: Truck,
        });
      }
    })
    .catch(() =>
    next(err)
    );
};

// add a Truck
exports.add = async function (req, res) {
  let newTruck = new Truck(req.body);
  newTruck
    .save()
    .then((Truck) => {
      return res.status(200).send({
        status: true,
        message: "Truck added successfully",
        Truck,
      });
    })
    .catch((err) => {
      return res.status(400).send({
        status: false,
        message: err,
      });
    });
};

// update a Truck
exports.update =async function (req, res) {

//   get the old proudct with id 
  const oldTruck = await Truck.findById(req.params.id);
  if (!oldTruck) {
    return res.status(404).send({
      status: false,
      message: "cannot find the Truck with id " + req.params.id,
    });
  }
    oldTruck.update( req.body, async (err, docs) => {
    if (err) {
      return res.status(200).send({
        status: false,
        message: err,
      });
    }

    return res.status(200).send({
      status: true,
      message: "Truck updated succefully!",
    });
  });
};

// // delete a Truck: change status to deleted
exports.delete = function (req, res) {

  // Find Truck by id
  Truck.findById(req.params.id)
    .then((Truck) => {
      if (!Truck) {
        res.status(400).send({
          status: false,
          message: "Truck doesn't exist",
        });
      } else {
        Truck.status = "inactive";
        Truck
          .save()
          .then(() =>
            res.status(200).send({
              status: true,
              message: "Truck successfuly deleted",
            })
          )
          .catch(() =>
            res.status(500).send({
              status: false,
              message: "error while saving changes to db",
            })
          );
      }
    })
    .catch(() =>
      res.status(500).send({
        status: false,
        message: "Error while searshing for Truck",
      })
    );
};


  