
const Port = require("../models/Port.model");

// get all products
exports.get_all = function (req, res, next) {
  Port.find()
    .then((Ports) => {
      // Check if Ports exists
      if (!Ports || Ports.length === 0) {
        return res.status(404).send({
          status: false,
          message: "no Port found",
        });
      } else {
        return res.status(200).send({
          status: true,
          Ports: Ports,
        });
      }
    })
    .catch(() =>
      next(err)

    );
};

// // get one Port
exports.get_one = function (req, res, next) {

  // Find account with matching id
  Port.findById(req.params.id)
    .then((Port) => {
      if (!Port) {
        res.status(400).send({
          status: false,
          message: "Port doesn't exist",
        });
      } else {
        return res.status(200).send({
          status: true,
          Port: Port,
        });
      }
    })
    .catch((err) =>
      next(err)
    );
};

// add a Port
exports.add = function (req, res, next) {
  let newPort = new Port(req.body);
  newPort
    .save()
    .then((Port) => {
      return res.status(200).send({
        status: true,
        message: "Port added successfully",
        Port,
      });
    })
    .catch((err) => {
      next(err)
    });
};

// update a Port
exports.update = async function (req, res,next) {

  //   get the old proudct with id 
  const oldPort = await Port.findById(req.params.id);
  if (!oldPort) {
    return res.status(404).send({
      status: false,
      message: "cannot find the Port with id " + req.params.id,
    });
  }
  oldPort.update(req.body, async (err, docs) => {
    if (err) {
    next(err)
    }

    return res.status(200).send({
      status: true,
      message: "Port updated succefully!",
    });
  });
};

// // delete a Port: change status to deleted
exports.delete = function (req, res,next) {

  // Find Port by id
  Port.findById(req.params.id)
    .then((Port) => {
      if (!Port) {
        res.status(400).send({
          status: false,
          message: "Port doesn't exist",
        });
      } else {
        Port.status = "inactive";
        Port
          .save()
          .then(() =>
            res.status(200).send({
              status: true,
              message: "Port successfuly deleted",
            })
          )
          .catch(() =>
           next(err)
          );
      }
    })
    .catch(() =>
      res.status(500).send({
        status: false,
        message: "Error while searshing for Port",
      })
    );
};


