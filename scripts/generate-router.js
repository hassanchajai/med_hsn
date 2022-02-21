if (process.argv.length < 2) {
    console.log('\x1b[31m%s\x1b[0m', 'Please provide a model name')
    process.exit();
  }
  const model_name = process.argv[2]
  const model = model_name[0].toUpperCase() + model_name.split("").slice(1, model_name.length).join("");
  
  const template = `
  const mongoose = require("mongoose");
  
  const ${model_name}Schema = new mongoose.Schema({
  
  },{timestamps:true});
  
  const ${model} = mongoose.model("${model}", ${model_name}Schema);
  module.exports = ${model};
  
  `
  const fs = require('fs');
  
  const fileExists = path => file => fs.existsSync(`${path}/${file}`);
  
  const writeToPath = path => (file, content) => {
    const filePath = `${path}/${file}`;
  
    fs.appendFile(filePath, content, err => {
      if (err) throw err;
      console.log("Created model success: ", filePath);
      return true;
    });
  };
  
  const exec = (model) => {
    const path = `models`;
    if (fileExists(path)(model + '.model.js')) {
      console.log('\x1b[31m%s\x1b[0m', 'Model already exists')
      console.log('');
      return;
    }
    writeToPath(path)(model + '.model.js', template);
    console.log('\x1b[32m%s\x1b[0m', 'Model created!')
  }
  exec(model);