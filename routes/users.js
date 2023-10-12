const express = require("express");
const router = express.Router();
const usersController = require('../controllers/usersController');
const passport = require("passport");

router.get('/signIn', usersController.signIn);
router.get('/signUp', usersController.signUp);
router.get('/signOut', usersController.signOut);
router.post('/create', usersController.create);

router.post('/create-session', passport.authenticate(
    'local',
    { failureRedirect: '/users/signIn' }
), usersController.createSession);


module.exports = router;
