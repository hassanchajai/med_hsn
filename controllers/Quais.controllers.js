
const Quais = require("../models/Quais.model");

// get all products
exports.get_all = function (req, res, next) {
  Quais.find()
    .then((Quaiss) => {
      // Check if Quaiss exists
      if (!Quaiss || Quaiss.length === 0) {
        return res.status(404).send({
          status: false,
          message: "no Quais found",
        });
      } else {
        return res.status(200).send({
          status: true,
          Quaiss: Quaiss,
        });
      }
    })
    .catch(() =>
      next(err)
    );
};

// // get one Quais
exports.get_one = function (req, res) {


  // Find account with matching id
  Quais.findById(req.params.id)
    .then((Quais) => {
      if (!Quais) {
        res.status(400).send({
          status: false,
          message: "Quais doesn't exist",
        });
      } else {
        return res.status(200).send({
          status: true,
          Quais: Quais,
        });
      }
    })
    .catch(() =>
     next(err)
    );
};

// add a Quais
exports.add = async function (req, res) {
  let newQuais = new Quais(req.body);
  newQuais
    .save()
    .then((Quais) => {
      return res.status(200).send({
        status: true,
        message: "Quais added successfully",
        Quais,
      });
    })
    .catch((err) => {
     next(err)
    });
};

// update a Quais
exports.update = async function (req, res) {

  //   get the old proudct with id 
  const oldQuais = await Quais.findById(req.params.id);
  if (!oldQuais) {
    return res.status(404).send({
      status: false,
      message: "cannot find the Quais with id " + req.params.id,
    });
  }
  oldQuais.update(req.body, async (err, docs) => {
    if (err) {
    next(err)
    }

    return res.status(200).send({
      status: true,
      message: "Quais updated succefully!",
    });
  });
};

// // delete a Quais: change status to deleted
exports.delete = function (req, res) {

  // Find Quais by id
  Quais.findById(req.params.id)
    .then((Quais) => {
      if (!Quais) {
        res.status(400).send({
          status: false,
          message: "Quais doesn't exist",
        });
      } else {
        Quais.status = "inactive";
        Quais
          .save()
          .then(() =>
            res.status(200).send({
              status: true,
              message: "Quais successfuly deleted",
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
    next(err)
    );
};


