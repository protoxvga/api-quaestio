const mongoose = require('mongoose');

// Connect to database using environment variable
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Get the default connection
var database = mongoose.connection;

database.on('error', console.error.bind(console, 'connection error:'));

// Bind connection to error event (to get notification of connection errors)
database.once('open', function() {
    console.log("Database connected successfully");
});

module.exports = database;