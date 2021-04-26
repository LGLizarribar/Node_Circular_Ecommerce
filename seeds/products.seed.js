require('dotenv').config();
const mongoose = require('mongoose');
const db = require('../db');

const Product = require('../models/Product');

const products = [
  {
    name: 'El nombre del viento - Patrick Rothfuss',
    category: 'Books',
    price: 13,
    productImage: 'https://images-na.ssl-images-amazon.com/images/I/91PjnllfsxL.jpg',
  },
  {
    name: 'Fallout 4',
    category: 'Videogames',
    price: 10,
    productImage: 'https://image.api.playstation.com/vulcan/ap/rnd/202009/2500/4GZyUQ1bHTjICP6GCRG7f65n.png',
  },
  {
    name: 'Munchkin Deluxe',
    category: 'Boardgames',
    price: 15.25,
    productImage: 'https://images-na.ssl-images-amazon.com/images/I/71SNBYYnaYL._AC_SX466_.jpg',
  },
];

mongoose
    .connect(db.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then( async () => {
      const allProducts = await Product.find();

      if (allProducts.length) {
        await Product.collection.drop();
      }
    })
    .catch((err) => {
      console.log('Error deleting data: ', err);
    })
    .then( async () => {
      await Product.insertMany(products);
    })
    .catch((err) => {
      console.log('Error adding data to DB: ', err);
    })
    .finally(() => {
      mongoose.disconnect();
    });
