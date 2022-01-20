const mongoose = require('mongoose');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground');
const Review = require('../models/review');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});      //Deletes existing camps
  await Review.deleteMany({});          //Deletes existing reviews      
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '61e85b64b025b05bcde9968e',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas omnis libero iusto ratione nemo autem nisi, consectetur neque alias cum animi esse architecto quasi, minus exercitationem, aspernatur maxime blanditiis velit?',
      price,
      geometry: {
        type: 'Point',
        coordinates:
          [cities[random1000].longitude,
          cities[random1000].latitude,
          ]
      },
      images: [
        {
          url: 'https://res.cloudinary.com/ddokrqzy1/image/upload/v1642536823/YelpCamp/eaddhb3johekadeckaze.jpg',
          filename: 'YelpCamp/p5tm777g7wga8xtcjfjx'
        },
        {
          url: 'https://res.cloudinary.com/ddokrqzy1/image/upload/v1642459540/YelpCamp/nokxjqfb7j2ohco67sk9.jpg',
          filename: 'YelpCamp/nokxjqfb7j2ohco67sk9'
        },
        {
          url: 'https://res.cloudinary.com/ddokrqzy1/image/upload/v1642459542/YelpCamp/fwq9azbomjtzvsjz9kzd.jpg',
          filename: 'YelpCamp/fwq9azbomjtzvsjz9kzd'
        }
      ]
    })
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
})