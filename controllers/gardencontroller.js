const express = require('express');
const Garden = require('../models/garden');

class GardenController {
    constructor(app) {
        this.app = app;
    }

    async addGarden(request, response) {
        try {
            let name = request.body.name;
            let userid = request.body.userid;

            let garden = new Garden();
            garden.name = name;
            garden.userid = userid;

            await garden.save();

            response.status(200).json({ success: 'Garden saved successful' });
        }
        catch (error) {
            response.status(500).json({ error: 'unable to save garden name' });
        }

    }

    async addPlot(request, response) {
        try {
            let height = request.body.height;
            let length = request.body.length;

            await this.save(height, length);
            response.status(200).json({ success: 'plot saved successful' });
        }
        catch (error) {
            response.status(500).json({ error: 'unable to add plot' });
        }
    }

    async addPlant(request, response) {
        try {
            let name = request.body.name;

            await this.save(name);
            response.status(200).json({ success: 'plant name saved successful' });
        }
        catch (error) {
            response.status(500).json({ error: 'unable to save plant name' });
        }

    }

    createRoutes() {
        this.app.post('/api/garden/add', (request, response) => this.addGarden(request, response));
        this.app.post('/api/plot/add', (request, response) => this.addPlot(request, response));
        this.app.post('/api/plant/add', (request, response) => this.addPlant(request, response));
    }
}

module.exports = GardenController;