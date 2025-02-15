const captionModel = require("../models/caption.model");

module.exports.createCaption = async ({
  firstname,
  lastname,
  email,
  password,
  color,
  plate,
  capacity,
  vehicleType,
}) => {
  if (!firstname || !email || !password || !color || !plate || !capacity || !vehicleType) {
    throw new Error("All fields are required");
  }

  const caption = new captionModel({ 
    fullname: { firstname, lastname },
    email,
    password,
    vehicle: {
      color,
      plate,
      capacity,
      vehicleType,
    },
  });

  return await caption.save(); 
};
