const express = require("express");
const router = express.Router();
const userController = require('../controllers/usersController');
const passport = require('passport');
// const homeController = require('../controllers/homeController');

router.get('/', passport.checkAuthentication, userController.home);
router.use('/admin', require('./admin'));
router.use('/users', require('./users'));
router.use('/review', require('./review'));
module.exports = router;
