var express = require('express');
var router = express.Router();
const Users = require('../Models/Users');
const Requests = require('../Models/Requests');
const axios = require('axios');


/**
 * Make host request
 * @name POST/api/requests/host
 * @param {location: position.coords, radius: {int}, seeker: {Boolean}}
 */
router.post('/host', async (req, res) => {
    let location = req.body.location;
    let latLong = {latitude: location.latitude, longitude: location.longitude};
    let radius = req.body.radius;
    let seeker = req.body.seeker;
    let seek;
    if (seeker){seek = 1;}
    else {seek = 0;}
    await Requests.makeHostRequest(username, latLong, radius, seek);
    res.status(201).json("Success!").end();
});


/**
 * Make join request
 * @name POST/api/requests/seeker
 * @param {location: position.coords, hostName: {String}, seeker: {Boolean}}
 */
router.post('/join', async (req, res) => {
    let location = req.body.location;
    let latLong = {latitude: location.latitude, longitude: location.longitude};
    let seeker = req.body.seeker;
    let hostName = req.body.hostName;
    if (!(await Requests.checkInMatch(latLong, hostName))){
        res.status(401).json("You need to be within the game radius to join").end();
        return;
    }
    if (seeker){seek = 1;}
    else {seek = 0;}
    await Requests.makeJoinRequest(username, latLong, hostName, seek);
    res.status(201).json("Success!").end();
});

module.exports = router;
