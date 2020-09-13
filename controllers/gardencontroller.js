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

            response.status(200).json({ success: 'Garden saved successful', gardenid: garden.id });
        }
        catch (error) {
            response.status(500).json({ error: 'unable to save garden name' });
        }

    }

    async addPlot(request, response) {
        try {
            let width = request.body.width;
            let length = request.body.length;
            let sizeunits = request.body.sizeunits;
            let plotName = request.body.plotName;
            let plantName = request.body.plantName;
            let quantity = request.body.quantity;

            let gardenid = request.body.gardenid;
            let garden = await Garden.findById(gardenid);

            if (garden) {
                garden.plots.push({
                    name: plotName,
                    length: length,
                    width: width,
                    units: sizeunits,
                    plant: {
                        name: plantName,
                        quantity: quantity
                    }
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
            let note=request.body.note;
            let waterQuantity = request.body.waterQuantity;
            let date = new Date();

            let garden = await Garden.findById(gardenid);
            if (garden) {
                let plot = garden.plots.find(plot => plot._id == plotid);

                let watering = {
                    waterQuantity: waterQuantity,
                    note:note,
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
        let note=request.body.name;
        let date = new Date();

        let garden = await Garden.findById(gardenid);
        if (garden) {
            let plot = garden.plots.find(plot => plot._id == plotid);

            let fertilizer = {
                name: name,
                date: date,
                note:note
            }
            plot.fertilizer.push(fertilizer)
            garden.save();
            response.status(200).json({ success: 'fertilizer saved successfuly' });
        } else {
            response.status(500).json({ error: 'unable to save fertilizer' });
        }
    }
    catch(error) {
        response.status(500).json({ error: 'unable to add fertilizer details' });
    }
 
    async getGardens(request, response) {
        try {
            let userid = request.params.userid;

            let gardens = await Garden.find({ userid: userid });
            response.status(200).json(gardens);
        }
        catch (error) {
            response.status(500).json({ error: 'unable to get all garden' });
        }

    }

    async getGarden(request, response) {
        try {
            let gardenid = request.params.gardenid;

            let garden = await Garden.findById(gardenid);
            response.status(200).json(garden);

        }
        catch (error) {
            response.status(500).json({ error: 'unable to get plots' });
        }
    }


    createRoutes() {
        this.app.post('/api/garden/add', (request, response) => this.addGarden(request, response));
        this.app.post('/api/plot/add', (request, response) => this.addPlot(request, response));
        this.app.post('/api/plant/add', (request, response) => this.addPlant(request, response));
        this.app.post('/api/watering/add', (request, response) => this.addwater(request, response));
        this.app.post('/api/fertilizer/add', (request, response) => this.addfertilizer(request, response));
        this.app.get('/api/user/gardens', (request, response) => this.getGardens(request, response));
        this.app.get('/api/garden/:gardenid', (request, response) => this.getGarden(request, response));

    }
}

module.exports = GardenController;