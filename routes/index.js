const express = require("express");
const router = express.Router();
const userController = require('../controllers/usersController');
const passport = require('passport');

router.get('/', passport.checkAuthentication,userController.home);
router.use('/admin', require('./admin'));
router.use('/users', require('./users'));
module.exports = router;
