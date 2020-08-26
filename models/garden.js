const mongoose = require('mongoose');

const Schema = mongoose.Sechema;

const GardenSchema = new Schema({
    userid: mongoose.ObjectId,
    name: String,
    plots: [{
        height: Number,
        length: Number,
        watering: [{
            date: Date,
            waterQuantity: Number
        }],
        fertilizer:[{
            date: Date,
            name:String 
        }],
        plants: [{
            name: String
        }]
    }]
})

const Garden = mongoose.model("Garden", GardenSchema);
export default GardenSchema;