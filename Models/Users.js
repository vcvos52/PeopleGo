const database = require('../database');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
var salt = bcrypt.genSaltSync(saltRounds);


/**
 * This class is an abstraction of a single user.
 * This class provides static methods to operate on allUsers
 */
class Users {

    /**
     * LoggedIn keeps track of if there is an active session somehwere
     * freets is a list of all of the freets made by this user
     * @param {String} name : name of the new account
     * @param {String} password : the Users' password
     */
    constructor(name, password){
        this.name = name;
        this.password = password;
        this.loggedIn = false;
    }

    static comparePass(text, hash){
        return bcrypt.compareSync(text, hash);
    }


    /**
     * Adds a new user to the allUsers database
     * @param {Users} user 
     */
    static async addUser(username, password){
        try {
            const hashPassword = bcrypt.hashSync(password, salt);
            const response = await database.query('INSERT INTO users (username, password) VALUES (?, ?);', [username, hashPassword]);
            return response;
          } catch (error) {
            throw error;
          }
    }

    /**
     * updates the location of username in locations table
     * @param {latlong} { {latitude: , longitude: }}
     */
    static async updatePosition(name, lat, long){
        let userloc = await database.query('SELECT * FROM locations WHERE username=?;', [name]);
        if (!Array.isArray(userloc) || !userloc.length){
            await database.query('INSERT INTO locations (username, latitude, longitude) VALUES (?, ?, ?);', [name, lat, long]).then(() => {return})
                .catch(async function(){await database.query('UPDATE locations SET latitude=?, longitude=? WHERE username=?;', [lat, long, name])});
        } else {
            await database.query('UPDATE locations SET latitude=?, longitude=? WHERE username=?;', [lat, long, name]);
        }
    }


    /**
     * Logs the user out.
     * @param {String} username - user name
     */
    static async logOut(username){
        try {
            const logged = 0;
            const sql = `UPDATE users SET loggedIn=${logged} WHERE username='${username}';`;
            const response = await database.query(sql);
            return response;
          } catch (error) {
            throw error;
          }
    }


    static async getPosition(username){
        let location = await database.query(`select * from locations where username='${username}';`);
        return location[0];
    }
    

    static async deactivateLocation(username){
        await database.query(`delete from locations where username='${username}'`);
        // await database.query('UPDATE locations SET latitude=?, longitude=? WHERE username=?;', [lat, long, name]);
    }

    static async getAllLocations(){
        return await database.query('select * from locations;');
    }


    /**
     * Given a string that is a username, finds the associated Users object
     * @param {String} username 
     */
    static async findUser(username){
        try {
            const response = await database.query('SELECT * FROM users WHERE username=?;', [username]);
            return response[0];
          } catch (error) {
            throw error;
          }    
    }

        

    /**
     * Returns all of the user safely
     */
    static async getAll(){
        try {
            const sql = `SELECT * FROM users;`;
            const response = await database.query(sql);
            return response;
          } catch (error) {
            throw error;
          }
    }


     /**
     * Returns all of the user safely
     */
    static async getAllOthers(name){
        try {
            const sql = `SELECT * FROM users WHERE NOT username='${name}';`;
            const response = await database.query(sql);
            return response;
          } catch (error) {
            throw error;
          }
    }


    /**
     * Checks if user exists given its username
     * @param {String} username 
     */
    static async userExists(username){
        try {
            const sql = `SELECT * FROM users WHERE username='${username}';`;
            const response = await database.query(sql);
            if (!Array.isArray(response) || !response.length){
                return false;
            } else {
                return true;
            }
          } catch (error) {
            throw error;
          }
    }


}

module.exports = Users;
