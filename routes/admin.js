const express = require("express");
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/', adminController.admin);
router.post('/setReviewer',adminController.setReviewer);
router.get('/employees', adminController.employees);
router.get('/delete/:id', adminController.delete);
router.post('/newAdmin', adminController.newAdmin);
module.exports = router;