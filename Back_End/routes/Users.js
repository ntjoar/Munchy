const express = require("express");
const router = express.Router();
const bycript = require("bcrypt");
const jwt = require("jsonwebtoken");
var cors = require("cors");
const {
  registerValidation,
  loginValidation,
} = require("../Model/UserValidation");

const authorize = require("../middleware/Authorize");

router.use(cors());

const User = require("../model/User");

router.post("/register", async (req, res) => {
  //Validating the data based on the schema in the validationForm
  const errors = registerValidation(req.body);
  if (errors.error) {
    return res.status(400).send(errors.error.details[0].message);
  }

  //verify that the email is unique
  const userExist = await User.findOne({ email: req.body.email });
  if (userExist) {
    return res.status(400).send("Invalid Email");
  }

  //Hash the password
  const salt = await bycript.genSalt(10);
  const hashedPassword = await bycript.hash(req.body.password, salt);

  //Creating the User object
  const newuser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
  });

  //save the User object in the database
  const savedUser = await newuser.save();

  const payload = {
    id: savedUser._id,
    email: savedUser.email,
    firstName: savedUser.firstName,
    lastName: savedUser.lastName,
  };
  const token = jwt.sign(payload, process.env.TOKEN_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  try {
    res.set("Access-Control-Allow-Origin", "http://localhost:3000");
    res.set("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Allow-Credentials", "true");
    res
      .status(200)
      // .cookie('token',token, options)
      .json({
        payload: payload,
        token: token,
      });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

router.get("/user", authorize, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) throw Error("User does not exist");
    const payload = {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    res.json(payload);
    // console.log(res.headersSent)
    // console.log(res.headers)
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

router.post("/login", async (req, res) => {
  // Validating the data based on the schema in the validationForm
  const errors = loginValidation(req.body);
  if (errors.error) {
    return res.status(400).send(errors.error.details[0].message);
  }

  //Check if the email exist in the database
  const loggedUser = await User.findOne({ email: req.body.email });
  if (!loggedUser) {
    return res.status(400).send("Email or password is incorrect");
  }

  //If the email exist then Check if its password matches the one provided in the form
  const passValidate = await bycript.compare(
    req.body.password,
    loggedUser.password
  );
  if (!passValidate) {
    return res.status(400).send("Email or password is incorrect");
  }

  // req.session.userId = loggedUser._id;
  const payload = {
    id: loggedUser._id,
    email: loggedUser.email,
    firstName: loggedUser.firstName,
    lastName: loggedUser.lastName,
  };

  const token = jwt.sign(payload, process.env.TOKEN_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  try {
    res.set("Access-Control-Allow-Origin", "http://localhost:3000");
    res.set("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res
      .set("Access-Control-Allow-Credentials", "true")

      .status(200)
      .json({
        payload: payload,
        token: token,
      });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

module.exports = router;
