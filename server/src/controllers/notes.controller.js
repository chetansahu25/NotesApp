const { createNote, deleteNote, updateNote, getNoteById, getNotes, noteDbDelete, getNotesByOrganisationId } = require ("../dao/notes.dao");
const { isAdmin } = require("../dao/user.dao");

// Create a new note
async function handleCreateNote (req, res) {
    const { title, content, status } = req.body;
    const { userId, organisationId } = req;
    const updatedBy = userId;
    const newNote = await createNote({ title, content, status, userId, organisationId, updatedBy });
    return res.status(201).json(newNote);
}
// Get all notes
async function handleGetNotes(req, res) {
    const { userId } = req;
    const isAdminId =  await isAdmin(userId);
    console.log(isAdminId);
    

    if (isAdminId) {
        const { organisationId } = req;
        const notes = await getNotesByOrganisationId(organisationId);
        return res.status(200).json(notes);
    } else {
        const notes = await getNotes(userId);
        return res.status(200).json(notes);
    }
}

// Get a note by ID
async function handleGetNoteById(req, res) {
    const { id } = req.params;
    const note = await getNoteById(id);
    res.status(200).json(note);
}

// Update a note
async function handleUpdateNote(req, res) {
    const { userId } = req;
    const { id } = req.params;
    const _id = id
    const { title, content, status } = req.body;
    const updatedNote = await updateNote(_id, { title, content, status, updatedBy: userId });
    res.status(200).json(updatedNote);
}
// Delete a note
async function handleDeleteNote(req, res) {
    const { id } = req.params;
    const result = await deleteNote(id);
    res.status(200).json(result);
}   

async function handleNoteDbDelete(req, res) {
    const { id } = req.params;
    const result = await noteDbDelete(id);
    res.status(200).json(result);
}   

module.exports = {
    handleCreateNote,
    handleGetNotes,
    handleGetNoteById,
    handleUpdateNote,
    handleDeleteNote,
    handleNoteDbDelete
}; 