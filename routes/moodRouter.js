const express = require('express');
const router = express.Router();
const Mood = require('../models/mood');
const run = require('../geminiApi'); // Assuming this function processes the message and returns mood/suggestions.

router.post('/', async (req, res) => {
  const { user_id, message, date } = req.body;

  // Validate request body
  if (!user_id || !message) {
    return res.status(400).json({ error: 'user_id and message are required' });
  }

  try {
    const { mood, suggestions } = await run(message); // Replace with your logic for mood analysis.

    // Save mood data to the database
    const moodData = await Mood.create({
      user_id,
      message,
      mood: mood || 'Unknown',
      suggestions: suggestions.length > 0 ? suggestions : ['No suggestions available'],
      date,
    });

    res.status(201).json(moodData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save mood data.' });
  }
});

router.get('/:user_id', async (req, res) => {
  try {
    const moods = await Mood.find({ user_id: req.params.user_id })
      .populate('user_id', 'name email') // Optional: Populate user details.
      .sort({ date: -1 });

    res.status(200).json(moods);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve moods.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const moodData = await Mood.findByIdAndDelete(req.params.id);
    if (!moodData) {
      return res.status(404).json({ error: 'Mood not found.' });
    }
    res.status(200).json({ message: 'Mood deleted successfully.', moodData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete mood data.' });
  }
});

module.exports = router;
