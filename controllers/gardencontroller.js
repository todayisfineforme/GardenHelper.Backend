const express = require('express');
const Garden = require('../models/garden');
const { findOne } = require('../models/garden');

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
            let length = request.body.lenght;
            let name = request.body.name;

            let gardenid = request.body.gardenid;
            let garden = await Garden.findById(gardenid);

            if (garden) {
                garden.plots.push({
                    name: name,
                    length: length,
                    height: height
                });
                garden.save();
                response.status(200).json({ success: 'plot saved successfuly' });
            } else {
                response.status(500).json({ error: 'plot unable to add' });
            }
        }
        catch (error) {
            response.status(500).json({ error: 'plot unable to add' })
        }
    }

    async addPlant(request, response) {

        try {
            let name = request.body.name;
            let gardenid = request.body.gardenid;
            let plotid = request.body.plotid;
            let garden = await Garden.findById(gardenid);
            if (garden) {
                let plot = garden.plots.find(plot => plot._id == plotid);

                let plant = new Plant();
                plant.name = name;
                plot.plants.push(plant);

                garden.save();
                response.status(200).json({ success: 'plant saved successfuly' });
            } else {
                response.status(500).json({ error: 'unable to save plant, garden not found' });
            }
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