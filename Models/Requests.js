const database = require('../database');
const geolib = require('geolib');
const shortid = require('shortid');
const Users = require('./Users');

class Requests {


    /**
     * a single user initializes a match with a radius r centered around his current location
     * @param {string} username the username of the person making the request to be host
     * @param {int} radius the radius of the playing map
     * @param {0 or 1} seeker whether he is seeker or not
     */
    static async makeHostRequest(username, radius, seeker){
        let id = shortid.generate();
        if (seeker){let s = 1;}
        else {let s = 0;}
        await database.query(`insert into Matches (matchID, username, seeker, host, active, found, radius) values ('${id}', '${username}', ${seeker}, ${1}, ${0}, ${0}, ${radius});`);

    }

    
    /**
     * a single user initializes a match with a radius r centered around his current location
     * @param {string} username the username of the person making the request to be host
     * @param {String} hostName the radius of the playing map
     * @param {Boolean} seeker whether he is seeker or not
     */
    static async makeJoinRequest(username, hostName, seeker){
        let match = await database.query(`select * from Matches where username='${hostName}';`);
        let id = match.matchID;
        await database.query(`insert into Matches (matchID, username, seeker, host, active, found, radius) values ('${id}', '${username}', ${seeker}, ${0}, ${0}, ${0}, ${match.radius});`);
        return await database.query(`select * from Matches where matchID="${id}";`);
    }

    /**
     * returns true if withing radius, false otherwise
     * @param {dict of coords} latlong 
     * @param {String} hostName 
     */
    static async checkInMatch(latlong, hostName){
        let matchlocation = await database.query(`select * from locations where username='${hostName}';`);
        let matchPosition = {latitude: matchlocation.latitude, longitude: matchlocation.longitude}
        let distanceMatch = geolib.getDistance(matchPosition, latlong);
        if (distanceMatch > radius){
            return false;
        } else {return true;}
    }

    /**
     * Deletes all of the instances of a matches where this guy is hosting it
     * @param {string} username 
     */
    static async deleteMatch(username){
        let matches = await database.query(`select * from Matches where username='${username}' and host=${1};`);
        // console.log(matches, username);
        if (matches.length === 0){
            return;
        }
        for (var i = 0; i < matches.length; i++){
            let match = matches[i];
            let id = match.matchID;
            await database.query(`delete from Matches where matchID='${id}';`)
        }
    }


    static async leaveMatch(username){
        await database.query(`delete from Matches where username='${username}';`);
    }

    static async getAllMatches(){
        return await database.query(`select * from Matches where host=${1};`);
    }

}

module.exports = Requests;
