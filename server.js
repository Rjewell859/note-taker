const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware used for JSON parsing

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

// Middleware for serving the public folder

app.use(express.static('public'));

// GET route for landing page

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET route for the notes page

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Bind to specified host and port and listen for any connections

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
