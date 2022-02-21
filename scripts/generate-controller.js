if (process.argv.length < 2) {
    console.log('\x1b[31m%s\x1b[0m', 'Please provide a controller name')
    process.exit();
}
const model_name = process.argv[2]
const model = model_name[0].toUpperCase() + model_name.split("").slice(1, model_name.length).join("");

const template = `
const ${model} = require("./${model}.model");

// get all ${model}s
exports.get_all = function (req, res) {
  ${model}.find()
    .then((${model}s) => {
      // Check if ${model}s exists
      if (!${model}s || ${model}s.length === 0) {
        return res.status(404).send({
          status: false,
          message: "no ${model} found",
        });
      } else {
        return res.status(200).send({
          status: true,
          ${model}s: ${model}s,
        });
      }
    }) 
    .catch(() =>
      res.status(500).send({
        status: false,
        message: "Error while searching for ${model}s",
      })
    );
};

// // get one ${model}
exports.get_one = function (req, res) {


  // Find account with matching id
  ${model}.findById(req.params.id)
    .then((${model}) => {
      if (!${model}) {
        res.status(400).send({
          status: false,
          message: "${model} doesn't exist",
        });
      } else {
        return res.status(200).send({
          status: true,
          ${model}: ${model},
        });
      }
    })
    .catch(() =>
      res.status(500).send({
        status: false,
        message: "Error while searching for ${model}",
      })
    );
};

// add a ${model}
exports.add = async function (req, res) {
  let new${model} = new ${model}(req.body);
  new${model}
    .save()
    .then((${model}) => {
      return res.status(200).send({
        status: true,
        message: "${model} added successfully",
        ${model},
      });
    })
    .catch((err) => {
      return res.status(400).send({
        status: false,
        message: err,
      });
    });
};

// update a ${model}
exports.update =async function (req, res) {

//   get the old proudct with id 
  const old${model} = await ${model}.findById(req.params.id);
  if (!old${model}) {
    return res.status(404).send({
      status: false,
      message: "cannot find the ${model} with id " + req.params.id,
    });
  }
    old${model}.update( req.body, async (err, docs) => {
    if (err) {
      return res.status(200).send({
        status: false,
        message: err,
      });
    }

    return res.status(200).send({
      status: true,
      message: "${model} updated succefully!",
    });
  });
};

// // delete a ${model}: change status to deleted
exports.delete = function (req, res) {

  // Find ${model} by id
  ${model}.findById(req.params.id)
    .then((${model}) => {
      if (!${model}) {
        res.status(400).send({
          status: false,
          message: "${model} doesn't exist",
        });
      } else {
        ${model}.status = "inactive";
        ${model}
          .save()
          .then(() =>
            res.status(200).send({
              status: true,
              message: "${model} successfuly deleted",
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
        message: "Error while searshing for ${model}",
      })
    );
};


  `
const fs = require('fs');

const fileExists = path => file => fs.existsSync(`${path}/${file}`);

const writeToPath = path => (file, content) => {
    const filePath = `${path}/${file}`;

    fs.appendFile(filePath, content, err => {
        if (err) throw err;
        console.log("Created Controller success: ", filePath);
        return true;
    });
};

const exec = (model) => {
    const path = `controllers`;
    if (fileExists(path)(model + '.controller.js')) {
        console.log('\x1b[31m%s\x1b[0m', 'Controller already exists')
        console.log('');
        return;
    }
    writeToPath(path)(model + '.controllers.js', template);
    console.log('\x1b[32m%s\x1b[0m', 'Controller created!')
}
exec(model);