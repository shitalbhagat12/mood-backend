const Mood = require('../models/mood');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const moodRouter = require('./moodRouter');
const run = require('../geminiApi');

router.post('/', async (req, res) => {
    const { message, date } = req.body;

    try {
        const { mood, suggestions } = await run(message);

        // Save data in the database
        const moodData = await Mood.create({
            message,
            mood: mood || "Unknown", // Default to "Unknown" if null
            suggestions: suggestions.length > 0 ? suggestions : ["No suggestions available"], // Default suggestions
            date,
        });

        res.status(200).json(moodData);
    } catch (err) {
        res.status(400).json({ message: err.message });
        console.log(err);
    }
});


// Get all mood data
router.get('/', async (req, res) => {
    try {
        const moodData = await Mood.find().sort({ date: -1 });
        res.status(200).json(moodData);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Delete  mood data 
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const moodData = await Mood.findByIdAndDelete(id);
        res.status(200).json(moodData);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;

