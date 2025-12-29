import express from "express";
const router = express.Router();
import userValidate from "../utils/userValidate.js";
import Student from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import checkLogin from "../middleware/checklogin.js";
import {
  getNewAccessToken,
  logoutUser,
  registerUser,
  verifyEmail,
} from "../controller/userController.js";
import { loginUser } from "../controller/userController.js";
import { signin } from "../controller/userController copy.js";
dotenv.config();

router.get("/log", (req, res) => {
  res.send("hello from log");
});

router.post("/sign", registerUser);
router.post("/signin", signin);


router.post("/login", loginUser);

router.get("/logout", logoutUser);
router.post("/verify-email" , registerUser)
router.get("/verify-email/:token",verifyEmail)

router.get("/profile", checkLogin, async (req, res) => {
  // res.send("welcome to profile page")
  try {
    const { email, user_id } = req.user;
  const user = await Student.findById(user_id);
  // console.log(user)
  if (!user) {
    res.send("user not found");
  }
  const {name} =user
  res.status(200).json({
    message: "profile page welcomes you",
    data: [
      {
        name: name,
        city: "Noida",
        // email: user.email,
        userId: user_id,
      },
    ],
  });

  } catch (error) {
    console.log("token expires" ,error)
    res.send("token expired")
  }

});

router.get("/refresh-token", getNewAccessToken);

export default router;
