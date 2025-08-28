const mongoose = require('mongoose');

const NotesSchema = mongoose.Schema({
    note: { type: String, required: true },
    id: {
        ref: 'User',
        required: true,
        type: mongoose.Schema.Types.ObjectId
    }
}, { timestamps: true });

module.exports = mongoose.model('notes', NotesSchema)