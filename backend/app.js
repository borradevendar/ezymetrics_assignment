// app.js
const express = require('express');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/api');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/api', apiRoutes);


url = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017'
mongoose.connect(url);

module.exports = app;
