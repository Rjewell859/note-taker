const express = require('express');

// Importing modular route for /db

const notesRouter = require('./db');

const app = express();
app.use('/notes', notesRouter);

module.exports = app;