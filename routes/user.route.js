const express = require("express");
const userModel = require("../models/user.model");
const userRouter = express.Router();
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
var jwt = require('jsonwebtoken');

userRouter.post("/signUp", async (req, res) => {
  try {
    let userData = req.body;
    let existingUser = await userModel.findOne({ email: userData.email });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "User already exists. Please try another email." });
    }
    var hashPassword = bcrypt.hashSync(userData.password, salt);

    const user = new userModel({
      ...userData,
      password: hashPassword,
    });
    await user.save();

    res.status(201).json({ msg: "User is created", user });
  } catch (error) {
    res.status(500).json({ msg: "Error in creating user", error });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      res.status(404).json({ msg: "Password is wrong" });
    }else{
        var token = jwt.sign({ userId : user._id  , role: user.role}, process.env.SECRETKEY);
        res.status(200).json({msg: "Logged In successfully" ,token})
    }
    
  } catch (error) {
    res.status(500).json({msg: "Error in Login" ,  error})
  }
});

module.exports = userRouter;
