// import mongoose from "mongoose"
const dotenv = require("dotenv"); 
const mongoose = require("mongoose");

dotenv.config();
// console.log("CWD:", process.cwd()); current location

// const password = process.env.PASSWORD;
console.log(process.env.PASSWORD);

const url = `mongodb+srv://sudhir:${process.env.PASSWORD}@qspider-backend.no9w0qf.mongodb.net/Login`;
// const url =`mongodb+srv://sudhir:${process.env.PASSWORD}@qspider-backend.no9w0qf.mongodb.net/test?retryWrites=true&w=majority`;

const connectDb = async () => {
  const conn =await mongoose.connect(url);
};
module.exports = { connectDb };
