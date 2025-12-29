import express from "express";
const router = express.Router();
import userValidate from "../utils/userValidate.js";
import Student from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import checkLogin from "../middleware/checklogin.js";
import {
  generateAccessToken,
  refreshAccessToken,
  verifyRefreshToken,
} from "../utils/token.js";
import { emailSendCode } from "../models/email_service.js";
dotenv.config();

export const signin = async (req, res) => {
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
  // const link =`http://localhost:5001/verify-email/${token}`
  // const htmlTemplate=`<h2>Email verification link</h2>
  //                     <p>click this email to verify your mail expires in 10 min</p>
  //                     <a href=${link}>${link}</a>`
  // await emailSendCode(email , "Email verification link",htmlTemplate)
  // return res.send("verification link sent to your registered email id");
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

export const getNewAccessToken = async (req, res) => {
  const ref_token = req.cookies?.reftoken;
  // console.log("ref token ", ref_token);
  if (!ref_token) {
    res.send("no token found missing refresh token");
  }

  const payload = verifyRefreshToken(ref_token, process.env.REFRESH_KEY);
  // console.log("payload", payload);
  const user = await Student.findById(payload.userId);
  console.log(user);
  if (!user) {
    res.send("user not found");
  }
  // const newAccessToken = generateAccessToken(payload.userId, process.env.SECRET_KEY);
  const newAccessToken = generateAccessToken(
  {
    emailId: user.email,
    user_id: user._id,
  },
  process.env.SECRET_KEY
);
  // const refreshToken = generateAccessToken(user, process.env.REFRESH_KEY);
  console.log("new token", newAccessToken);
  res.cookie("token", newAccessToken);
  return res.send("new refresh token generated", newAccessToken);

  // res.send("error in new access token");
};
