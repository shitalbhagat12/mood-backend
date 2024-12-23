const mongoose = require('mongoose');

const moodSchema = new mongoose.Schema({
  message: { type: String, required: true },
  mood: { type: String },
  suggestions: { type: [String]}, // Array of suggestions
  date: { type: Date, default: Date.now },
});



// create  the model
const Mood = mongoose.model('Mood', moodSchema);

module.exports = Mood;
