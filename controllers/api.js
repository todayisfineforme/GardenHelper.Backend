const axios =  require("axios");
const express = require('express');
const { request, response } = require('express');

class apiController {
    constructor(app) {
        this.app = app;
    }

    async getPlants(request, response) {
        try {
            const BASEURL = "https://trefle.io/api/v1/plants/";
            const APIKEY = "token=4X3cnkrtJQkr43W5E8MqVHBljQjceJ3RwXG2sDcVelg";
            let query = request.params.search;
            const result = await axios.get(BASEURL + "search?" + APIKEY + "&q=" + query);

            response.status(200).json(result.data.data);
        }
        catch (error) {
            response.status(500).json({ error: 'unable to get all garden' });
        }
    }

    createRoutes() {
        this.app.get('/api/search/:search', (request, response) => this.getPlants(request, response));
    }
}

module.exports = apiController;