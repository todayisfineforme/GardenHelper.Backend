const mongoose = require('mongoose');

const Schema = mongoose.Sechema;

const ProfileSchema = new Schema({
    userid: mongoose.ObjectId,
    name: String,
    password: String,
    profPic: String
})

const Profile = mongoose.model("Profile", ProfileSchema);
module.exports = Profile;