const express = require("express")
const router = express.Router();

router.get("/ad/dashboard",(req,res)=>{
    res.send("admin dashboard")
})
router.get("/ad/profile",(req,res, next)=>{
    // res.send("admin Profile page")
    next();
})
router.get("/ad/setting",(req,res)=>{
    res.send("admin setting page")
})
router.get("/ad/security",(req,res)=>{
    res.send("admin security page")
})

module.exports=router;