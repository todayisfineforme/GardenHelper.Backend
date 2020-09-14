const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GardenSchema = new Schema({
    userid: mongoose.ObjectId,
    name: String,
    plots: [{
        name: String,
        width : Number,
        length: Number,
        units: String,
        quantity: Number,
        watering: [{
            date: Date,
            quantity: Number,
            note: String
        }],
        fertilizer: [{
            date: Date,
            name: String,
            note: String
        }],
        plant: {
            plantName: String,
            scientificName:String,
            imageUrl:String,
            quantity: Number
        }
    }]
})

const Garden = mongoose.model("Garden", GardenSchema);
module.exports = Garden;