const isAuth=(req , res , next)=>{
  console.log(req.session , "from auth")
  if(req.session.user){
    next()
  }else{
    res.send("401 user not available")
  }
}
module.exports=isAuth;