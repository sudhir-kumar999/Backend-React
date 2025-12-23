const express = require("express");
const router = express.Router();
const validate = require("validator");
const userValidate = require("../utils/userValidate");
const isAuth = require("../middleware/isAuth");
const User = require("../models/userModels");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const secret_key = "superman"
const checkLogin=require("../middleware/checkLogin")

router.get("/auth", (req, res) => {
  res.send("Login require");
});

const details = [
  {
    name: "sudhir",
    Age: 25,
    email: "sh@gmail.com",
    password: "12345",
  },
];
// console.log(details)

router.post("/signin", async (req, res) => {
  const data = req.body;
  // ! 1. CHECK  validation first
  // const { name, email, password } = data;
  const { name, age, email, password } = req.body;

  const isValidated = userValidate(name, email, password);
  // console.log(email , password)
  console.log(isValidated);
  details.push(data);
  // console.log(details);
  // if(!email || !password){
  if (!isValidated) {
    return res.send("invalid email or password");
  }


  const hashedPassword =await bcrypt.hash(password , 10);



  const user = new User({
    name,
    age,
    email,
    password:hashedPassword,
  });
  await user.save();
  res.send("sign in successful");
});

router.post("/login", async(req, res) => {
  const { email, password } = req.body;
  //  find in db
  const user = await User.findOne({email:email})
  // const user = details.find(
  //   (ele) => ele.email == email && ele.password == password
  // );
  // console.log(user)
  // console.log(password)
  // console.log(user.password)
  if (!user) {
    //  this is the type of persistent cookie bcz it contain their expiry time and it is stored in hard disk/ssd
    // res.cookie("token", "secret1234",
    //   {
    //     httpOnly:true,
    //     secure:false,
    //     maxAge:5*1000
    //   })
    //  this is type of session cookie it does not contain expiry time and it is stored in ram
    // res.cookie("token", "secret1234",
    // {
    //   httpOnly:true,
    //   secure:true,

    // })
    return res.send("invalid details");
  } 
  //!  compare password
  const isValidPass =await bcrypt.compare(password , user.password)

  if(!isValidPass){
    return res.send("invalid password")
  }else{
    const payload = {
  userId: user._id,
  email: user.email
};
    const jwtToken = jwt.sign(payload , secret_key , {expiresIn:"1m"})
    res.cookie("token" ,jwtToken,{httpOnly:true})
     return res.send("success login ")
  }



});

//  middleware to check log in details
// const checkLogin = (req, res, next) => {
//   const { token } = req.cookies;
//   console.log(token);

//   if (token === "secret1234") {
//     next();
//   } else {
//     res.send("login first");
//   }
// };

router.get("/profile", checkLogin, (req, res) => {
  res.send("profile page");
});
module.exports = router;
