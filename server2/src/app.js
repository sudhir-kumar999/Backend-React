// const express = require("express");
import express from "express"
export const app = express();
import loginroute from "./routes/loginroute.js"
import cookieParser from "cookie-parser";
// console.log("first");

app.use(express.json());
app.use(cookieParser())

app.use("/user/v1" , loginroute)
app.use("user/auth" , loginroute)

app.get("/home", (req, res) => {
  console.log("home route hit");
  res.send("hello from backend server");
});




