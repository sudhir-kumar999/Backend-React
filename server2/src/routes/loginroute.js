import express from "express";
const router = express.Router();
import userValidate from "../utils/userValidate.js";
import Student from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import checkLogin from "../middleware/checklogin.js";
import { logoutUser, registerUser } from "../controller/userController.js";
import { loginUser } from "../controller/userController.js";
dotenv.config();

router.get("/log", (req, res) => {
  res.send("hello from log");
});

router.post("/sign", registerUser);

router.post("/login", loginUser);

router.get("/logout" , logoutUser)

router.get("/profile" , checkLogin , (req , res)=>{
  res.send("welcome to profile page")
})

export default router;
