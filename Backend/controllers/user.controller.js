const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const blackListTokenModel = require("../models/blacklistToken.model");

// module.exports.registerUser = async (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   try {
//     const { fullname, email, password } = req.body;

//     if (
//       !fullname ||
//       typeof fullname !== "object" ||
//       !fullname.firstname ||
//       !fullname.lastname
//     ) {
//       return res
//         .status(400)
//         .json({ error: "Fullname must contain firstname and lastname" });
//     }

//     // Hash password
//     const hashedPassword = await userModel.hashPassword(password);

//     // Create user
//     const user = await userService.createUser({
//       firstname: fullname.firstname,
//       lastname: fullname.lastname,
//       email,
//       password: hashedPassword,
//     });

//     // Generate auth token
//     const token = user.generateAuthToken();
//     res.status(201).json({ token, user });
//   } catch (error) {
//     next(error);
//   }
// };

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { firstname, lastname, email, password } = req.body;

    // Validate firstname and lastname
    if (!firstname || !lastname) {
      return res
        .status(400)
        .json({ error: "First name and last name are required." });
    }

    if (firstname.length < 3) {
      return res
        .status(400)
        .json({ error: "First name must be at least 3 characters long." });
    }

    if (lastname.length < 3) {
      return res
        .status(400)
        .json({ error: "Last name must be at least 3 characters long." });
    }

    // Hash password
    const hashedPassword = await userModel.hashPassword(password);

    // Create user
    const user = await userService.createUser({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    // Generate auth token
    const token = user.generateAuthToken();
    res.status(201).json({ token, user });
  } catch (error) {
    next(error);
  }
};


module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const userAlreadyExists = await userModel.findOne({ email });
  if (!userAlreadyExists) {
    return res.status(400).json({ error: "User already exixt" });
  }

  try {
  
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ error: "Invalid Email or Password" });
    }

   
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid Email or Password" });
    }

    const token = user.generateAuthToken();

    res.cookie("token", token);
    res.status(200).json({ token, user });
  } catch (error) {
    next(error);
  }
};

module.exports.getUserProfile = async (req, res, next) => {
  res.status(200).json(req.user);
};

module.exports.logoutUser = async (req, res, next) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
 
  await blackListTokenModel.create({ token });
  res.status(200).json({ message: "Logged out successfully" });
};
