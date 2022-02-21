const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({
    path: './config.env'
});
const connectDB = async () => {
  let attempts = 10;
  const database = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
  while (attempts) {
    try {
      await mongoose.connect(
        database, {
            useUnifiedTopology:true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        }
      );
      console.log('MongoDB connected...');
      // break out of loop once conncected
      break;
    } catch (err) {
      console.log("Error: ", err.message);
      attempts -= 1;
      console.log(`connection attempts left: ${attempts}`);
      // wait for 10 seconds before retrying
      await new Promise(res => setTimeout(res, 1000));
    }
  }
};
module.exports = { connectDB };
