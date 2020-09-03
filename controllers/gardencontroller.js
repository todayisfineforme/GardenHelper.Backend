const express = require('express');
const Garden = require('../models/garden');
const { findOne } = require('../models/garden');
const { request, response } = require('express');

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

                let plant = {
                    name: name,
                };
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

    async addwater(request, response) {

        try {
            let waterQuantity = request.body.waterQuantity;
            let date = new Date();

            let garden = await Garden.findById(gardenid);
            if (garden) {
                let plot = garden.plots.find(plot => plot._id == plotid);

                let watering = {
                    waterQuantity: waterQuantity,
                    date: date
                }

                plot.watering.push(watering);

                garden.save();
                response.status(200).json({ success: 'watering saved successfuly' });
            } else {
                response.status(500).json({ error: 'unable to save watering, garden not found' });
            }


        }
        catch (error) {
            response.status(500).json({ error: 'unable to add watering details' });
        }
    }

    async addfertilizer(request, response) {
        let name = request.body.name;
        let date = new Date();

        let garden = await Garden.findById(gardenid);
        if (garden) {
            let plot = garden.plots.find(plot => plot._id == plotid);

            let fertilizer = {
                name: name,
                date: date
            }
            plot.fertilizer.push(fertilizer)
            garden.save();
            response.status(200).json({ success: 'fertilizer saved successfuly' });
        } else {
            response.status(500).json({ error: 'unable to save fertilizer, garden not found' });
        }
    }
    catch(error) {
        response.status(500).json({error: 'unable to add fertilizer details' });
    }


    createRoutes() {
        this.app.post('/api/garden/add', (request, response) => this.addGarden(request, response));
        this.app.post('/api/plot/add', (request, response) => this.addPlot(request, response));
        this.app.post('/api/plant/add', (request, response) => this.addPlant(request, response));
        this.app.post('/api/watering/add', (request, response) => this.addwater(request, response));
        this.app.post('/api/fertilizer/add', (request, response) => this.addfertilizer(request, response));
    }
}

module.exports = GardenController;