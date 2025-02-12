const express = require('express');
const router = express.Router();
const {body , check} = require('express-validator');
const userController = require('../controllers/user.controller')
const authMiddleware = require('../middlewares/auth.middleware');

router.post(
    "/register",
    [
        check("fullname.firstname", "First name must be at least 3 characters long").isLength({ min: 3 }),
        check("fullname.lastname", "Last name must be at least 3 characters long").isLength({ min: 3 }),
        check("email", "Invalid Email").isEmail(),
        check("password", "Password must be at least 6 characters long").isLength({ min: 6 }),
    ],
    userController.registerUser
);

router.get('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long')  
],
    userController.loginUser
)

router.get('/profile', authMiddleware.authUser, userController.getUserProfile) 


router.get('/logout', authMiddleware.authUser, userController.logoutUser)    

module.exports=router;