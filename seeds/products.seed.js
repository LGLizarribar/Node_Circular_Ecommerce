require('dotenv').config();
const mongoose = require('mongoose');
const db = require('../db');

const Product = require('../models/Product');

const products = [
  {
    name: 'El nombre del viento - Patrick Rothfuss',
    category: 'Books',
    price: 13.50,
    productImage: 'https://images-na.ssl-images-amazon.com/images/I/91PjnllfsxL.jpg',
    // eslint-disable-next-line max-len
    description: 'El nombre del viento. Crónica del asesino de reyes: primer día (título original: The Name of the Wind. The Kingkiller Chronicle: Day One) es una novela de fantasía épica, perteneciente a la serie Crónica del Asesino de Reyes, escrita por Patrick Rothfuss.',
  },
  {
    name: 'Fallout 4',
    category: 'Videogames',
    price: 19.99,
    productImage: 'https://image.api.playstation.com/vulcan/ap/rnd/202009/2500/4GZyUQ1bHTjICP6GCRG7f65n.png',
    // eslint-disable-next-line max-len
    description: 'Bethesda Game Studios, el galardonado creador de Fallout 3 y Skyrim, te presenta el mundo de Fallout 4, ganador de más de 50 premios al Juego del año y los más altos honores en los premios D.I.C.E. 2016. El título, el más ambicioso hasta la fecha, significa una nueva generación de juegos de mundo abierto. Eres el único sobreviviente del Refugio 111 en un mundo destruido por la guerra nuclear. Solo tú puedes reconstruirlo y decidir su futuro. Bienvenido a casa.',
  },
  {
    name: 'Munchkin Deluxe',
    category: 'Boardgames',
    price: 15.25,
    productImage: 'https://images-na.ssl-images-amazon.com/images/I/71SNBYYnaYL._AC_SX466_.jpg',
    // eslint-disable-next-line max-len
    description: 'What makes this edition "deluxe"? It\'s got a big gameboard to keep your cards in place, and six colour pawns that you move on the gameboard as you level up! Plus a card to go with each pawn, to make it easy to remember who is what colour and whose sex has changed!',
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
