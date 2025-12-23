// const app = require("./app");
// const dotenv = require("dotenv");
import {app }from "./app.js"
import dotenv from "dotenv"
import connectDb from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT;
// console.log(PORT)
app.get("/", (req, res) => {
  res.send("OK");
});
connectDb()
.then(()=>{
  console.log("database connected")
})
.catch((error)=>{
  console.log("error occured: ",error)
})

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
