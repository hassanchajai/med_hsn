const express = require('express');
const mongoose = require('mongoose');
const app = express();
// const router = require('./routes/routes')
const cors = require('cors')
 require('dotenv').config();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors())

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true ,  useUnifiedTopology: true  }, () => {
    console.log('Database Connected') 
})

// app.use('/api/', router)

app.listen(process.env.PORT, () => {
    console.log(`The server is running at http://localhost:${process.env.PORT}`)
})