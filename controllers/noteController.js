const fs = require('fs');
const path = require('path');
const Note = require('../models/noteModel'); // Updated model name

// Get all notes
const getNotes = async (req, res, next) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (err) {
    next(err);
  }
};

// Create note with file upload
const createNote = async (req, res, next) => {
  try {
    const noteData = {
      noteTitle: req.body.noteTitle,
      noteContent: req.body.noteContent,
      noteAttachment: req.file ? req.file.filename : null
    };
    const newNote = await Note.create(noteData);
    res.status(201).json(newNote);
  } catch (err) {
    next(err);
  }
};

// Update note and optionally replace attachment
const updateNote = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });

    if (req.file && note.noteAttachment) {
      fs.unlinkSync(path.join('uploads', note.noteAttachment)); // delete old file
    }

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        noteAttachment: req.file ? req.file.filename : note.noteAttachment
      },
      { new: true }
    );

    res.status(200).json(updatedNote);
  } catch (err) {
    next(err);
  }
};

// Delete note and associated file
const deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });

    if (note.noteAttachment) {
      fs.unlinkSync(path.join('uploads', note.noteAttachment));
    }

    await Note.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Note deleted' });
  } catch (err) {
    next(err);
  }
};

// Get single note by ID
const getSingleNote = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });

    res.status(200).json(note);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  getSingleNote,
};
