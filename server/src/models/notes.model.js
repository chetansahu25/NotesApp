const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    organisationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organisation"
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxLength: [100, 'Title cannot be more than 100 characters']
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
        trim: true
    },
    userId: {
        name: { type: String, required: true },
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required']
    },
    status: {
        type: String,
        enum: ['active', 'archived', 'deleted'],
        default: 'active'
    },
    updatedBy: {
        name: { type: String, required: true },
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Updater ID is required']
    }
}, {
    timestamps: true,
});

// Indexing for faster queries
notesSchema.index({ tenantId: 1, status: 1 });
notesSchema.index({ tenantId: 1, tags: 1 });

// Create a text indexing for search functionality
notesSchema.index({ title: 'text', content: 'text' });

const Notes = mongoose.model('Notes', notesSchema);

module.exports = Notes;