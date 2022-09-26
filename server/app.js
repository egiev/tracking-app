require('dotenv').config();
require('./config/database').connect();

const express = require('express');

const cors = require('cors');

const app = express();

const apiRoutes = require('./routes');

app.use(express.json());

app.use(cors());

app.use('/api/v1', apiRoutes);

module.exports = app;
