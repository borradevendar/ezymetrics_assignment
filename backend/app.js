// app.js
const express = require('express');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/api');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/api', apiRoutes);

mongoose.connect(process.env.MONGO_URI);

module.exports = app;
