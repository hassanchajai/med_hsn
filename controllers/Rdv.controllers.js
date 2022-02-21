
const Rdv = require("../models/Rdv.model");

// get all products
exports.get_all = function (req, res,next) {
  Rdv.find()
    .then((Rdvs) => {
      // Check if Rdvs exists
      if (!Rdvs || Rdvs.length === 0) {
        return res.status(404).send({
          status: false,
          message: "no Rdv found",
        });
      } else {
        return res.status(200).send({
          status: true,
          Rdvs: Rdvs,
        });
      }
    }) 
    .catch(() =>
     next(err)
    );
};

// // get one Rdv
exports.get_one = function (req, res,next) {


  // Find account with matching id
  Rdv.findById(req.params.id)
    .then((Rdv) => {
      if (!Rdv) {
        res.status(400).send({
          status: false,
          message: "Rdv doesn't exist",
        });
      } else {
        return res.status(200).send({
          status: true,
          Rdv: Rdv,
        });
      }
    })
    .catch(() =>
     next(err)
    );
};

// add a Rdv
exports.add = async function (req, res,next) {
  let newRdv = new Rdv(req.body);
  newRdv
    .save()
    .then((Rdv) => {
      return res.status(200).send({
        status: true,
        message: "Rdv added successfully",
        Rdv,
      });
    })
    .catch((err) => {
   next(err)
    });
};

// update a Rdv
exports.update =async function (req, res,next) {

//   get the old proudct with id 
  const oldRdv = await Rdv.findById(req.params.id);
  if (!oldRdv) {
    return res.status(404).send({
      status: false,
      message: "cannot find the Rdv with id " + req.params.id,
    });
  }
    oldRdv.update( req.body, async (err, docs) => {
    if (err) {
      next(err)
    }

    return res.status(200).send({
      status: true,
      message: "Rdv updated succefully!",
    });
  });
};

// // delete a Rdv: change status to deleted
exports.delete = function (req, res,next) {

  // Find Rdv by id
  Rdv.findById(req.params.id)
    .then((Rdv) => {
      if (!Rdv) {
        res.status(400).send({
          status: false,
          message: "Rdv doesn't exist",
        });
      } else {
        Rdv.status = "inactive";
        Rdv
          .save()
          .then(() =>
            res.status(200).send({
              status: true,
              message: "Rdv successfuly deleted",
            })
          )
          .catch((err) =>
          next(err)
          );
      }
    })
    .catch((err) =>
    next(err)
    );
};


  