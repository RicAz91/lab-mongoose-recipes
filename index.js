const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data'); // Import of the data from './data.json'

const MONGODB_URI = 'mongodb://localhost/recipeApp';

// Connection to the database "recipeApp"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    return self.connection.dropDatabase();
  })
  .then(() => {
    console.log(`Connected to the database."`);
    return Recipe.create({
      title: 'Frango à lá Ricardo',
      level: 'Easy Peasy',
      ingredients: ['chiken meat', 'rice', 'shoyo', 'garlic', 'onion', 'cheese', 'salt', 'peper'],
      cuisine: 'my own',
      dishType: 'Dish',
      duration: 20,
      creator: 'Ricardo'
    });
    // Run your code here, after you have insured that the connection was made
  })
  .then(() => {
    return Recipe.insertMany(data);
  })

  .then(() => {
    return Recipe.find({}, 'title');
  })

  .then(rec => {
    console.log(rec);
  })
  .then(() => {
    return Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 });
  })
  .then(() => {
    console.log('time updated');
  })
  .then(() => {
    Recipe.deleteOne({ title: 'Carrot Cake' });
  })
  .then(() => {
    console.log('Deleted');
  })
  .then(() => {
    return mongoose.disconnect();
  })
  .then(() => {
    console.log('mongoose disconected');
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
