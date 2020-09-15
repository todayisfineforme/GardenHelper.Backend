const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require('body-parser');
const UserController = require('./controllers/usercontroller');
const GardenController = require('./controllers/gardencontroller');

const cors = require('cors');


const PORT = process.env.PORT || 3009
const app = express();

app.use(bodyparser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

connectMongoose();

if (process.env.NODE_ENV != 'production') {
  app.use(cors({
    origin: '*'
  }));
}


const userController = new UserController(app);
userController.createRoutes();

const gardencontroller = new GardenController(app);
gardencontroller.createRoutes();


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

async function connectMongoose() {
  try {
    console.log(`MONGOOSE IS: ${process.env.MONGODB_URL}`);

    await mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/garden-helperdb", {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
  } catch (error) {
    console.error("still can't connect to mongoose");

  }
}




