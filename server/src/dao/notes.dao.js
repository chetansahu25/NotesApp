const notes = require("../models/notes.model");

// Create a new note
async function createNote({ title, content, status, userId, organisationId, updatedBy }) {
    const newNote = await notes.create({ title, content, status, userId, organisationId, updatedBy });
    // Fetch the populated note to include user names
    const populatedNote = await notes.findById(newNote._id)
        .populate('userId', 'name')
        .populate('updatedBy', 'name');
    return populatedNote;
}

// Get all active notes
async function getNotes(userId) {
    const allNotes = await notes.find({ 
        userId,
        status: 'active'
        
    })
    .populate('userId', 'name')
    .populate('updatedBy', 'name');
    return allNotes;
}

//get deleted Notes
async function getDeletedNotes(userId) {
    const allNotes = await notes.find({ 
        userId,
        status: 'deleted'
        
    })
    .populate('userId', 'name')
    .populate('updatedBy', 'name');
    return allNotes;
}

// Get a note by ID
async function getNoteById(id) {
    const note = await notes.findById(id)
    .populate('userId', 'name')
    .populate('updatedBy', 'name');
    return note;
}

// get all notes by organisationId
async function getNotesByOrganisationId(organisationId) {
    const allNotes = await notes.find({ organisationId, status: 'active' })
    .populate('userId', 'name')
    .populate('updatedBy', 'name');
    return allNotes;
}

async function getDeletedNotesByOrganisationId(organisationId) {
    const allNotes = await notes.find({ organisationId, status: 'deleted' })
    .populate('userId', 'name')
    .populate('updatedBy', 'name');
    return allNotes;
}

// Update a note
async function updateNote(id, { title, content, status, updatedBy }) {
    const updatedNote = await notes.findByIdAndUpdate(
        id, 
        { title, content, status, updatedBy }, 
        { new: true }
    )
    .populate('userId', 'name')
    .populate('updatedBy', 'name');
    console.log(updatedNote)
    return updatedNote;
}

// Delete a note
async function deleteNote(id) {
    await notes.findByIdAndUpdate(id, { status: 'deleted' });
    return { message: "Note deleted successfully" };
}

async function noteDbDelete(id) {
    await notes.findByIdAndDelete(id);
    return { message: "Note permanently deleted" };
}

module.exports = {
    createNote,
    getNotes,
    getNoteById,
    updateNote,
    deleteNote,
    noteDbDelete,
    getNotesByOrganisationId,
    getDeletedNotes,
    getDeletedNotesByOrganisationId
};