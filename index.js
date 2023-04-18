require('dotenv').config();
require('./src/database/database');     

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./src/routes/router');

const app = express();
const port = 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', router);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});