const captionModel = require("../models/caption.model");


module.exports.createCaption = async ({
  firstname,
  lastname,
  email,
  password,
  vehicleColor, // ✅ Use correct field names
  vehiclePlate, // ✅ Use correct field names
  vehicleCapacity, // ✅ Ensure it's a number
  vehicleType,
}) => {
  if (!firstname || !email || !password || !vehicleColor || !vehiclePlate || !vehicleCapacity || !vehicleType) {
    throw new Error("All fields are required");
  }

  const caption = new captionModel({ 
    firstname,
    lastname,
    email,
    password,
    vehicleColor,  // ✅ Use correct field names
    vehiclePlate,  // ✅ Use correct field names
    vehicleCapacity,  // ✅ Ensure it's a number
    vehicleType,
  });

  return await caption.save();
};
