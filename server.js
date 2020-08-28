const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require('body-parser');
const UserController = requrie('./controllers/usercontroller');
const GardenController = require('.controllers/gardencontroller');

const PORT = process.env.PORT || 3000
const app = express();

app.use(bodyparser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

connectMongoose();

const controller = new UserController(app);
controller.createRoutes();

const controller = new GardenController(app);
controller.createRoutes();

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

async function connectMongoose() {
  try {
    console.log(`MONGOOSE IS: ${process.env.MONGODB_URL}`);

    await mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/gardenhelperdb", {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
  } catch (error) {
    console.error("still can't connect to mongoose");

  }
}