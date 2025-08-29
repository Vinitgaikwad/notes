const { Router } = require("express");
const { CheckAuth } = require("../middlewares/NotesMiddleware");
const { Note } = require("../zod/NoteSchema");
const Notes = require("../models/Notes");
const { success } = require("zod");

const NotesRouter = Router();

// Add Note
NotesRouter.post('/add', CheckAuth, async (req, res) => {
    const { note } = req.body;
    const { userId } = req.userId;

    try {
        Note.parse(note);

        const newNote = new Notes({
            note,
            id: userId
        });

        await newNote.save();

        res.status(200).json({
            error: null,
            success: true
        });
    } catch (error) {
        res.status(400).json({
            error,
            success: false
        });
    }
});

// Edit Note
NotesRouter.post('/edit', CheckAuth, async (req, res) => {
    const { noteId, note } = req.body;
    const { userId } = req.userId;

    try {
        Note.parse(note);

        const noteUpdate = await Notes.updateOne({ _id: noteId, id: userId }, { $set: { note } });

        if (noteUpdate.modifiedCount === 0) {
            res.status(200).json({
                noteUpdate,
                success: false,
                error: "No Such obj exist!"
            });
            return;
        }

        res.status(200).json({
            noteUpdate,
            success: true,
            error: null
        });
    } catch (error) {
        res.status(404).json({
            error,
            success: false
        });
    }
});

// Delete notes
NotesRouter.delete('/delete', CheckAuth, async (req, res) => {
    const { userId } = req.userId;
    const { noteId } = req.body;

    try {
        const deleteNote = await Notes.deleteOne({ _id: noteId, id: userId });
        console.log(deleteNote.deletedCount);

        if (deleteNote.deletedCount === 1) {
            res.status(200).json({
                success: true,
                error: null
            });
            return;
        }
        res.status(200).json({
            success: false,
            error: "No Obj Exist!"
        });
    } catch (error) {
        res.status(404).json({
            error,
            success: false
        });
    }
});

// get all notes
NotesRouter.get('/get-notes', CheckAuth, async (req, res) => {
    const { userId } = req.userId;

    try {
        const notes = await Notes.find({ id: userId });

        console.log(notes);

        if (notes.length > 0) {
            res.status(200).json({
                success: true,
                error: null
            });
        }

        res.status(404).json({
            success: false,
            error: "wrong obj id!"
        });
    } catch (error) {
        res.status(400).json({
            success: true,
            error
        });
    }
});

module.exports = NotesRouter;