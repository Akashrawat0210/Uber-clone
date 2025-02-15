const { validationResult } = require('express-validator');
const captionModel = require('../models/caption.model');
const captionService = require('../services/caption.service');

module.exports.registerCaption = async (req, res, next) => {
    

    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    const { firstname, lastname , email, password, vehicle } = req.body;

    try {
        // Check if the caption (driver) already exists
        const captionAlreadyExists = await captionModel.findOne({ email });
        if (captionAlreadyExists) {
            return res.status(400).json({ error: "Caption already exists" });
        }

        // Hash the password
        const hashedPassword = await captionModel.hashPassword(password);

        const caption = await captionService.createCaption({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        });

        // Generate authentication token
        const token = caption.generateAuthToken();


        return res.status(201).json({ token, caption });

    } catch (error) {
        console.error("Error in registerCaption:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
