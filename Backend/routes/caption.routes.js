const express = require('express');
const router = express.Router();
const {body } = require('express-validator');
const captionController = require('../controllers/caption.controller');

console.log("Caption Controller: ", captionController);
console.log("registerCaption Function: ", captionController.registerCaption);

router.post('/register',[
    body('email').isEmail().withMessage('Invalid email '),
    body('firstname').isLength({min: 3}).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({min: 5}).withMessage('Password must be at least 5 characters long'),
    body('vehicle.color').isLength({min: 3}).withMessage('Color must be at least 3 characters long'),
    body('vehicle.plate').isLength({min: 3}).withMessage('Plate must be at least 3 characters long'),
    body('vehicle.capacity').isNumeric().withMessage('Capacity must be a number'),
    body('vehicle.vehicleType').isIn(['car', 'bike', 'auto']).withMessage('Invalid vehicle type') 
],
captionController.registerCaption
);



module.exports = router;