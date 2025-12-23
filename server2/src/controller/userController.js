import express from "express";
const router = express.Router();
import userValidate from "../utils/userValidate.js";
import Student from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import checkLogin from "../middleware/checklogin.js";
import { generateAccessToken, refreshAccessToken } from "../utils/token.js";
dotenv.config();

export const registerUser = async (req, res) => {
  const { name, age, email, password } = req.body;
  const isValidate = userValidate(name, age, email, password);
  if (!isValidate) {
    return res.send("enter valid details");
  }

  const isExistUser = await Student.findOne({ email: email });
  if (isExistUser) {
    res.send("user already exist");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new Student({
    name,
    age,
    email,
    password: hashedPassword,
  });
  await user.save();
  return res.send("signin success");
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await Student.findOne({ email: email });
  //   console.log(user);
  //   console.log(user.password)
  if (!user) {
    return res.send("sign in first");
  }

  const isvalidpass = await bcrypt.compare(password, user.password);

  if (!isvalidpass) {
    return res.send("invalid password");
  }
  const payload = {
    emailId: user.email,
    user_id: user._id,
  };

  //   const jwtToken = jwt.sign(payload, process.env.SECRET_KEY, {
  //     expiresIn:"1h"
  //   });

  const secret = process.env.SECRET_KEY;
  const ref_secret = process.env.REFRESH_KEY;
  const jwtToken = generateAccessToken(payload, secret);
  const refreshToken = refreshAccessToken(payload, ref_secret);
  res.cookie("token", jwtToken, {
    httpOnly: true,
  });
  res.cookie("reftoken", refreshToken);
  return res.send("login success");
};

export const logoutUser = async (req, res) => {
  // res.json(req.cookies.token)
  res.clearCookie("token");
  res.json("user logout success");
};
