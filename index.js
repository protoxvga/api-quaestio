require('dotenv').config();             // Load environment variables from .env file
require('./src/database/database');     // Connect to database

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const router = require('./src/routes/router');

// Create express app
const app = express();
// Set port
const port = 8080;

// Middleware to parse request body to JSON format and allow CORS
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes middleware
app.use('/', router);

// Start server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});