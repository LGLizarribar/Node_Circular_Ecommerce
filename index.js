require('dotenv').config();
const express = require('express');
const db = require('./db');


const app = express();

const PORT = process.env.PORT || 3000;

db.connect();

app.use('/', (req, res) => {
  res.send('Hello world!');
});


app.use('*', (req, res, next) => {
  const error = new Error('Route not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  return res.status(error.status || 500)
      .render('error', {error: error.message || 'Unexpected error'});
});


const serverCallback = () => {
  console.log(`Server listening at http://localhost:${PORT}`);
};

app.listen(PORT, serverCallback);
