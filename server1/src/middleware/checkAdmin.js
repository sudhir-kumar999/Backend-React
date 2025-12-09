const checkAdmin = (req , res ,next)=>{
    const admin = false
    if(admin){
        res.send("you are not admin")
    }
    next();
}

module.exports=checkAdmin