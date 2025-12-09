const express = require("express")
const router = express.Router()


router.get("/profile",(req , res)=>{
    res.send("hello from user profile")
})

router.get("/id",(req , res)=>{
    res.send("hello from user id")
})

router.get("/prod",(req , res)=>{
    res.send("hello from user product")
})

router.get("/setting",(req , res)=>{
    res.send("hello from user setting")
})

module.exports=router