const checkApi =(req , res, next)=>{
    const isLoggin = false;
    if(isLoggin){
        return res.send("log in first")
    }
    console.log("loggedin")
    next();
}
module.exports=checkApi;