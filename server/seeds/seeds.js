const { default: mongoose } = require("mongoose");
const Campground = require("../models/schema");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelper");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const database = mongoose.connection;

database.on("error", console.error.bind(console, "connection error: "));
database.once("open", () => {
  console.log("Database connected.");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random999 = Math.floor(Math.random() * 999);
    const price = Math.floor(Math.random() * 20) + 10.99;
    const roundPrice = price.toFixed(2);
    const camp = new Campground({
      location: `${cities[random999].city}, ${cities[random999].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: "https://source.unsplash.com/collection/9046579",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit amet tortor ut lectus euismod consequat tristique id felis. Nulla eu facilisis velit. Morbi nec lorem pretium massa tincidunt pellentesque.",
      price: roundPrice,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
