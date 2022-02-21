
const Categorie = require("../models/Categorie.model");

// get all Categories
exports.get_all = function (req, res,next) {
  Categorie.find()
    .then((Categories) => {
      // Check if Categories exists
      if (!Categories || Categories.length === 0) {
        return res.status(404).send({
          status: false,
          message: "no Categorie found",
        });
      } else {
        return res.status(200).send({
          status: true,
          Categories: Categories,
        });
      }
    }) 
    .catch((err) =>
    next(err)
    );
};

// // get one Categorie
exports.get_one = function (req, res,next) {


  // Find account with matching id
  Categorie.findById(req.params.id)
    .then((Categorie) => {
      if (!Categorie) {
        res.status(400).send({
          status: false,
          message: "Categorie doesn't exist",
        });
      } else {
        return res.status(200).send({
          status: true,
          Categorie: Categorie,
        });
      }
    })
    .catch(() =>
    next(err)
    );
};

// add a Categorie
exports.add = async function (req, res,next) {
  let newCategorie = new Categorie(req.body);
  newCategorie
    .save()
    .then((Categorie) => {
      return res.status(200).send({
        status: true,
        message: "Categorie added successfully",
        Categorie,
      });
    })
    .catch((err) => {
      next(err)
    });
};

// update a Categorie
exports.update =async function (req, res) {

//   get the old proudct with id 
  const oldCategorie = await Categorie.findById(req.params.id);
  if (!oldCategorie) {
    return res.status(404).send({
      status: false,
      message: "cannot find the Categorie with id " + req.params.id,
    });
  }
    oldCategorie.update( req.body, async (err, docs) => {
    if (err) {
      next(err)
    }

    return res.status(200).send({
      status: true,
      message: "Categorie updated succefully!",
    });
  });
};

// // delete a Categorie: change status to deleted
exports.delete = function (req, res,next) {

  // Find Categorie by id
  Categorie.findById(req.params.id)
    .then((Categorie) => {
      if (!Categorie) {
        res.status(400).send({
          status: false,
          message: "Categorie doesn't exist",
        });
      } else {
        Categorie.status = "inactive";
        Categorie
          .save()
          .then(() =>
            res.status(200).send({
              status: true,
              message: "Categorie successfuly deleted",
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
    .catch((err) =>
    next(err)
    );
};


  