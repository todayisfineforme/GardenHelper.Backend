const express = require('express');
const Profile = require('../models/profile');

class ProfileController {
    constructor(app) {
        this.app = app;
    }

    async createProfile(request, response) {
        try {
            let name = request.body.name;
            let userid = request.body.userid;
            let location = request.body.location;
            let profilePic = request.body.profilePic;

            let profile = new Profile();
            profile.name = name;
            profile.userid = userid;
            profile.location = location;
            profile.profilePic = profilePic;

            await profile.save();

            response.status(200).json({ success: 'Profile saved successful' });
        }
        catch (error) {
            response.status(500).json({ error: 'unable to save profile information' });
        }

    }

    async updateProfile(request, response) {
        try {
            let location = request.body.location;
            let profilePic = request.body.profilePic;

            await this.save(location, profilePic);
            response.status(200).json({ success: 'Profile updated' });
        }
        catch (error) {
            response.status(500).json({ error: 'Unable to update profile' });
        }
    }

    createRoutes() {
        this.app.post('/api/profile/add', (request, response) => this.createProfile(request, response));
        this.app.post('/api/profile/update', (request, response) => this.updateProfile(request, response));
    }
}

module.exports = ProfileController;