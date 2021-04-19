const mongoose = require('mongoose');

const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/circular-ecommerce-project';

const connect = async () => {
  try {
    const connection = await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    const {name, host} = connection.connections[0];
    console.log(`Connected to DB ${name} at ${host}`);
  } catch (err) {
    console.log('Error connecting to DB', err);
  }
};


module.exports = {
  connect,
  DB_URL,
};
