var express = require('express');
var router = express.Router();
const Users = require('../Models/Users');
const axios = require('axios');

/**
 * Create a user account and then log into it
 * @name POST/api/users
 * @returns {Users} a Users object representing the new user
 * @throws {401} - if user is already logged into an account
 * @throws {403} - if the username is already taken
*/
router.post('/create', async (req, res) => {
  if (req.session.name){
      res.status(401).json("please log out first").end();
      return;
  }
  if (req.body.password.length < 4){
      res.status(403).json("The password must be 4 characters or longer.")
  }
  // let t = await Users.userExists(req.body.username.toString());
  if (await Users.userExists(req.body.username.toString())){
      res.status(403).json("this username is already taken").end();
      return;
  }
  await Users.addUser(req.body.username.toString(), req.body.password.toString());
  req.session.name = req.body.username.toString();
  res.status(200).json(req.body.username.toString()).end();
});


/**
 * Sign into a user account
 * @name POST/api/users/login
 * @returns {Users} a Users object representing the logged in user
 * @throws {401} - if user is already logged into an account
 * @throws {404} - if the user account doesnt exist
 * @throws {401} - Wrong password
 * @throws {403} - if the user is already logged into another device
*/
router.post('/login', async (req, res) => {
    console.log("Session name on LOGIN: ", req.session.name);
  if (req.session.name){
      console.log("already logged in");
      res.status(403).json("please log out first").end();
      return;
  }
  let username = req.body.username.toString();
  let password = req.body.password.toString();
  if (!(await Users.userExists(username))){
      res.status(404).json("This account does not exist").end();
      return;
  }
  let user = await Users.findUser(username);
  if (!Users.comparePass(password, user.password)){
      console.log("incorrect Password");
      res.status(403).json("Incorrect Password").end();
      return;
  }
  req.session.name = user.username;
  res.status(200).json(user).end();
});


router.put('/location', async (req, res) => {
    // console.log(req.body);
    await Users.updatePosition(req.body.username.toString(), req.body.latitude, req.body.longitude)
    res.status(200).json("position updated").end();
});

router.get('/getLocation/:username', async (req, res) => {
    let location = await Users.getPosition(req.params.username)
    res.status(200).json(location).end();
});

router.get('/getAllLocation', async (req, res) => {
    let all = await Users.getAllLocations();
    res.status(200).json(all).end();
})

router.put('/locationUpdate', async (req, res) => {
    // console.log(req.body);
    await Users.updatePosition(req.session.name, req.body.latitude, req.body.longitude)
    res.status(200).json(req.session.name).end();
});


/**
 * Logout
 * Log out of a session
 * @name POST/api/users/logout
 * @param user {String} - the user name
 * @throws {401} - if user is already logged into an account
 * @throws {403} - if the username is from MIT
*/
router.put('/logout', async (req, res) => {
    let oldName = req.session.name;
    await Users.deactivateLocation(oldName);
    req.session.name = null;
    console.log("Name within api call logout: ", req.session.name);
    res.status(201).json(oldName).end();
});


router.get('/getName', (req, res) => {
    // console.log(req.session.name);
    res.status(201).json(req.session.name).end();
});

router.get('/isSigned', (req, res)=> {
    if (!req.session.name) {
        res.status(401).json("You are not signed in").end();
        return;
    }
    res.status(200).json(req.session.name).end();
});


module.exports = router;
