var express = require('express');
var router = express.Router();
const Users = require('../Models/Users');
const Requests = require('../Models/Requests');
const axios = require('axios');


/**
 * Make host request
 * @name POST/api/requests/host
 * @param {radius: {int}, seeker: {Boolean}}
 */
router.post('/host', async (req, res) => {
    let radius = parseFloat(req.body.radius);
    let seeker = req.body.seeker;
    let username = req.session.name;
    console.log(req.session.name);
    let seek;
    if (seeker === "1"){seek = 1;}
    else {seek = 0;}
    await Requests.makeHostRequest(username, radius, seek);
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
    let username = req.session.name;
    if (!(await Requests.checkInMatch(latLong, hostName))){
        res.status(401).json("You need to be within the game radius to join").end();
        return;
    }
    if (seeker){seek = 1;}
    else {seek = 0;}
    await Requests.makeJoinRequest(username, latLong, hostName, seek);
    res.status(201).json("Success!").end();
});


router.delete('/match/:username', async (req, res) => {
    let username = req.params.username;
    await Requests.deleteMatch(username);
    res.status(201).json("success").end();
});

router.delete('/leave/:username', async (req, res) => {
    let username = req.params.username;
    await Requests.leaveMatch(username);
    res.status(201).json("success").end();
});



router.get('/getAllMatches', async (req, res) => {
    let all = await Requests.getAllMatches();
    res.status(200).json(all).end();
})

module.exports = router;
