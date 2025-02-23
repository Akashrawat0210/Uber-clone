const { validationResult } = require("express-validator");
const captionModel = require("../models/caption.model");
const captionService = require("../services/caption.service");
const BlacklistToken = require("../models/blacklistToken.model");


module.exports.registerCaption = async (req, res, next) => {
  try {
    console.log("Received vehicleType:", req.body.vehicleType);
    // Convert vehicleType to lowercase before validation
    if (req.body.vehicleType) {
      req.body.vehicleType = req.body.vehicleType.toLowerCase();
    }

    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const { firstname, lastname, email, password, vehicleColor, vehiclePlate, vehicleCapacity, vehicleType } = req.body;

    // Check if vehicleType is valid manually
    const allowedVehicleTypes = ["car", "bike", "auto"];
    if (!allowedVehicleTypes.includes(vehicleType)) {
      return res.status(400).json({ error: `Invalid vehicle type: ${vehicleType}. Allowed values are ${allowedVehicleTypes.join(", ")}` });
    }

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
      vehicleColor,
      vehiclePlate,
      vehicleCapacity,
       vehicleType, // Now it's correctly formatted
    });

    // Generate authentication token
    const token = caption.generateAuthToken();

    return res.status(201).json({ token, caption });
  } catch (error) {
    console.error("Error in registerCaption:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports.loginCaption = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

    const { email, password } = req.body;

    const caption = await captionModel.findOne({ email }).select("+password");

    if (!caption) {
      return res.status(400).json({ error: "invalid email or password" });
    }

    const isMatch = await caption.comparePassword(password);
    if(!isMatch){
        return res.status(400).json({error: 'Invalid email or password'});
    }

    const token = caption.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({token, caption});
};


module.exports.getCaptionProfile = async (req, res, next) => {
    return res.status(200).json({ caption: req.caption });
 };


 module.exports.logoutCaption = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    const blacklistedToken = new BlacklistToken({ token });
    await blacklistedToken.save();
    res.clearCookie('token');
    res.status(200).json({ message: "Logout successful" });
  }

