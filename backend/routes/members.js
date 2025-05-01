const express = require('express');
const router = express.Router();
const multer = require('multer');
const Member = require('../models/Member');

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// POST /api/members
// POST /api/members
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, rollNumber, address, phone, email, degree, year, certifications, about, hobbies } = req.body;

    // Validation: roll number must be 7 digits
    if (!/^\d{7}$/.test(rollNumber)) {
      return res.status(400).json({ error: 'Roll number must be a 7-digit number.' });
    }

    // Check for unique roll number
    const existing = await Member.findOne({ rollNumber });
    if (existing) return res.status(400).json({ error: 'Roll number already exists.' });

    const newMember = new Member({
      name, rollNumber, address, phone, email, degree, year,
      certifications, about, hobbies,
      image: req.file?.filename
    });

    await newMember.save();
    res.status(201).json(newMember);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET /api/members
router.get('/', async (req, res) => {
  const members = await Member.find();
  res.json(members);
});

// GET /api/members/:id
router.get('/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).send("Member not found");
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// DELETE member by ID
router.delete('/:id', async (req, res) => {
  try {
      const member = await Member.findByIdAndDelete(req.params.id);
      if (!member) {
          return res.status(404).json({ message: 'Member not found' });
      }
      res.status(200).json({ message: 'Member deleted successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Error deleting member', error });
  }
});



module.exports = router;
