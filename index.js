require('dotenv').config();
const express = require('express');
const db = require('./db');

const app = express();

const PORT = process.env.PORT || 3000;

db.connect();

app.use('/', (req, res) => {
    res.send('Hello world!')
})


const serverCallback = () => {
    console.log(`Server listening at http://localhost:${PORT}`)
}

app.listen(PORT, serverCallback);