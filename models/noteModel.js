const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  noteTitle: {
    type: String,
    required: [true, 'Note title is required']
  },
  noteContent: {
    type: String,
    required: [true, 'Note content is required']
  },
  noteAttachment: {
    type: String // Stores filename or URL
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Note', noteSchema);
