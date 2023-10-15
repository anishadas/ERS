const express = require("express");
const router = express.Router();
const adminController = require('../controllers/adminController');
const passport = require('passport')

router.get('/', passport.checkAuthentication, adminController.admin);
router.get('/allReviews', passport.checkAuthentication, adminController.reviews);
router.post('/setReviewer', passport.checkAuthentication,adminController.setReviewer);
router.get('/employees', passport.checkAuthentication, adminController.employees);
router.get('/delete/:id', passport.checkAuthentication, adminController.delete);
router.get('/edit/:id', passport.checkAuthentication, adminController.edit);
router.post('/update', passport.checkAuthentication, adminController.update);
router.post('/newAdmin', passport.checkAuthentication, adminController.newAdmin);
module.exports = router;