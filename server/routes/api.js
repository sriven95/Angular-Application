var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');

var BookingController = require('../controllers/bookingApi');
var UserController = require('../controllers/userApi');

router.post('/getUser', UserController.getUserDetails);

router.get('/getBookingDetails/:email', BookingController.getBookingDetails);
router.get('/getAdminBookingDetails', BookingController.getAdminBookingDetails);

router.get('/getUserById/:email',UserController.getUserDetailsById);

router.get('/getBookingById/:id',BookingController.getBookingDetailsById);

router.post('/postNewUser', UserController.postNewUserDetails);

router.post('/postNewBooking', BookingController.postNewBookingDetails);

router.put('/updateUser', UserController.updateUserDetails);

router.put('/updateBooking/:id', BookingController.updateBookingDetails);
router.put('/approveBooking/:id', BookingController.approveBookingDetails);

router.delete('/deleteBooking/:id', BookingController.deleteBooking);
router.post('/file',UserController.upload);
router.post('/file1',UserController.upload1);



module.exports = router;
