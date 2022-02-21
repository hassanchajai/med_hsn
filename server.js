const dotenv = require('dotenv');
dotenv.config({
    path: './config.env'
});

process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION!!! shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

const app = require('./app');
const { connectDB } = require('./config/db');

connectDB().then(() => {
    console.log('Connected to database');
    app.listen(port, () => {
        console.log(`Application is running on port ${port}`);
    });
}).catch(err => {
    console.log(err.message || err);
})

// Start the server
const port = process.env.PORT;

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION!!!  shutting down ...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});