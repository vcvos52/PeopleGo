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
  if (req.session.name){
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
      res.status(403).json("Incorrect Password").end();
      return;
  }
  req.session.name = user.username;
  res.status(200).json(user).end();
});


router.put('/location', async (req, res) => {
    console.log(req.body);
    req.session.name = req.body.username;
    await Users.updatePosition(req.body.username.toString(), req.body.latitude, req.body.longitude)
    res.status(200).json("position updated").end();
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
  req.session.name = null;
  res.status(201).json("You logged out. Congrats.").end();
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
    res.status(200).json("You are signed in").end();
});


module.exports = router;
