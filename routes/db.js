const notes = require('express').Router();
const {
  readFromFile,
  readAndAppend,
  writeToFile
} = require('../helpers/fsUtils');
const {
  v4: uuidv4
} = require('uuid');

// GET Route for retrieving all of the notes

notes.get('/', (req, res) => {
  console.log(req)
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// GET Route for retrieving individual notes

notes.get('/:note_id', (req, res) => {
  const noteId = req.params.note_id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.note_id === noteId);
      return result.length > 0 ?
        res.json(result) :
        res.json('No note with that ID');
    });
});

// POST Route for adding a new note

notes.post('/', (req, res) => {
  console.log(req.body);

  const {
    title,
    text
  } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      note_id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully 🚀`);
  } else {
    res.error('Error in adding note');
  }
});

// DELETE Route for removing a single note

notes.delete('/:note_id', (req, res) => {
  const noteId = req.params.note_id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {

      // Filters the array by creating a new array where the note id 
      // cannot be equivalent to the note id selected for deletion

      const result = json.filter((note) => note.note_id !== noteId);

      // Writes the resulting array to db.json

      writeToFile('./db/db.json', result);

      // Respond to the DELETE request confirming the deletion
      
      res.json(`Item ${noteId} has been deleted 🗑️`);
    });
});

module.exports = notes;