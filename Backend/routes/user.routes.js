const express = require('express');
const router = express.Router();
const {body , check} = require('express-validator');
const userController = require('../controllers/user.controller')

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

module.exports=router;