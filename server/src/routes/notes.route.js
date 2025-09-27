const express = require('express');
const { handleCreateNote, 
    handleGetNotes, 
    handleGetNoteById, 
    handleUpdateNote, 
    handleDeleteNote,
    handleGetDeletedNotes,
    handleNoteDbDelete
 } = require('../controllers/notes.controller');

const router = express.Router();



// Create a new note
router.post('/create', handleCreateNote);

// Get all notes
router.get('/', handleGetNotes);

//get all deleted notes
router.get("/deleted", handleGetDeletedNotes)

// Get a note by ID
router.get('/:id', handleGetNoteById);

// Update a note
router.put('/:id', handleUpdateNote);

// Delete a note
router.delete('/:id', handleDeleteNote);

router.delete('/permanent/:id', handleNoteDbDelete);


module.exports = router;