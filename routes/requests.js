var express = require('express');
var router = express.Router();
const Users = require('../Models/Users');
const Requests = require('../Models/Requests');
const axios = require('axios');


/**
 * Make hider request
 * @name POST/api/requests/hider
 * @param {location: position.coords, radius: {int}}
 */
router.post('/hider', async (req, res) => {
    let location = req.body.location;
    let latLong = {latitude: location.latitude, longitude: location.longitude};
    let radius = req.body.radius;
    await Requests.makeHideRequest(username, latLong, radius);
    res.status(201).json("Success!").end();
});


/**
 * Make seeker request
 * @name POST/api/requests/seeker
 * @param 
 */
router.post('/seeker', async (req, res) => {
    let location = req.body.location;
    let latLong = {latitude: location.latitude, longitude: location.longitude};
    let radius = req.body.radius;
    await Requests.makeSeekRequest(username, latLong, radius);
    res.status(201).json("Success!").end();
});