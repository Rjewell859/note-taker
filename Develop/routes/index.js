const express = require('express');


const notesRouter = require('./db');


const app = express();

app.use('/notes', notesRouter);

module.exports = app;