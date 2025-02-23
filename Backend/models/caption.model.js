const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const captionSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    required: true,
    minlength: [3, "First name must be at least 3 characters long"],
  },
  lastname: {
    type: String,
    minlength: [3, "Last name must be at least 3 characters long"],
  },

  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, "Email must have at least 5 characters"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
  },

  // avialable for take ride or not
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },

  // details of the vehicle
 vehicleColor: {
   type: String,
   required: true,
    minlength: 3 
  },
   vehiclePlate: {
     type: String,
      required: true,
       minlength: 3 
      },
     vehicleCapacity: 
     { type: Number,
       required: true
       },
    vehicleType: { 
      type: String,
       required: true, 
       enum: ["car", "bike", "auto"],
       lowercase: true 
},

  // location of the user
  location: {
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
  },
});

captionSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

captionSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

captionSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const captionModel = mongoose.model("Caption", captionSchema);

module.exports = captionModel;
