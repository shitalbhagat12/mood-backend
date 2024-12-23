const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const moodRouter = require('./routes/moodRouter');
dotenv.config();
app.use(cors());
app.use(express.json());

//const geminiApi = require('./geminiApi');

app.use( moodRouter);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
