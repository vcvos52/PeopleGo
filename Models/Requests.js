const database = require('../database');
const geolib = require('geolib');
const shortid = require('shortid');
const Users = require('./Users');

class Requests {


    /**
     * adds a seeker request into database and location into location table
     * @param username {String}
     * @param location {latitude: <float>, longitude: <float>}
     * @param radius <int>
     */
    static async makeSeekRequest(username, location, radius){
        // Problems: need to check match radius against request radius.
        // Where is the center point of the map?

        let currentMatches = await database.query(`select * from Matches order by matchID`);
        let currentMatchID = "initial value";
        let matchPossible = true;
        for (let match of currentMatches){
            // Sees if the match we are checking has changed
            if (currentMatchID !== match.matchID){
                if (!(currentMatchID === "initial value")){
                    await database.query(`insert into Matches (matchID, username, seeker, found) values (${id}, ${username}, ${1}, ${0});`);
                    return;
                }
                currentMatchID = match.matchID;
                matchPossible = true;
            } else if (!matchPossible){
                continue;
            }
            let matchUsername = match.username;
            let matchlocation = await database.query(`select * from locations where username=${matchUsername};`);
            let matchPosition = {latitude: matchlocation.latitude, longitude: matchlocation.longitude}
            let distanceMatch = geolib.getDistance(matchPosition, location);
            if (distanceMatch > radius){
                matchPossible = false;
            }
        }

        // Checks other requests
        let currentHideRequests = await database.query(`select * from Hider_Requests;`);
        for (let hideReq of currentHideRequests){
            let reqRadius = hideReq.radius;
            let reqUsername = hideReq.username;
            let reqlocation = await database.query(`select * from locations where username=${reqUsername};`);
            let reqPosition = {latitude: reqlocation.latitude, longitude: reqlocation.longitude}
            let distance = geolib.getDistance(reqPosition, location);
            let minRadius = Math.min(reqRadius, radius);
            if (distance - minRadius <= 0){
                let id = shortid.generate();
                await database.query(`insert into Matches (matchID, username, seeker, found) values (${id}, ${username}, ${1}, ${0});`);
                await database.query(`insert into Matches (matchID, username, seeker, found) values (${id}, ${reqUsername}, ${0}, ${0});`);
                return;
            }
        }

        await database.query(`insert into locations (username, latitude, longitude) values (${username}, ${location[0]}, ${location[1]});`);
        await database.query(`insert into Seeker_Requests (username, radius) values (${username}, ${radius});`);
        return;
    }


    /**
     * adds a hider request into database and location into location table
     */
    static async makeHideRequest(username, location, radius){
        // TODO match checking
        await database.query(`insert into locations (username, latitude, longitude) values (${username}, ${location[0]}, ${location[1]});`);
        await database.query(`insert into Hider_Requests (username, radius) values (${username}, ${radius});`);
        return;
    }
}