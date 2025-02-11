const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator'); // ✅ Import correctly

 module.exports.registerUser = async (req, res, next) => {
    // ✅ Fix: Define `errors` correctly
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); // ✅ Use `errors`, not `error`
    }

    try {
        const { fullname, email, password } = req.body;

        // ✅ Fix: Check if fullname is an object and contains firstname/lastname
        if (!fullname || typeof fullname !== 'object' || !fullname.firstname || !fullname.lastname) {
            return res.status(400).json({ error: "Fullname must contain firstname and lastname" });
        }

        // Hash password
        const hashedPassword = await userModel.hashedPassword(password);

        // Create user
        const user = await userService.createUser({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword,
        });

        // Generate auth token
        const token = user.generateAuthToken();
        res.status(201).json({ token, user });
    } catch (error) {
        next(error); // ✅ Pass error to error-handling middleware
    }
};

