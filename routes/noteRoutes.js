const express = require('express');
const router = express.Router();
const upload = require('../middleware/multerUpload');

const {
  getNotes,
  createNote,
  updateNote,
  getSingleNote,
  deleteNote
} = require('../controllers/noteController');

router.get('/', getNotes);
router.get('/:id', getSingleNote);
router.post('/', upload.single('noteAttachment'), createNote);
router.put('/:id', upload.single('noteAttachment'), updateNote);
router.delete('/:id', deleteNote);

module.exports = router;
