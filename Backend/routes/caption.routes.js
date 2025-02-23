const express = require('express');
const router = express.Router();
const {body } = require('express-validator');
const captionController = require('../controllers/caption.controller');
const authMiddleware = require('../middlewares/auth.middleware');


router.post('/register',[
    body('email').isEmail().withMessage('Invalid email '),
    body('firstname').isLength({min: 3}).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({min: 5}).withMessage('Password must be at least 5 characters long'),
    body('vehicleColor').isLength({min: 3}).withMessage('Color must be at least 3 characters long'),
    body('vehiclePlate').isLength({min: 3}).withMessage('Plate must be at least 3 characters long'),
    body('vehicleCapacity').isNumeric().withMessage('Capacity must be a number'),
    body('vehicleType').isIn(['car', 'bike', 'auto']).withMessage('Invalid vehicle type') 
],
captionController.registerCaption
);


router.post('/login',[
    body('email').isEmail().withMessage('Invalid email '),
    body('password').isLength({min: 5}).withMessage('Password must be at least 5 characters long')
], captionController.loginCaption
);

router.get('/profile', authMiddleware.authCaption , captionController.getCaptionProfile);

router.get('/logout', authMiddleware.authCaption , captionController.logoutCaption);



module.exports = router;