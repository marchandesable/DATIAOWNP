const express = require('express');
const cors = require('cors');
require('dotenv').config();

const healthRouter = require('./routes/health.route');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/health', healthRouter);

module.exports = app;
